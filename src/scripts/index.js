let cart = {};
// my cart

window.onload = function () {
    loadJson();
    checkCart();
    showMiniCart();
};

const loadJson = () => {
    // load and parse JSON
    fetch("data.json")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            let out = '';
            // output pattern
            for (let key in data) {
                out += `<div class="single-good">`
                out += `<H2> ${data[key].name} </H2>`
                out += `<p>Цена: <span class="cost">${data[key].cost}</span></p>`
                out += `<img class="img-good" src ="${data[key].image}">`
                out += `<button class="add" data-atr="${key}">Купить</button>`
                out += `</div>`
            }
            document.getElementById("goods").innerHTML = `${out}`;
            //the output of products

            let elem = document.querySelectorAll(".add");
            for (let i = 0; i < elem.length; i++) {
                elem[i].onclick =
                    function () {
                        // add to cart
                        let articul = this.getAttribute('data-atr');
                        if (cart[articul] != undefined) {
                            cart[articul]++;
                        }
                        else {
                            cart[articul] = 1;

                        }
                        localStorage.setItem('cart', JSON.stringify(cart));  // save  localStorage              
                        showMiniCart();


                    };
            }
        })

}

const checkCart = () => {
    // check the cart in localStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))

    }
}

const showMiniCart = () => {
    // show MiniCart     
    let out = `<a href="http://127.0.0.1:5500/cart.html">Cart</a>`;
    let item = 0;
    for (let key in cart) {
        item += cart[key]

    }
    document.getElementById("mini-cart").innerHTML = `${out} ${item}`;
}

