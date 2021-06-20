//get the html tag to inject the cameras cards
const catalog = document.getElementById('catalog');
//initialise cameras data 
let cameras;



// API Request for all cameras
const showCameras = async() => {
try{  
  const response = await fetch('http://localhost:3000/api/cameras/')
  const cameras = await response.json();

//Inject cameras data into html
    catalog.innerHTML = (
        //Create a camera card for each camera in the API
        cameras.map(camera => (
              ` 
                <li class="camera-item card col-sm-12 col-md-4 m-1 border-1 border-primary rounded">
                  <img class="camera-img card-img-top" height="248px" src="${camera.imageUrl}" />
                  <div class="camera-info card-body text-center">
                    <h2 class="camera-name">${camera.name}</h2>
                    <p class="camera-descritpion">${camera.description}</p>
                    <div class="text-center">
                      <span class="camera-price mx-1">${spacedNumber(camera.price)} €</span>
                      <a href="product.html?id=${camera._id}" class="btn btn-outline-info camera-buy mx-1">Plus d'infos</a>
                    </div>
                  </div>
                </li>
              `
            ))
    )
  }
    catch(err){
      alert(err.message);
   }
};
showCameras();

//split the number into thousands
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


