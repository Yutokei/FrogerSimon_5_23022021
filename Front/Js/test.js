const getId = window.location.search;
const id = getId.replace("?id=","");
const specifics = document.getElementById('camera-specifics')
const lensesOption = document.getElementById('camera-lenses');
let camera;
let cameraLenses;


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
                <select id="select" class="form-select" aria-label="Default select example">
                    <option selected>Selectionner votre lentille</option>
                    <option>${cameras.lenses[1]}</option>
                </select>
                <span class="text-center my-4">${spacedNumber(cameras.price)} €</span>
                <button type="button" class="btn btn-outline-info camera-buy mx-1">Je l'ajoute au panier</button>
            </div>
        </div>
      `
      )
    )
    lensesOption.innerHTML = (
        
        cameras.lenses.map(camera => (
            `
            <option>${camera.lenses}</option>
            `
        )))
    console.log(cameras.lenses);
    /*
    
    
    
    cameraLenses = cameras.lenses;
    for (let lenses of cameraLenses){
        cameraLenses.push(document.createElement("span"));
        cameraLenses[cameraLenses.length-1].textContent = lenses;
        cameraLenses.className = "element";
        document.querySelector("#test-lensesOption").appendChild(cameraLenses[cameraLenses.length-1]);
    }
    */
    /*cameras.lenses.forEach(element => document
        .createTextNode(element)
        .createElement("option")
        .getElementById("camera-lenses"),
        tag.appendChild(text),
        element.appendChild(tag)
        );*/
};
showSpecifics();

function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

class CameraSpecifics{
    constructor(jsonSpec){
        camera.lenses && Object.assign(this, camera.lenses);
    }
}

fetch('http://localhost:3000/api/cameras/' + id)
    .then (data => data.json())
    {
        for(let lense of data.lenses){
            let spec = new CameraSpecifics(jsonSpec)
            document.querySelector(".test").innerHTML +=    `
                                                            <select id="select" class="form-select" aria-label="Default select example">
                                                                <option selected>Selectionner votre lentille</option>
                                                                <option>${cameras.lenses}</option>
                                                            </select> 
                                                            `  
        }
    };



