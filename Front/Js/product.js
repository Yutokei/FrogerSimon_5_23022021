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

    //Inject lense Option in HTML
    const optionsLense = () => {
    
            return camera.lenses.map((element, index) => (
             `<option value= ${index}> ${element}</option>`))
            };

    //inject camera data into html
    specifics.innerHTML = (
        
        ` 
        <h2 class="text-center my-4" id="camera-name">${camera.name}</h2>
        <div class="flex-column flex-md-row d-flex justify-content-around">
            <div class="col-5 align-self-center">
                <img id="camera-image" src="${camera.imageUrl}" width="100%">
            </div>
            <div class="col-9 col-md-3 align-self-center d-flex flex-column ">
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
//Inform the User that the server is not active
catch(err){
   alert(err.message);
}
};

showSpecifics();

//Create a space for the Thousand
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

//Retrieve and Prevent Wrong input of Camera Quantity
let cameraQuantity = 1;
function cameraCount(val) {
    if (isNaN(val) || val <= 0){
        val = 1
        return val
    }
        cameraQuantity = val;
        return cameraQuantity;
    }

//Add items to local storage and alert user
const basket = 
   document.getElementById("camera-buy").addEventListener("click", function() 
    {
        cameraQuantity = parseInt(document.getElementById('camera-quantity').value);
        let cameraObject = 
        {
            ids: id,
            lenses: parseInt(document.getElementById('camera-lenses').value),
            quantities: cameraCount(),
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

        alert(`${cameraCount()} ${document.getElementById('camera-name').innerText} ajouté au panier`);
    });






