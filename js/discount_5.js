
const cart = JSON.parse(sessionStorage.getItem('cart'));
const scoreRating = sessionStorage.getItem('scoreRating');

const noDiscount = document.querySelector('.js-no');
const yesDiscount = document.querySelector('.js-yes');
const paymentMode = document.querySelector('.method');
const bagItem = document.querySelector('.bag-item');
let paymentHtml = '';
let cashBill = 0;
console.log(cart);

//-------------------------bring items in cart------------------------------

    cart.forEach((c) => {
        paymentHtml += `
            <div class="each-prod">
                    <div class="img-bill">
                    <img src=${c.image} alt="">
                    </div>
                    <p class="numb">id : ${c.id}</p>
                    <p class="name">article : ${c.name}</p>
                    <p class="price">unit cost : $${c.price}</p>
                    <p class="quantity"> quantity ordered : ${c.quantity}</p>
                    <p class="final-price">total : $${(c.price*c.quantity).toFixed(2)}</p>
            </div>
        ` ;
        cashBill += c.price * c.quantity;
    })
    document.getElementById('art').innerHTML = paymentHtml;
    let invoice = (cashBill * (1-(5/100))).toFixed(2);
    bagItem.innerHTML = `<span class="bag-item">${cart.length}</span>`;
    noDiscount.innerHTML = `<h3 class="js-no"> Invoice : $ ${cashBill.toFixed(2)} </h3>`;
    yesDiscount.innerHTML = `<h3 class="js-yes"> Invoice : $ ${invoice} </h3>`;
    sessionStorage.setItem("invoice", JSON.stringify(invoice));

    //---------------------display identity--------------------------------------------------
    const identity = document.querySelector(".identity");
    identity.innerHTML = `
    <p>Hello Mr(s).
        <span class="full-name"> you rated us ${scoreRating}
        </span> 
    </p>
    <p>you just received 5% discount !</p>
    `;