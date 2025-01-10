
//import "./payment.js";
//import { products } from "./product.js";
const cart = [];
const products = [
    {
        name: "ROYIYI Chemisier",
        price: 31.99,
        image: "./images/chemise1.jpeg",
        quantity: 1,
        stock: 10,
        id: "1"
    },
    {
        name: "KEERADS Chemisier",
        price: 28.36,
        image: "./images/chemise2.jpg",
        quantity: 1,
        stock: 6,
        id: "2"
    },
    {
        name: "HYUXIN Chemisier",
        price: 42.95,
        image: "./images/chemise3.webp",
        quantity: 1,
        stock: 9,
        id: "3"
    },
    {
        name: "CAVELA Chemisier",
        price: 61.99,
        image: "./images/chemise4.jpeg",
        quantity: 1,
        stock: 12,
        id: "4"
    },
    {
        name: "SEAN PAUL Chemisier",
        price: 35.99,
        image: "./images/chemise5.jpeg",
        quantity: 1,
        stock: 10,
        id: "5"
    },
    {
        name: "ISVIRA Chemisier",
        price: 38.36,
        image: "./images/chemise6.jpg",
        quantity: 1,
        stock: 16,
        id: "6"
    },
    {
        name: "LACOSTE Chemisier",
        price: 22.95,
        image: "./images/chemise7.jpg",
        quantity: 1,
        stock: 9,
        id: "7"
    },
    {
        name: "SAINT LOUIS Chemisier",
        price: 51.90,
        image: "./images/chemise8.jpg",
        quantity: 1,
        stock: 4,
        id: "8"
    },
    {
        name: "CARLA Chemisier",
        price: 21.99,
        image: "./images/chemise9.webp",
        quantity: 1,
        stock: 3,
        id: "9"
    },
    {
        name: "CIDERAL Chemisier",
        price: 38.36,
        image: "./images/chemise10.webp",
        quantity: 1,
        stock: 6,
        id: "10"
    },
    {
        name: "GENEDIS Chemisier",
        price: 22.95,
        image: "./images/chemise11.jpg",
        quantity: 1,
        stock: 2,
        id: "11"
    },
    {
        name: "SITCH Chemisier",
        price: 41.95,
        image: "./images/chemise12.jpg",
        quantity: 1,
        stock: 8,
        id: "12"
    },
    {
        name: "VANULA Chemisier",
        price: 39.99,
        image: "./images/chemise13.jpg",
        quantity: 1,
        stock: 17,
        id: "13"
    },
    {
        name: "RIVIERE Chemisier",
        price: 39.16,
        image: "./images/chemise14.jpg",
        quantity: 1,
        stock: 12,
        id: "14"
    },
    {
        name: "XENON Chemisier",
        price: 28.95,
        image: "./images/chemise15.jpg",
        quantity: 1,
        stock: 9,
        id: "15"
    },
    {
        name: "ZENITH Chemisier",
        price: 18.90,
        image: "./images/chemise16.webp",
        quantity: 1,
        stock: 14,
        id: "16"
    }
]

//<!---------------------------------------------------variables----------------------------------------------------------->

    const btns = document.querySelectorAll(".add-btn");
    const cartBody = document.querySelector(".in-cart");
    const costItem = document.querySelector(".js-cost-item");
    const totalQty = document.querySelector(".js-total-qty");
    const totalCash= document.querySelector(".js-total-cash");
    const bagItem = document.querySelector(".bag-item");
    const addProducts = document.querySelector(".products");
    const openBag = document.querySelector(".fa-shopping-bag");
    const closeBag = document.querySelector(".fa-window-close");
    const cartBloc = document.querySelector(".cart");
    const inStock = document.querySelector(".stock");
    const clearCart = document.querySelector(".js-clear");

    let productHtml = '';
    let cartItem = '';
    let itemInCart = 0;

    const   prodBox = document.createElement("div");
    prodBox.classList.add("prod-box");
    prodBox.innerHTML = '';

//-------------------------------------------DOMloadContent-------------------------------------------------------
    products.forEach((product) => {
        productHtml += `
             <div class="prod-box">
                <div class="prod-image">
                    <img src=${product.image} alt="">
                </div>
                <div class="prod-name">
                    <p class="name">${product.name}</p>
                    <p class="price">$${product.price}</p>
                </div>
                <div class="div-btn">
                    <p class="stock">In Stock : ${product.stock} </p>
                    <button class="add-btn prod-button" data-product-id=${product.id}>add to cart</button>
                </div>
            </div>
        `;
    })

    addProducts.innerHTML = productHtml;

    saveProducts(products);

    openBag.addEventListener("click", () => {
        if (cartBloc.classList.contains("none-item") && itemInCart !== 0){
            cartBloc.classList.remove("none-item")
        }else
        {return null}
    });

    closeBag.addEventListener("click", () => {
        if (!cartBloc.classList.contains("none-item")){
            cartBloc.classList.add("none-item")
        }else
        {return null}
    });

        addProducts.addEventListener("click", (e)=> {

            console.log(e);
            console.log(e.target);
            let eTarget = e.target;
            let productId = e.target.dataset.productId;
    
            if (eTarget.classList.contains("add-btn") && eTarget.disabled === false){   
                getProducts();
                let productPicked = products.find(item => item.id === productId);
                cart.push(productPicked);
                console.log(cart);
                let newCart = cart.find(item => item.id === productId);
                    if (newCart){
                        eTarget.disabled = true;
                        eTarget.innerHTML = "In Your Cart";
                    }
                    addCartItems(productPicked);

                    cart.forEach((c) => {
                        if (c.id === productId){
                            eTarget.previousElementSibling.innerHTML = `<p class="stock">In Stock : ${c.stock--} </p>`;
                        }
                    })
                    cartCalcul(cart);
            }
            saveCart();
        })

    cartBody.addEventListener("click", (e)=> {
        let eTarget = e.target;
        let cartId = e.target.dataset.id;

        if (eTarget.classList.contains("remove")){
            let cartFill = cart.map(item => item);
            let cartToRemove = cart.filter(item => item.id !== cartId);
            cart.splice(cartFill);
            cart.push(...cartToRemove);
            console.log(cart);
            itemInCart--;
            cartCalcul(cart);
            cartBody.removeChild(e.target.parentNode.parentNode);
            saveCart();
        }else

        if (eTarget.classList.contains("plus")){
            getCart();
            cart.forEach((c) => { 

                if ((c.stock >= 1) && (c.id === cartId)){
                    c.quantity += 1;
                    c.stock -= 1;
                    eTarget.previousElementSibling.innerHTML = `${c.quantity}`;
                    eTarget.nextElementSibling.innerHTML = `$${(c.quantity * c.price).toFixed(2)}`;
                }else
                {
                    return null
                }
            })
            cartCalcul(cart);
            console.log(cart);
            saveCart();
        }else

        if (eTarget.classList.contains("minus")){
            getCart();
            cart.forEach((c) => { 

                if ((c.quantity > 0) && (c.id === cartId)){
                    c.quantity = c.quantity - 1;
                    c.stock += 1;
                    eTarget.disabled = false;
                    eTarget.nextElementSibling.innerHTML = `${c.quantity}`;
                    eTarget.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML = `$${(c.quantity * c.price).toFixed(2)}`;
                }else
                {
                    eTarget.disabled = true;
                }
            })
            cartCalcul(cart);
            console.log(cart);
            saveCart();
        }
    })

    clearCart.addEventListener("click", ()=>{
        getCart();
        cartBody.innerHTML = '';
        cartItem = cart.map(item => item);
        cart.splice[cartItem];
        itemInCart = 0;
        totalCashCarts = 0;
        totalQtyCarts = 0;
        bagItem.innerHTML = itemInCart;
        totalCash.innerHTML = `Cash : $${totalCashCarts.toFixed(2)}`;
        totalQty.innerHTML = `Qty : ${totalQtyCarts} item(s)`; 
        saveCart();
    })
//--------------------------------payment method------------------------------
    const payMent = document.querySelector('.js-payment');

    payMent.addEventListener('click', (e) => {
        getCart();
        console.log(e);
        //sessionStorage.setItem("cart", JSON.stringify(cart));
        window.location.href = "payment.html";
    })

    //------------------------------------------------functions----------------------------------------------------------
    function saveProducts() {
        sessionStorage.setItem("products", JSON.stringify(products));
    }
    function getProducts() {
        const products = JSON.parse(sessionStorage.getItem("products"));
    }
    function saveCart() {
        sessionStorage.setItem("cart", JSON.stringify(cart));
    }
    function getCart() {
        const cart = JSON.parse(sessionStorage.getItem("cart"));
    }

    function addCartItems(c) {
        
        const inCartBox = document.createElement("div");
        inCartBox.classList.add("in-cart-box");
        inCartBox.innerHTML = `
            <div class="in-cart-box">
                <div class="cart-image">
                    <img src=${c.image} alt="">
                </div>
                <div class="cart-elements">
                    <div class="cart-name">
                        <p>${c.name}</p>
                        <p>$${c.price}</p>
                    </div>
                    <div class="cart-counter">
                            <p class="pointer minus" data-id=${c.id}>-</p>
                            <p class="quantity">${c.quantity}</p>
                            <p class="pointer plus" data-id=${c.id}>+</p>
                            <h3 class="pointer">$${c.quantity * c.price}</h3>
                    </div>
                </div>
                <p class="remove" data-id=${c.id}>-</p>
            </div>
                `;
        cartBody.appendChild(inCartBox);
        c.stock = c.stock - 1; 
        itemInCart += 1;
    }

    function cartCalcul(cartSet) {
        let totalCashCarts = 0;
        let totalQtyCarts = 0;
        cartSet.forEach((c)=>{
            totalCashCarts += c.quantity * c.price;
            totalQtyCarts += c.quantity;
        })
        bagItem.innerHTML = itemInCart;
        totalCash.innerHTML = `Cash : $${totalCashCarts.toFixed(2)}`;
        totalQty.innerHTML = `Qty : ${totalQtyCarts} item(s)`;   
    }

    //----------------------landing page------------------------------------
    const movement = {
        distance: "50px",
        origin: "top",
        duration: 1000
    };
    const movement1 = {
        distance: "50px",
        origin: "top",
        duration: 2000
    };
    const movement2 = {
        distance: "50px",
        origin: "top",
        duration: 3000
    };

    ScrollReveal().reveal('.hello h2',{
        ...movement,
        origin: "top"
    });
    ScrollReveal().reveal('.hello h3',{
        ...movement1,
        origin: "top"
    });
    ScrollReveal().reveal('.hello h4',{
        ...movement2,
        origin: "top"
    });
    ScrollReveal().reveal('.a1',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:250
    });
    ScrollReveal().reveal('.a2',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:500
    });
    ScrollReveal().reveal('.a3',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:750
    });
    ScrollReveal().reveal('.a4',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:1000
    });
    ScrollReveal().reveal('.a5',{
        duration:2500,
        distance: "30px",
        origin: "left",
        delay:1250
    });
    ScrollReveal().reveal('.a6',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:1500
    });
    ScrollReveal().reveal('.a7',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:1750
    });
    ScrollReveal().reveal('.a8',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:2000
    });
    ScrollReveal().reveal('.a9',{
        duration:500,
        distance: "30px",
        origin: "left",
        delay:2250
    });

