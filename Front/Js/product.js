//retrieve id of the selected camera
const getId = window.location.search;
const id = getId.replace("?id=","");

//get the html tag to inject the camera card
const specifics = document.getElementById('camera-specifics')
let camera;
let cameraLenses;


//API Request for specific camera

const showSpecifics = async() => {
try{       
    const response = await fetch('http://localhost:3000/api/cameras/' + id)
    const camera = await response.json();

    //lense Option
    const optionsLense = () => {
    
            return camera.lenses.map((element, index) => (
             `<option value= ${index}> ${element}</option>`))
            };

//inject camera data into html
    specifics.innerHTML = (
        
        ` 
        <h2 class="text-center my-4" id="camera-name">${camera.name}</h2>
        <div class="flex-sm-column flex-md-row d-flex justify-content-around">
            <div class="col-5">
                <img id="camera-image" src="${camera.imageUrl}" width="100%">
            </div>
            <div class="col-3 align-self-center d-flex flex-column ">
                <p class="my-4">${camera.description}</p>
                <select id="camera-lenses" class="form-select">
                    ${optionsLense()}

                </select>

                <span class="text-center id="camera-price" my-4">${spacedNumber(camera.price)} €</span>
            </div>
        </div>
      `
      
    )
}

catch(err){
   alert(err.message);
}
};


showSpecifics();

//Create a space for the Thousand
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

//Camera count
//Retrieve camera quantity
let cameraQuantity = 1;
function cameraCount(val) {
    cameraQuantity = val;
    return cameraQuantity;
  }

//add to local storage and alert user
const basket = 
   document.getElementById("camera-buy").addEventListener("click", function() 
    {
        cameraQuantity = parseInt(document.getElementById('camera-quantity').value);
        let cameraObject = 
        {
            ids: id,
            lenses: parseInt(document.getElementById('camera-lenses').value),
            quantities: cameraQuantity,
        };
        if (localStorage.getItem('cameraBasket') == null )
        {
            let cameraObjectArray = [cameraObject];
            localStorage.setItem('cameraBasket', JSON.stringify(cameraObjectArray));
        }
        else
        {        
            let previousBasket = JSON.parse(localStorage.getItem('cameraBasket'));
            
            previousBasket.push(cameraObject);
            localStorage.setItem('cameraBasket', JSON.stringify(previousBasket));
        }

        alert(`${cameraQuantity} ${document.getElementById('camera-name').innerText} ajouté au panier`);
    });






