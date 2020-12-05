// function to make the preloader element display none after 2 seconds
setTimeout(function () {                                        
    document.getElementById('loader').style.display = "none";
}, 2000);

//declaring this variable to use it in the cart function
var cartItem = localStorage.getItem("counter"); 
if (cartItem == null) {
    cartItem = 0;
}
else {
    var elements = document.getElementsByClassName("cartCounter");
    for (let i = 0; i < 2; i++) {
        elements[i].classList.add("item");
        elements[i].innerHTML = cartItem;
    }
}
// function to make the cart icon change to how many items has been chosen to order
function addCartIcon() {
    cartItem++;
    localStorage.setItem("counter", cartItem);
    var elements = document.getElementsByClassName("cartCounter");
    for (let i = 0; i < 2; i++) {
        elements[i].classList.add("item");
        elements[i].innerHTML = cartItem;
    }
}
// this function will call the function of adding item to the local storage and the function of changing the cart items icon
function addItem(id) {
    addCartIcon();
    getProduct(id);

}


// function to get the product from the API .. and calling saveItem function to add the product as an object in the local storage 
function getProduct(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "https://fakestoreapi.com/products/" + id, true);
    xhr.onreadystatechange = function (){
            if (xhr.readyState == 4 && xhr.status == 200) 
                {
                    let products = xhr.responseText;
                    let prdObject = JSON.parse(products);
                    prdObject.quantity = 1;
                    saveItem(prdObject);
                }
        };
    
    xhr.send();
        
    }


// add the product to the storage script
var array = [];                     
function saveItem(product) {
    var x = localStorage.getItem("cartArray");
    array.push(product);
    localStorage.setItem("cartArray", JSON.stringify(array));
}

// function to show the navbar when small screen apply
function show() {
    document.getElementById("bar").style.display = "block";
    document.getElementById("show").style.visibility = "hidden";
    document.getElementById("center").style.cssText = "text-align:center; display:block";
}

// function to hide the navbar when small screen apply
function hide() {
    document.getElementById("bar").style.display = "none";
    document.getElementById("show").style.visibility = "visible";
    document.getElementById("center").style.display = "inline-block";
}

// Slider script
var sliderindex = 0;
slider();

function slider() {
    var sliderImage = document.getElementsByClassName("discount");
    for (let i = 0; i < sliderImage.length; i++) {
        sliderImage[i].style.display = "none";
    }
    sliderindex++;
    if (sliderindex > sliderImage.length) {
        sliderindex = 1;
    }
    sliderImage[sliderindex - 1].style.display = "flex";
    setTimeout(slider, 1500);
}



