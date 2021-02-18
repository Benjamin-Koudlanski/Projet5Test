
let productsStorage = JSON.parse(localStorage.getItem("basketOrinoco"))

let total = 0;

let productIds = [];

let basketProducts = document.getElementById("basket-content");
function createBasket(products, content) {
    if (!products || products.length == 0) {
        let intialBasket = document.createElement("h3");
        content.appendChild(intialBasket);
        intialBasket.classList.add("basket-start");
        intialBasket.innerText = "Aucun article sélectionné";
        return;
    }
    for (let i = 0; i < products.length; i++) {
        console.log(products.length)

        let productsdiv = document.createElement("div");
        content.appendChild(productsdiv);
        productsdiv.classList.add("basket-cards");

        let photoCamera = document.createElement("img");
        productsdiv.appendChild(photoCamera);
        photoCamera.setAttribute("alt", "Image appareil photo");
        photoCamera.src = products[i].imageUrl;

        let titleCamera = document.createElement("h3");
        productsdiv.appendChild(titleCamera);
        titleCamera.classList.add("product-name");
        titleCamera.textContent = products[i].name;

        let priceCamera = document.createElement("p");
        productsdiv.appendChild(priceCamera);
        priceCamera.classList.add("product-price");
        priceCamera.innerText = products[i].price / 100 + "€";

        let numberProducts = document.createElement("div");
        productsdiv.appendChild(numberProducts);
        numberProducts.classList.add("product-price");
        numberProducts.innerText = "Quantité : " + products[i].quantity;

        let subTotal = (products[i].price / 100 * products[i].quantity);
        total += subTotal //
        let totalPrice = document.createElement("div");
        totalPrice.classList.add("subtotal");
        productsdiv.appendChild(totalPrice);
        totalPrice.innerText = "Sous-total : " + subTotal + "€";

        productIds.push(products[i]._id)
    }
        let contentPrice = document.createElement("div")
        content.appendChild(contentPrice);
        contentPrice.classList.add("montant-total");
        contentPrice.innerText = "TOTAL DE VOTRE COMMANDE : " + total + "€";

        function createClearButtonBasket (content) {
            let deleteBasket = document.createElement("button");
            content.appendChild(deleteBasket);
            deleteBasket.classList.add("btn-delete");
            deleteBasket.innerText = "Vider le panier";
            
                deleteBasket.addEventListener("click", function () {
                    localStorage.removeItem("basketOrinoco");
                    location.reload();
                });
        }
        createClearButtonBasket(basketProducts);
        console.log(products)
}
createBasket(productsStorage, basketProducts);


function checkUserInfos () {
    let lastname = document.getElementById("lastname");
    let firstname = document.getElementById("firstname");
    let email = document.getElementById("email");
    let address = document.getElementById("address");
    let city = document.getElementById("city");

    if (lastname.value.trim().length<1) {
        alert("Veuillez renseigner votre nom");
        return false;
    }
    if (firstname.value.trim().length<1) {
        alert("Veuillez renseigner votre prénom");
        return false;
    }
    if (!/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/.test(email.value)) {
        alert("Veuillez renseigner une adresse email valide");
        return false;
    }
    if (address.value.trim().length<1) {
        alert("Veuillez renseigner votre adresse");
        return false;
    }
    if (city.value.trim().length<1) {
        alert("Veuillez renseigner votre ville");
        return false;
    }
    sendUserInfos(firstname, lastname, address, city, email)
}

document.getElementById("command").addEventListener("submit", function (e) {
    e.preventDefault()
    checkUserInfos()
})

function sendUserInfos (firstname, lastname, address, city, email) {
    let contact = {
        firstName: firstname.value,
        lastName: lastname.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };
    
    const infos = { contact:contact, products:productIds };

    const reqType = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(infos),
    };
    console.log(infos);

    fetch("http://localhost:3000/api/cameras/order", reqType)

        .then(function (response) {
            response.json().then(function (result) {
                localStorage.removeItem("basketOrinoco");
                window.location.href = `confirm.html?orderId=${result.orderId}`
                console.log(result)
            });
        })
        .catch(function(error) {
            console.log(error)
        })
}