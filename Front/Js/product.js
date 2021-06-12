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
    .catch(err=>{
        alert(err.message);
    })
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

//Create a space for the Thousand
function spacedNumber(x){
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
// local storage
const randomKey = Math.random();
const basket = 
   document.getElementById("camera-buy").addEventListener("click", function() {
    localStorage.setItem(id, id);
    alert(`${cameras.name} ajouté au panier`);
  });