//get the html tag to inject the cameras cards
const CameraActualBasket = document.getElementById('basket-content');
const orderForm = document.getElementById('orderForm')
//initialise cameras data 
let cameras;


//API Request for specific camera

const showBasket = async() => {
    const response = await fetch('http://localhost:3000/api/cameras/')
    const cameras = await response.json();


    let cameraLocalBasket = JSON.parse(localStorage.getItem('cameraBasket'));

if (cameraLocalBasket == null)
{
    let emptyBasket = document.createElement('li')
    emptyBasket.setAttribute('class', 'text-center')
    emptyBasket.innerText = 'Votre Panier est vide'
    CameraActualBasket.appendChild(emptyBasket)
}
else
{cameraLocalBasket.forEach((basket) => {
    cameras.forEach((camera) =>{
        if(camera._id == basket.ids)
        {
            //Create HTML element
let cameraLi = document.createElement('li')
cameraLi.setAttribute('class', "d-flex justify-content-around border rounded my-3")
CameraActualBasket.appendChild(cameraLi)

let imageDiv = document.createElement('div')
imageDiv.setAttribute('class', "border d-flex justify-content-between")
cameraLi.appendChild(imageDiv)

let cameraNameSpan = document.createElement('span')
cameraNameSpan.setAttribute('class', "border align-self-center fw-bold")
cameraNameSpan.innerText = camera.name
imageDiv.appendChild(cameraNameSpan)

let cameraImageImg = document.createElement('img')
cameraImageImg.setAttribute('src', camera.imageUrl)
cameraImageImg.setAttribute('width', '60px')
imageDiv.appendChild(cameraImageImg)


let cameraLenseSpan = document.createElement('span')
cameraLenseSpan.setAttribute('class', "border align-self-center fw-bold")
cameraLenseSpan.innerText = 'Lentille : ' + camera.lenses[basket.lenses]
cameraLi.appendChild(cameraLenseSpan)

let cameraQuantitySpan = document.createElement('span')
cameraQuantitySpan.setAttribute('class', "border align-self-center fw-bold")
cameraQuantitySpan.innerText = 'Quantité : ' + basket.quantities
cameraLi.appendChild(cameraQuantitySpan)

let cameraPriceSpan = document.createElement('span')
cameraPriceSpan.setAttribute('class', "border align-self-center fw-bold")
cameraPriceSpan.innerText = 'Sous-total : ' + spacedNumber(camera.price) + ' €'
cameraLi.appendChild(cameraPriceSpan)

let cameraTotalSpan = document.createElement('span')
cameraTotalSpan.setAttribute('class', "border align-self-center fw-bold")
cameraTotalSpan.innerText = 'Total : ' + spacedNumber(camera.price*basket.quantities) + ' €'
cameraLi.appendChild(cameraTotalSpan)

let createButton = document.createElement('button')
createButton.setAttribute('class', "camera-remove btn btn-outline-danger")
createButton.setAttribute('id', "remove-item")
createButton.innerText = 'Supprimer'
cameraLi.appendChild(createButton)
        }
    })

})
orderForm.innerHTML =
(
    `
        <div class="form-group col-6 my-2">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" placeholder=" Dupont" required>
        </div>
        <div class="col-6 my-2">
            <label for="Prénom">Prénom</label>
            <input type="text" class="form-control" id="Prénom" placeholder=" Nicolas" required>
        </div>
        <div class="form-group col-6 my-2">
            <label for="Email utilisateur">Adresse Email</label>
            <input type="email" class="form-control" id="Email utilisateur" aria-describedby="emailHelp" placeholder=" nicolasdupont@monmail.fr" required>
        </div>
        <div class="col-6 my-2">
            <label for="Adresse">Adresse</label>
            <input type="text" class="form-control" id="Adresse" placeholder=" 12 rue Tessereau La Rochelle" required>
        </div>
        <div class="col-6 my-2">
            <label for="code-postale">Code Postale</label>
            <input pattern="[0-9]{5}" class="form-control" type="text"  placeholder=" 37000" required/>
        </div>
        <button type="submit" class="btn btn-primary my-2" id="confirm-order">Je confirme ma commande</button>
    
    `
)
}
}

showBasket();

//split the number into thousands
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Verify input of the form
document.getElementById('confirm-order').addEventListener("click",function(){
    let valid = true;
    for(let input of document.querySelectorAll('.form-control'))
    {
       valid &= input.reportValidity();
       if(!valid){
           break;
       }
    }
    if(valid)[
        alert("Panier validé")
    ]
})
//Reunite the data to post to the API
let orderPost =[
    document.querySelectorAll.input('.form-control'),
    camera.id + camera.quantity,
]
/*
//Post Form and Order to API
const postResponse = await fetch('http://localhost:3000/api/cameras/',
{
    method: 'POST',
    body: JSON.stringify(orderPost),
})
const Post = await response.json();
*/
