//get the html tag to inject the cameras cards
const cameraActualBasket = document.getElementById("basket-content");
const orderForm = document.getElementById("orderForm");
//Import Function to Create HTML cards for Items

//initialise cameras data
let idArray;

//API Request for specific camera
const showBasket = async () => {
  const response = await fetch("http://localhost:3000/api/cameras/");
  const cameras = await response.json();

  //Inform User if the basket is empty
  //Retrieve Item from the localStorage
  let cameraLocalBasket = JSON.parse(localStorage.getItem("cameraBasket"));
  if (cameraLocalBasket === null) {
    const emptyBasket = document.createElement("li");
    emptyBasket.setAttribute("class", "text-center");
    emptyBasket.innerText = "Votre Panier est vide";
    cameraActualBasket.appendChild(emptyBasket);
  }
  //Retrieve Items from the basket and inject it in HTML
  else {
    //create HTML Basket Cards from component.js
    cameraCards(cameraLocalBasket, cameras);

    //Remove from Basket Function
    const removeButtons = document.getElementsByClassName("camera-remove");
    removeFromBasket(removeButtons, cameraLocalBasket);

    //Show Total Price Function
    updateTotalPrice();

    //Create the Order Form
    createForm(orderForm);

    // Verify input of the form and alert the User of wich input is not valid
    document
      .querySelector('.form button[type="button"]')
      .addEventListener("click", function () {
        let valid = true;
        for (let input of document.querySelectorAll(".form-control")) {
          valid &= input.reportValidity();
          if (!valid) {
            break;
          }
        }

        //Create an Array with the User Info and Order and Post it to the API
        if (valid) {
          const contact = Array.from(
            document.querySelectorAll("#orderForm input")
          ).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
          const products = idArray;
          const order = {
            contact,
            products,
          };
          const orderPost = async () => {
            try {
              fetch("http://localhost:3000/api/cameras/order", {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: "POST",
                body: JSON.stringify(order),
              })
                //Retrieve API response
                .then((response) => response.json())
                .then((json) => {
                  //Remove Basket from localStorage
                  localStorage.removeItem("cameraBasket");
                  //Inform User of the valid Order
                  alert(
                    "Merci pour votre achat " +
                      json.contact.firstName +
                      " " +
                      json.contact.lastName +
                      "."
                  );
                  //Redirect to the Confirmed Page and retrieve Order Id
                  window.location.href = `confirmedbasket.html?${json.orderId}`;
                });
            } catch (err) {
              //Inform the User that the server is not active
              alert(err.message + ' Le serveur est indisponible');
            }
          };
          orderPost();
        }
      });
  }
};
showBasket();
