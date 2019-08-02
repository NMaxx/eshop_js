let cart = {};
// my cart

window.onload = function () {
    loadJson()
    checkCart();

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
            for (let key in cart) {
                out += `<div class="cart-good">`
                out += `<button class="delit_goods" data-atr="${key}">x</button>`
                out += `<img class="img-good" src ="${data[key].image}" width="50px">`
                out += `<H2> ${data[key].name} </H2>`
                out += `<button class="minus_goods" data-atr="${key}">-</button>`
                out += `${cart[key]}`
                out += `<button class="plus_goods" data-atr="${key}">+</button>`
                out += ` итого : ${cart[key] * data[key].cost}`
                out += `</div>`

            }
            document.getElementById("cart").innerHTML = `${out}`;
            //the output of element

            //use button +
            let elemPlus = document.querySelectorAll(".plus_goods");
            for (let i = 0; i < elemPlus.length; i++) {
                elemPlus[i].onclick =
                    function () {
                        let articul = this.getAttribute('data-atr');
                        cart[articul]++;
                        loadJson();
                        saveCartLS();


                    }
            }
            //use button -
            let elemMinus = document.querySelectorAll(".minus_goods");
            for (let i = 0; i < elemMinus.length; i++) {
                elemMinus[i].onclick =
                    function () {
                        let articul = this.getAttribute('data-atr');
                        console.log(articul)
                        if (cart[articul] > 1) {
                            cart[articul]--
                        }
                        else {
                            delete cart[articul];
                        }
                        loadJson();
                        saveCartLS();


                    }
            }
            //use button x
            let elemDelit = document.querySelectorAll(".delit_goods");
            for (let i = 0; i < elemDelit.length; i++) {
                elemDelit[i].onclick =
                    function () {
                        let articul = this.getAttribute('data-atr');
                        delete cart[articul];
                        loadJson();
                        saveCartLS();


                    }
            }



        })


}

const saveCartLS = () => {
    // save  localStorage  
    localStorage.setItem('cart', JSON.stringify(cart));
    loadJson();

}

const checkCart = () => {
    // check the cart in localStorage
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'))
        
    }
}
