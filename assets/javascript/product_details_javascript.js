/* Mostafa ElGuindi */

setTimeout(function () {                                        
    document.getElementById('loader').style.display = "none";
}, 2000);

const endpoint = "https://fakestoreapi.com/products/";

function getProduct(id, endpoint) {
    const xhr = new XMLHttpRequest();
    var pdt;
    var resp=1;
    xhr.open("get", endpoint + id, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            resp = xhr.responseText;
            pdt = JSON.parse(resp);
            let old_price = Math.floor(pdt.price * 1.5);
            document.getElementById("product-image").setAttribute("src",pdt.image);
            document.getElementById("product-name").innerHTML = pdt.title;
            document.getElementById("product-desc").innerHTML = pdt.description;
            document.getElementById("old-price").innerHTML = "<del>" + "$" + old_price +  "</del>";
            document.getElementById("new-price").innerHTML = "$" + pdt.price;
            pdt.quantity = 0;
            addToCart(pdt);
        }
    }
    xhr.send();
}


function getId() {
    var query = location.search;
    var id = query.split("=")[1];
    return id;
}

if (localStorage.getItem("cartArray")) {
    var raw = localStorage.getItem("cartArray");
    var cart = JSON.parse(raw);
} else {
    var cart = [];
}

const pdtId = getId();
getProduct(pdtId, endpoint);

const btn = document.getElementById("add-to-cart");
btn.onclick = updateCart;


function addToCart(pdt) {
    cart.push(pdt);
}

function updateCart(ev) {
    var qty = document.getElementById("quantity").value;
    cart.filter(i => i.id == pdtId)[0].quantity = qty;
    localStorage.setItem("cartArray", JSON.stringify(cart));
}