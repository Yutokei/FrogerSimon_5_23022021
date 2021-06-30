//create HTML Basket Cards from component.js
function cameraCards(basketItems,items){
    basketItems.forEach((basket, index) => {
        items.forEach((camera) =>{
        if(camera._id == basket.ids)
        {
            //Retrieve id of each camera
            idArray = [camera._id]
            
            //Create HTML element for each item
//Camera Card Flex Container
const cameraLi = document.createElement('li')
cameraLi.setAttribute('class', "basket-item container d-flex flex-column flex-lg-row flex-wrap justify-content-around border border-primary rounded padding-1 mx-auto my-3")
cameraLi.setAttribute('id', basket.ids)
cameraActualBasket.appendChild(cameraLi)

//Basket Index
const cameraIndexSpan = document.createElement('span')
cameraIndexSpan.setAttribute('class', "border align-self-center fw-bold basket-index")
cameraIndexSpan.innerText = index
cameraLi.appendChild(cameraIndexSpan)

//Camera Div for Name and lense
const cameraSummary = document.createElement('div')
cameraSummary.setAttribute('class', "border d-flex flex-column rounded justify-content-between")
cameraLi.appendChild(cameraSummary)

//Camera Name
const cameraNameSpan = document.createElement('span')
cameraNameSpan.setAttribute('class', "border align-self-center fw-bold")
cameraNameSpan.innerText = camera.name
cameraSummary.appendChild(cameraNameSpan)

//Camera Lense
const cameraLenseSpan = document.createElement('span')
cameraLenseSpan.setAttribute('class', "border align-self-center fw-bold")
cameraLenseSpan.innerText = 'Lentille : ' + camera.lenses[basket.lenses]
cameraSummary.appendChild(cameraLenseSpan)

//Camera Img
const cameraImageImg = document.createElement('img')
cameraImageImg.setAttribute('class', 'mx-auto')
cameraImageImg.setAttribute('src', camera.imageUrl)
cameraImageImg.setAttribute('width', '60px')
cameraLi.appendChild(cameraImageImg)

//Camera Price
const cameraPriceSpan = document.createElement('span')
cameraPriceSpan.setAttribute('class', "camera-price border align-self-center fw-bold")
cameraPriceSpan.innerText = 'Prix : ' + spacedNumber(camera.price) + ' €'
cameraLi.appendChild(cameraPriceSpan)

//Camera Quantity
const cameraQuantitySpan = document.createElement('span')
cameraQuantitySpan.setAttribute('class', "camera-quantity border align-self-center fw-bold")
cameraQuantitySpan.innerText = 'Quantité : ' + basket.quantities
cameraLi.appendChild(cameraQuantitySpan)

//Camera Total
const cameraTotalSpan = document.createElement('span')
cameraTotalSpan.setAttribute('class', "border align-self-center fw-bold")
cameraTotalSpan.innerText = 'Total : ' + spacedNumber(camera.price*basket.quantities) + ' €'
cameraLi.appendChild(cameraTotalSpan)

//Remove Button
const createButton = document.createElement('button')
createButton.setAttribute('class', "camera-remove btn btn-outline-danger my-2 mx-5")
createButton.innerText = 'Supprimer'
cameraLi.appendChild(createButton)
                    }
                }
            )
        }
    )
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////

//Create the Order Form
function createForm (form){
    form.innerHTML =
    (
        `
            <div class="col-10 col-md-6 my-2">
                <label for="Prénom">Prénom</label>
                <input type="text" class="form-control" id="firstName" placeholder=" Nicolas" value="" required>
            </div>
            <div class="form-group col-10 col-md-6 my-2">
                <label for="nom">Nom</label>
                <input type="text" class="form-control" id="lastName" placeholder=" Dupont" value="" required>
            </div>
            <div class="col-10 col-md-6 my-2">
            <label for="Adresse">Adresse</label>
            <input type="text" class="form-control" id="address" placeholder=" 12 rue Tessereau" value="" required>
            </div>
            <div class="col-10 col-md-6 my-2">
            <label for="Ville">Ville</label>
            <input type="text" class="form-control" id="city" placeholder="La Rochelle" value="" required>
            </div>
            <div class="form-group col-10 col-md-6 my-2">
                <label for="Email utilisateur">Adresse Email</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder=" nicolasdupont@monmail.fr" value="" required>
            </div>
            <button type="button" class="btn btn-primary my-2" id="confirm-order">Je confirme ma commande</button>
        
        `
    )
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////

//Remove from Basket Function
function removeFromBasket(buttons,basket)
{for (let i = 0; i < buttons.length; i++){
    const button = buttons[i]
    const cameraIndex = button.parentElement.childNodes[0].innerText
    //Add function for each remove button
    button.addEventListener('click', function(){
        //remove the order index from the Array
        basket.splice(cameraIndex, 1);
        //Remove the HTML card of item
        button.parentElement.remove()
       if(JSON.parse(localStorage.getItem('cameraBasket')).length <= 1){
        localStorage.removeItem('cameraBasket')
        orderForm.innerHTML = ''
       }
       else{
           localStorage.setItem('cameraBasket', JSON.stringify(basket))
        }
        //Update the basket
        cameraActualBasket.innerHTML = '';
        document.getElementById('total-price').innerText = ''
        showBasket();
            }
        )
    }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////////

//Show Total Price Function
function updateTotalPrice(){
    const basketItems = cameraActualBasket.getElementsByClassName('basket-item')
    let total = 0
    for (var i = 0; i < basketItems.length; i++) {
        const basketItem = basketItems[i]
        const priceItem = basketItem.getElementsByClassName('camera-price')[0];
        const quantityItem = basketItem.getElementsByClassName('camera-quantity')[0];
        const price = priceItem.innerText.replace(/\D+/g, '');
        const quantity = quantityItem.innerText.replace(/\D+/g, '');
        total = total + (price * quantity);
    }
    document.getElementById('total-price').innerText = 'Sous-Total : ' + spacedNumber(total) + ' €'
  }