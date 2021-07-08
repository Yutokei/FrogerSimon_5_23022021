//get the HTML tag to inject the cameras cards
const catalog = document.getElementById("catalog");

// API Request for all cameras
const products = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/cameras/");
    const cameras = await response.json();

    //Inject Cameras data into HTML
    catalog.innerHTML =
      //Create a Camera Card for each Camera in the API
      cameras.map(
        (camera) =>
          ` 
                <li class="camera-item card col-sm-12 col-md-4 m-2 border-1 border-primary rounded">
                  <img class="camera-img card-img-top" height="248px" src="${
                    camera.imageUrl
                  }" />
                  <div class="camera-info card-body text-center">
                    <h2 class="camera-name">${camera.name}</h2>
                    <p class="camera-descritpion">${camera.description}</p>
                    <div class="text-center">
                      <span class="camera-price mx-1">${spacedNumber(
                        camera.price
                      )} €</span>
                      <a href="../product/product.html?id=${
                        camera._id
                      }" class="btn btn-outline-info camera-buy stretched-link mx-1">Plus d'infos</a>
                    </div>
                  </div>
                </li>
              `
      );
  } catch (err) {
    //Inform the User that the Server is not Active
    alert(err.message + ' Le serveur est indisponible');
  }
};
products();
