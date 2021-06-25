
//get the html tag to inject the cameras cards
const CameraActualBasket = document.getElementById('basket-content');
const orderForm = document.getElementById('orderForm')
//initialise cameras data 
let cameras;
let idArray;
//API Request for specific camera

const showBasket = async() => {
    const response = await fetch('http://localhost:3000/api/cameras/')
    const cameras = await response.json();

//Inform User if the basket is empty
//Retrieve Item from the localStorage
let cameraLocalBasket = JSON.parse(localStorage.getItem('cameraBasket'));
if (cameraLocalBasket === null)
{
    let emptyBasket = document.createElement('li')
    emptyBasket.setAttribute('class', 'text-center')
    emptyBasket.innerText = 'Votre Panier est vide'
    CameraActualBasket.appendChild(emptyBasket)
}
//Retrieve Items from the basket and inject it in HTML
else
{cameraLocalBasket.forEach((basket, index) => {
    cameras.forEach((camera) =>{
        if(camera._id == basket.ids)
        {
            //Retrieve id of each camera
            idArray = [camera._id]

            //Create HTML element for each item
let cameraLi = document.createElement('li')
cameraLi.setAttribute('class', "basket-item container d-flex flex-column flex-lg-row flex-wrap justify-content-around border border-primary rounded padding-1 mx-auto my-3")
cameraLi.setAttribute('id', basket.ids)
CameraActualBasket.appendChild(cameraLi)

let cameraIndexSpan = document.createElement('span')
cameraIndexSpan.setAttribute('class', "border align-self-center fw-bold basket-index")
cameraIndexSpan.innerText = index
cameraLi.appendChild(cameraIndexSpan)

let cameraSummary = document.createElement('div')
cameraSummary.setAttribute('class', "border d-flex flex-column rounded justify-content-between")
cameraLi.appendChild(cameraSummary)

let cameraNameSpan = document.createElement('span')
cameraNameSpan.setAttribute('class', "border align-self-center fw-bold")
cameraNameSpan.innerText = camera.name
cameraSummary.appendChild(cameraNameSpan)

let cameraLenseSpan = document.createElement('span')
cameraLenseSpan.setAttribute('class', "border align-self-center fw-bold")
cameraLenseSpan.innerText = 'Lentille : ' + camera.lenses[basket.lenses]
cameraSummary.appendChild(cameraLenseSpan)

let cameraImageImg = document.createElement('img')
cameraImageImg.setAttribute('class', 'mx-auto')
cameraImageImg.setAttribute('src', camera.imageUrl)
cameraImageImg.setAttribute('width', '60px')
cameraLi.appendChild(cameraImageImg)

let cameraPriceSpan = document.createElement('span')
cameraPriceSpan.setAttribute('class', "camera-price border align-self-center fw-bold")
cameraPriceSpan.innerText = 'Prix : ' + spacedNumber(camera.price) + ' €'
cameraLi.appendChild(cameraPriceSpan)

let cameraQuantitySpan = document.createElement('span')
cameraQuantitySpan.setAttribute('class', "camera-quantity border align-self-center fw-bold")
cameraQuantitySpan.innerText = 'Quantité : ' + basket.quantities
cameraLi.appendChild(cameraQuantitySpan)

let cameraTotalSpan = document.createElement('span')
cameraTotalSpan.setAttribute('class', "border align-self-center fw-bold")
cameraTotalSpan.innerText = 'Total : ' + spacedNumber(camera.price*basket.quantities) + ' €'
cameraLi.appendChild(cameraTotalSpan)

let createButton = document.createElement('button')
createButton.setAttribute('class', "camera-remove btn btn-outline-danger my-2 mx-5")
createButton.innerText = 'Supprimer'
cameraLi.appendChild(createButton)
        }
    })

})
//Remove from Basket Function
let removeButtons = document.getElementsByClassName('camera-remove');
for (let i = 0; i < removeButtons.length; i++){
    let button = removeButtons[i]
    let cameraIndex = button.parentElement.childNodes[0].innerText
    console.log(cameraIndex)
    //Add function for each remove button
    button.addEventListener('click', function(event){
        console.log(event.target.id)
        //remove the order index from the Array
        cameraLocalBasket.splice(cameraIndex, 1);
        //Remove the HTML card of item
        button.parentElement.remove()
        console.log(JSON.parse(localStorage.getItem('cameraBasket')).length)
       if(JSON.parse(localStorage.getItem('cameraBasket')).length <= 1){
        localStorage.removeItem('cameraBasket')
        orderForm.innerHTML = ''
       }
       else{
           localStorage.setItem('cameraBasket', JSON.stringify(cameraLocalBasket))
        }
        //Update the basket
        CameraActualBasket.innerHTML = '';
        document.getElementById('total-price').innerText = ''
        console.log(cameraLocalBasket);
        showBasket();
    })
    
}
//Show Total Price Function
function updateTotalPrice(){
  let basketItems = CameraActualBasket.getElementsByClassName('basket-item')
  let total = 0
  for (var i = 0; i < basketItems.length; i++) {
      let basketItem = basketItems[i]
      let priceItem = basketItem.getElementsByClassName('camera-price')[0];
      let quantityItem = basketItem.getElementsByClassName('camera-quantity')[0];
      let price = priceItem.innerText.replace(/\D+/g, '');
      let quantity = quantityItem.innerText.replace(/\D+/g, '');
      total = total + (price * quantity);
  }
  document.getElementById('total-price').innerText = 'Sous-Total : ' + spacedNumber(total) + ' €'
}
updateTotalPrice()
//Create the Order Form
orderForm.innerHTML =
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
// Verify input of the form and alert the User of wich input is not valid
document.querySelector('.form button[type="button"]').addEventListener("click",function(){
    let valid = true;
    for(let input of document.querySelectorAll('.form-control'))
    {
       valid &= input.reportValidity();
       if(!valid){
           break;
       }
    }
    //Create an Array with the User Info and Order and Post it to the API
    if(valid){ 
                    let contact = Array.from(document.querySelectorAll('#orderForm input')).reduce((acc, input) =>({...acc, [input.id]: input.value}), {})
                    let products = idArray
                    console.log(products)
                    let order = {
                        contact,
                        products
                    }
                      console.log(order)
        const orderPost = async() =>{
            try{
            fetch('http://localhost:3000/api/cameras/order',{
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            method: 'post',
            body: JSON.stringify(order),
            })
            .then((response) => response.json())
            .then((json) => {
              console.log(json)
              localStorage.removeItem('cameraBasket')
              alert('Merci pour votre achat ' + json.firstName + ' ' + json.lastName + '.')
              window.location.href = `confirmedbasket.html?${json.orderId}`
            })
        }
            catch(err){
                alert(err.message)
            }
        }
        orderPost();
        console.log(order)
    }  
})
}
}
showBasket();
//split the number into thousands
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}