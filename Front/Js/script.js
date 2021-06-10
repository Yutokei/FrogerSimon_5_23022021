const catalog = document.getElementById('catalog');

let cameras;

//API REQUEST
const fetchCameras = async() => {
    cameras = await fetch(
        'http://localhost:3000/api/cameras'
    )
        .then(res => res.json())
    };

const showCameras = async() => {
    await fetchCameras();

    catalog.innerHTML = (

        cameras.map(camera => (
              ` 
                <li class="camera-item card col-sm-12 col-md-4 m-1 rounded">
                  <img class="camera-img card-img-top" height="248px" src="${camera.imageUrl}" />
                  <div class="camera-info card-body text-center">
                    <h2 class="camera-name">${camera.name}</h2>
                    <p class="camera-descritpion">${camera.description}</p>
                    <div class="text-center">
                      <span class="camera-price mx-1">${spacedNumber(camera.price)} €</span>
                      <a href="camera.html?id=${camera._id}" class="btn btn-outline-info camera-buy mx-1">Plus d'infos</a>
                    </div>
                  </div>
                </li>
              `
            ))
    )
};

showCameras();

function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
