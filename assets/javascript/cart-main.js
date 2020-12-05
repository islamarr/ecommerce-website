/* Islam Functions  */

// var array = [];
// var id = 1;
// var srcImg = "assets/images/cart-1.jpg";
// var name = "bla2q bla2 bal2";
// var desc = "desc cccccccccccc bal";
// var price = "10 LE";
// var quantity = "3";
// var obj1 = {
//     id: id, srcImg: srcImg, name: name, desc: desc, price: price, quantity: quantity
// }
// array.push(obj1);

// var obj2 = { id: 2, srcImg: "assets/images/cart-2.jpg", name: "blrr rtt yyu2", desc: "blauuuu bal", price: "90 LE", quantity: "1" };
// var array = [obj1, obj2];
// localStorage.setItem("cartArray", JSON.stringify(array));




var tr_node, td_node;
var total = 0;

var storedArray = JSON.parse(localStorage.getItem("cartArray"));

if(storedArray != null){
    if (storedArray === undefined || storedArray.length == 0) {
    setEmptyCart();
    }

storedArray.forEach(element => {
    tr_node = document.createElement("tr");
    tr_node.setAttribute('align', 'center');

    createImge(element.image, element.title, element.id);
    createDesc(element.description);
    createPrice(element.price);
    createQuantity(element.quantity);

    var totalElementPrice = parseInt(element.price) * parseInt(element.quantity);
    var txt = String(totalElementPrice);
    var res = txt.concat(" $");
    createTotalElementPrice(res);
    createRemovedBtn();

    document.getElementById("tbl").appendChild(tr_node);

    total = total + parseInt(totalElementPrice);
    setTotalText();

});
}

else {
    setEmptyCart();
}

function setEmptyCart() {

    document.getElementById("tbl").style.display = "none";
    document.getElementById("btns").style.display = "none";
    document.getElementById("empty_cart").style.display = "block";

}

function createImge(img_src, txt, id) {

    td_node = document.createElement("td");
    var span_node = document.createElement("span");
    td_node.appendChild(span_node);
    var img_node = document.createElement("img");
    img_node.src = img_src;
    img_node.width = "100";
    span_node.appendChild(img_node);
    var h4_node = document.createElement("h4");
    var h4_txt_node = document.createTextNode(txt);
    h4_node.appendChild(h4_txt_node);
    span_node.appendChild(h4_node);

    var inpt = document.createElement("input");
    inpt.setAttribute('type', 'hidden');
    inpt.setAttribute('value', id);

    span_node.appendChild(inpt);

    tr_node.appendChild(td_node);
}


function createDesc(desc) {
    td_node = document.createElement("td");
    var td_txt_node = document.createTextNode(desc);
    td_node.appendChild(td_txt_node);
    tr_node.appendChild(td_node);
}

function createPrice(price) {
    td_node = document.createElement("td");
    var td_txt_node = document.createTextNode(price);
    td_node.appendChild(td_txt_node);
    tr_node.appendChild(td_node);
}

function createQuantity(num) {
    td_node = document.createElement("td");
    var inpt = document.createElement("input");
    inpt.setAttribute('type', 'number');
    inpt.setAttribute('value', num);
    inpt.setAttribute('min', '1');
    inpt.setAttribute('class', 'inp-width');

    td_node.appendChild(inpt);
    tr_node.appendChild(td_node);

    inpt.addEventListener('input', function (evt) {
        setPriceByChangeCount(this.value, inpt);
    });
}

function createTotalElementPrice(txt) {
    td_node = document.createElement("td");
    var td_txt_node = document.createTextNode(txt);
    td_node.appendChild(td_txt_node);
    tr_node.appendChild(td_node);
}

function createRemovedBtn() {
    td_node = document.createElement("td");
    var btn_node = document.createElement("button");
    var btn_txt_node = document.createTextNode("Remove");
    btn_node.classList.add("btn1");
    btn_node.classList.add("black-btn");
    btn_node.appendChild(btn_txt_node);
    btn_node.onclick = function () {

        var idNode = btn_node.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[2];
        clearItemFromLocaleStorage(idNode.value);

        var totalElementPrice = btn_node.parentNode.parentNode.childNodes[4];
        total = total - parseInt(totalElementPrice.textContent);
        setTotalText();
        checkEmpty();

        var index = btn_node.parentNode.parentNode.rowIndex;
        document.getElementById("tbl").deleteRow(index);


    }
    td_node.appendChild(btn_node);
    tr_node.appendChild(td_node);
}

function checkEmpty() {
    var storedArray = JSON.parse(localStorage.getItem("cartArray"));

    if (storedArray === undefined || storedArray.length == 0) {

        var element = document.getElementById("checkoutBtn");
        element.parentNode.removeChild(element);

        var element = document.getElementById("total");
        element.parentNode.removeChild(element);

        setEmptyCart();
    }
}

function setPriceByChangeCount(counter, input) {
    var price_input = input.parentNode.parentNode.childNodes[2];
    var price = parseInt(price_input.textContent);

    var result = String(price * counter);
    var txt = result.concat(" $");
    var totalElementPrice = input.parentNode.parentNode.childNodes[4];
    totalElementPrice.textContent = txt;

    var id = input.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[2].value;
    editQuantityInLocaleStorage(id, counter);

    reCaculateTotal();

}

function clearItemFromLocaleStorage(id) {
    var newArray = [];

    var storedArray = JSON.parse(localStorage.getItem("cartArray"));
    storedArray.forEach(element => {
        if (element.id == id) return;
        newArray.push(element);

    });

    localStorage.setItem("cartArray", JSON.stringify(newArray));

}

function editQuantityInLocaleStorage(id, newValue) {
    var newArray = [];
    
    if (total != 0) {
        var storedArray = JSON.parse(localStorage.getItem("cartArray"));
        storedArray.forEach(element => {
            if (element.id == id) {
                element.quantity = newValue;
            }
            newArray.push(element);

        });

    }

    localStorage.setItem("cartArray", JSON.stringify(newArray));
}

function reCaculateTotal() {
    total = 0;
    
    var storedArray = JSON.parse(localStorage.getItem("cartArray"));
    storedArray.forEach(element => {
        var totalElementPrice = parseInt(element.price) * parseInt(element.quantity);
        total = total + totalElementPrice;

    });

    setTotalText();
}

function setTotalText() {

    var str1 = "Total Price = ";
    var str2 = total;
    var str3 = "$";
    var res = str1.concat(str3, str2);

    document.getElementById("total").innerHTML = res;
}

function submit(){
    alert("Thank you for Submitting, Your order is added to the board");
    localStorage.clear();
    window.location.href = "cart.html";
}



