const getId = window.location.search;
const id = getId.replace("?id=","");
const specifics = document.getElementById('camera-specifics')
let camera;


//API Request for specific camera
const fetchCameraSpecifics = async() => {
    cameras = await fetch('http://localhost:3000/api/cameras/' + id)
    .then(res => res.json())
};

const showSpecifics = async() => {
    await fetchCameraSpecifics();

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
                <select id="camera-lenses" class="form-select" aria-label="Default select example">
                    <option selected>Selectionner votre lentille</option>
                    <option value="1">One</option>
                </select>
                <span class="text-center my-4">${spacedNumber(cameras.price)} €</span>
                <button type="button" class="btn btn-outline-info camera-buy mx-1">Je l'ajoute au panier</button>
            </div>
        </div>
      `
      )
    )
    const lenses = cameras.lenses;
    lenses.forEach(element => console.log(element));
    /*lenses.forEach(element => {
        const addOption = document.createElement("option");
        cameraLenses.innerHTML
    });*/
};

showSpecifics();

function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


