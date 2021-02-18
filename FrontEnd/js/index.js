function addNewCard(result) {
  for (let i = 0; i < result.length; i++) {
    let divCards = document.createElement("div");
    let content = document.getElementById("home-content");  
    content.appendChild(divCards);                          
    divCards.classList.add("home-cards");                   

    let photoCamera = document.createElement("img");
    divCards.appendChild(photoCamera);
    photoCamera.setAttribute("alt", "Image appareil photo");
    photoCamera.src = result[i].imageUrl;

    let titleCamera = document.createElement("h3");
    divCards.appendChild(titleCamera);
    titleCamera.classList.add("product-name");
    titleCamera.innerText = result[i].name;

    let descriptionCamera = document.createElement("p");
    divCards.appendChild(descriptionCamera);
    descriptionCamera.classList.add("product-description");
    descriptionCamera.innerText = result[i].description;

    let priceCamera = document.createElement("p");
    divCards.appendChild(priceCamera);
    priceCamera.classList.add("product-price");
    priceCamera.innerText = result[i].price / 100 + "€";

    let linkProduct = document.createElement("a");
    divCards.appendChild(linkProduct);
    linkProduct.classList.add("product-link");
    linkProduct.innerText = "voir plus";

    linkProduct.href = `pages/product.html?productId=${result[i]._id}`;
  }
}


function getInfosProducts() {
    fetch("http://localhost:3000/api/cameras")
        .then(function (response) {
            response.json()
              .then(function (result) {
                addNewCard(result)
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}
getInfosProducts()