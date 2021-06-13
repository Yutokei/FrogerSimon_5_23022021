//retrieve id of the selected camera
const getId = window.location.search;
const id = getId.replace("?id=","");

//get the html tag to inject the camera card
const specifics = document.getElementById('camera-specifics')
//get the html tag to inject the camera lenses option
const lensesOption = document.getElementById('camera-lenses');
let camera;
let cameraLenses;


//API Request for specific camera
const fetchCameraSpecifics = async() => {
    cameras = await fetch('http://localhost:3000/api/cameras/' + id)
    .then(res => res.json())
    .catch(err=>{
        alert(err.message);
    })
};

const showSpecifics = async() => {
    await fetchCameraSpecifics();
    function basketProducts (products)
    {
        cameras = products;
        
    }
//inject camera data into html
    specifics.innerHTML = (

        camera = (
        ` 
        <h2 class="text-center my-4">${cameras.name}</h2>
        <div class="flex-sm-column flex-md-row d-flex justify-content-around">
            <div class="col-5">
                <img src="${cameras.imageUrl}" width="100%">
            </div>
            <div class="col-3 align-self-center d-flex flex-column ">
                <p class="my-4">${cameras.description}</p>
                <select id="camera-lenses" class="form-select">
                    <option selected>Selectionner votre lentille</option>

                </select>



                <span class="text-center my-4">${spacedNumber(cameras.price)} €</span>
            </div>
        </div>
      `
      )
    )


    //lense Option
    var selectLense = document.getElementById("camera-lenses");
    var lensesOptions = cameras.lenses;
    for(var i = 0; i < lensesOptions.length; i++)
        {
        var lense = lensesOptions[i];
        var createOption = document.createElement("option");
        createOption.textContent = lense;
        createOption.value = lense;
        selectLense.appendChild(createOption);
        } 
};


showSpecifics();

//Camera count
//Retrieve camera quantity
let cameraQuantity = document.getElementById('camera-quantity').value;
function cameraCount(val) {
    cameraQuantity = val;
  }
document.getElementById('camera-quantity').addEventListener("change", function()
{
    console.log(cameraQuantity);
})

//Create a space for the Thousand
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

//test localStorage array

let cameraArray = 
[
    id,
    cameraQuantity
]
// local storage
const basket = 
   document.getElementById("camera-buy").addEventListener("click", function() {
    localStorage.setItem('cameraBasket', JSON.stringify(cameraArray));
    alert(`${cameraQuantity} ${cameras.name} ajouté au panier`);
  });


  const CART = {
    KEY: 'CameraBasket',
    contents: [],
    init(){
        //check localStorage and initialize the contents of CART.contents
        let _contents = localStorage.getItem(CART.KEY);
        if(_contents){
            CART.contents = JSON.parse(_contents);
        }else{
            //dummy test data
            CART.contents = [];
            CART.sync();
        }
    },
    async sync(){
        let _cart = JSON.stringify(CART.contents);
        await localStorage.setItem(CART.KEY, _cart);
    },
    find(id){
        //find an item in the cart by it's id
        let match = CART.contents.filter(item=>{
            if(item.id == id)
                return true;
        });
        if(match && match[0])
            return match[0];
    },
    add(id){
        //add a new item to the cart
        //check that it is not in the cart already
        if(CART.find(id)){
            CART.increase(id, 1);
        }else{
            let arr = PRODUCTS.filter(product=>{
                if(product.id == id){
                    return true;
                }
            });
            if(arr && arr[0]){
                let obj = {
                    id: arr[0].id,
                    title: arr[0].title,
                    qty: 1,
                    itemPrice: arr[0].price
                };
                CART.contents.push(obj);
                //update localStorage
                CART.sync();
            }else{
                //product id does not exist in products data
                console.error('Invalid Product');
            }
        }
    },
    increase(id, qty=1){
        //increase the quantity of an item in the cart
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty + qty;
            return item;
        });
        //update localStorage
        CART.sync()
    },
    reduce(id, qty=1){
        //reduce the quantity of an item in the cart
        CART.contents = CART.contents.map(item=>{
            if(item.id === id)
                item.qty = item.qty - qty;
            return item;
        });
        CART.contents.forEach(async item=>{
            if(item.id === id && item.qty === 0)
                await CART.remove(id);
        });
        //update localStorage
        CART.sync()
    },
    remove(id){
        //remove an item entirely from CART.contents based on its id
        CART.contents = CART.contents.filter(item=>{
            if(item.id !== id)
                return true;
        });
        //update localStorage
        CART.sync()
    },
    empty(){
        //empty whole cart
        CART.contents = [];
        //update localStorage
        CART.sync()
    },
    sort(field='title'){
        //sort by field - title, price
        //return a sorted shallow copy of the CART.contents array
        let sorted = CART.contents.sort( (a, b)=>{
            if(a[field] > b[field]){
                return 1;
            }else if(a[field] < a[field]){
                return -1;
            }else{
                return 0;
            }
        });
        return sorted;
        //NO impact on localStorage
    },
    logContents(prefix){
        console.log(prefix, CART.contents)
    }
};

document.addEventListener('DOMContentLoaded', ()=>{
    CART.init();
})