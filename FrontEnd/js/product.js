let linkPage = location.href;                           


const url = new URL(linkPage);                          
console.log(url);
const params = new URLSearchParams(url.search);         
console.log(params);
const productId = params.get("productId");              
console.log(productId);


function getCamera(camera) {
    let divCards = document.createElement("div");
    let content = document.getElementById("product-content");
    content.appendChild(divCards);
    divCards.classList.add("single-product-cards");

    let divCamera = document.createElement("div");
    divCards.appendChild(divCamera);
    divCamera.classList.add("div-camera");

    let photoCamera = document.createElement("img");
    divCamera.appendChild(photoCamera);
    photoCamera.setAttribute("alt", "Image appareil photo");
    photoCamera.src = camera.imageUrl;

    let divInfos = document.createElement("div");
    divCards.appendChild(divInfos)
    divInfos.classList.add("div-infos");

    let titleCamera = document.createElement("h3");
    divInfos.appendChild(titleCamera);
    titleCamera.classList.add("product-name");
    titleCamera.innerText = camera.name;

    let descriptionCamera = document.createElement("p");
    divInfos.appendChild(descriptionCamera);
    descriptionCamera.classList.add("product-description");
    descriptionCamera.innerText = camera.description;

    let selectLabel = document.createElement("label");
    divInfos.appendChild(selectLabel);
    selectLabel.innerText = "Sélectionnez une lentille";

    let selectLense = document.createElement("select");
    divInfos.appendChild(selectLense);
    selectLense.classList.add("select");
    selectLense.id = "choices";

    for (let i = 0; i < camera.lenses.length; i++) {
        let typeOfLens = document.createElement("option");
        selectLense.appendChild(typeOfLens);
        typeOfLens.innerText = camera.lenses[i];
    }

    let quantityLabel = document.createElement("label");
    divInfos.appendChild(quantityLabel);
    quantityLabel.innerText = "Quantité";

    let selectQuantity = document.createElement("select");
    divInfos.appendChild(selectQuantity);
    selectQuantity.classList.add("select");

    for (let i = 1; i <= 10; i++) {
        let optionQuantity = document.createElement("option");
        selectQuantity.appendChild(optionQuantity);
        optionQuantity.innerText = i;
        optionQuantity.value = i;
    }

    let priceCamera = document.createElement("p");
    divInfos.appendChild(priceCamera);
    priceCamera.classList.add("product-price");
    priceCamera.innerText = camera.price / 100 + "€";

    let addButton = document.createElement("button");
    divInfos.appendChild(addButton);
    addButton.classList.add("btn-add");
    addButton.innerText = "Ajouter au panier";


    addButton.addEventListener("click", function () {
        let choiceLens = document.getElementById("choices").value;
        console.log(choiceLens);
        addCamera(camera, selectQuantity)
        alert("ajouté au panier")
    });
}

function getInfosCamera() {
    fetch(`http://localhost:3000/api/cameras/${productId}`)
    .then(function (response) {
        response.json()
        .then(function (result) {
            console.log(result)
            getCamera(result)
        });
    })
    .catch(function(error) {
        console.log(error)
    })
}
getInfosCamera()

function addCamera(camera, quantitySelect) {
    let basket = localStorage.getItem("basketOrinoco")
    if (basket == null) {
        basket = []                                            
    } else {
        basket = JSON.parse(basket)
    }
    const cameraBasket = {
        _id: camera._id,
        imageUrl: camera.imageUrl,
        name: camera.name,
        price: camera.price,
        quantity: quantitySelect.value
    }

    basket.push(cameraBasket)
    
    const stringifybasket = JSON.stringify(basket)
    localStorage.setItem("basketOrinoco", stringifybasket)
}        