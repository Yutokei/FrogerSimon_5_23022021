//Retrieve Id of the selected Camera
const getId = window.location.search;
const id = getId.replace("?id=", "");

//get the HTML tag to inject the camera card
const specifics = document.getElementById("camera-specifics");
let camera;

//API Request for specific Camera
const productId = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cameras/" + id);
    const camera = await response.json();

    //Inject lense Option in HTML
    const optionsLense = () => {
      return camera.lenses.map(
        (element, index) => `<option value= ${index}> ${element}</option>`
      );
    };

    //Inject Camera data into HTML
    specifics.innerHTML = ` 
        <h2 class="text-center my-3" id="camera-name">${camera.name}</h2>
        <div class="flex-column flex-md-row d-flex justify-content-around">
            <div class="col-11 col-md-6 align-self-center">
                <img id="camera-image" src="${camera.imageUrl}" width="100%">
            </div>
            <div class="col-9 col-md-3 align-self-center d-flex flex-column ">
                <p class="my-auto">${camera.description}</p>
                <select id="camera-lenses" class="form-select">
                    ${optionsLense()}
                </select>
                <span class="text-center id="camera-price" my-auto">${spacedNumber(
                  camera.price
                )} €</span>
            </div>
        </div>
      `;
  } catch (err) {
    //Inform the User that the Server is not active
    alert(err.message + ' Le serveur est indisponible');
  }
};

productId();

//Retrieve and Prevent Wrong input of Camera Quantity
let cameraQuantity = 1;
function cameraCount(val) {
  //If the Quantity is not a number, return 1
  if (isNaN(val) || val <= 0) {
    val = 1;
    document.getElementById("camera-quantity").value = val;
  }
  cameraQuantity = val;
  return cameraQuantity;
}

//Add items to the localStorage and alert user
const basket = document
  .getElementById("camera-buy")
  .addEventListener("click", function () {
    const cameraObject = {
      ids: id,
      lenses: parseInt(document.getElementById("camera-lenses").value),
      quantities: cameraCount(cameraQuantity),
    };
    //Create an Array if there is none
    if (localStorage.getItem("cameraBasket") == null) {
      const cameraObjectArray = [cameraObject];
      localStorage.setItem("cameraBasket", JSON.stringify(cameraObjectArray));
    }
    //Add to the Array if there is one already
    else {
      const previousBasket = JSON.parse(localStorage.getItem("cameraBasket"));

      previousBasket.push(cameraObject);
      localStorage.setItem("cameraBasket", JSON.stringify(previousBasket));
    }
    //Inform user of the Item added to the Basket
    alert(
      `${cameraQuantity} ${
        document.getElementById("camera-name").innerText
      } ajouté au panier`
    );
  });
