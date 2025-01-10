
const cart = JSON.parse(sessionStorage.getItem('cart'));

const totalBill = document.querySelector('.total-bill');
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
    bagItem.innerHTML = `<span class="bag-item">${cart.length}</span>`
    let invoice = cashBill.toFixed(2);
    sessionStorage.setItem("invoice", JSON.stringify(invoice));
    totalBill.innerHTML = `<h3 class="total-bill"> Invoice : $ ${cashBill.toFixed(2)} </h3>`;
    //-------------------------rating-------------------------------------------------

    const faStar = document.querySelectorAll('.fa-star');

    faStar.forEach((star, index) => {
        star.addEventListener('click', (el) => {
            faStar.forEach((star, index2) => {
                console.log(star);
                if (index >= index2 ) {
                    console.log(index, index2);
                    let scoreRating = `${Math.round(((index + 1) / 6) * 100)}%`;
                    console.log(scoreRating);
                    star.style.color = "rgb(255, 247, 0)";
                    sessionStorage.setItem('scoreRating', scoreRating);
                    invoice = (cashBill * (1-(5/100))).toFixed(2);
                    totalBill.innerHTML = `<h3 class="total-bill"> Invoice : $ ${invoice} </h3>`;
                    sessionStorage.setItem("invoice", JSON.stringify(invoice));
                    window.location.href = "./discount_5.html";
                }else
                {
                    star.style.color = "rgb(0, 0, 0)";
                }
            })
        })
    })

    /*faStar.forEach((star, index) => {
        star.addEventListener('mousemove', (el) => {
            faStar.forEach((star, index2) => {
                console.log(star);
                if (index >= index2 ) {
                    star.style.color = "rgb(255, 247, 0)";
                }else
                {
                    star.style.color = "rgb(0, 0, 0)";
                }
            })
        })
    })*/

    //------------------------------fieldset comment--------------------------
    const form = document.querySelector('form');
    const formP = document.querySelector('form p');
    const textArea = document.querySelector('textarea');

    form.addEventListener('submit', (e) => {
        if(e.target.value !== "" || e.target.value !== null) {
            const inputValue = e.target.value;
            console.log(inputValue);
            sessionStorage.setItem("inputValue", inputValue);
        }else
        {
            e.target.classList.add('incorrect');
            formP.innerHTML = "please rate first";
            e.preventDefault();
        }
    })

    //---------------------------------sign in------------------------------------
    const signIn = document.querySelector('.get-discount');
    const inputPassword = document.getElementById('password');
    const btnForm = document.querySelector('.btn-form');
    const inputEmail = document.getElementById('email');
    const emailValue = sessionStorage.getItem('emailValue');
    const passWord = sessionStorage.getItem('passWord');
    const errorLog = document.querySelector('.error-log');

   /*signIn.addEventListener('input', (e) => {

        if (e.target.name === "email") {
            inputEmail.addEventListener('input', (c) => {
                //e.preventDefault();
                let getEmail = c.target.value;
                if(getEmail !== "" && getEmail == emailValue) {
                    console.log(getEmail);
                    sessionStorage.setItem("getEmail", getEmail);
                }else
                {
                    inputEmail.classList.add("incorrect");
                    alert("this email is not registered");
                }
            })
        }

        if (e.target.name === "password") {
            inputPassword.addEventListener('input', (c) => {
                //e.preventDefault();
                let passValue = c.target.value;
                if(passValue !== "" && passValue == passWord) {
                    console.log(passValue);
                    sessionStorage.setItem("passValue", passValue);
                }else
                {
                    inputPassword.classList.add("incorrect");
                    alert("this password is not registered");
                }
            })
        }

    })*/

   signIn.addEventListener('submit', (e) => {
        const errors = [];
        //{}
        /*if (e.target.value === "" ) {
            if (inputEmail.value === ""){
                inputEmail.classList.add("incorrect");
                errors.push("your email is needed");
            }
            if (inputPassword.value === ""){
                inputPassword.classList.add("incorrect");
                errors.push("your password is needed");
            }
        }*/

            if(inputEmail.value === emailValue && inputPassword.value === passWord) {
                console.log("Authenticated account, can receive 10% discount");
                invoice = (cashBill * (1-(1/10))).toFixed(2);
                console.log(invoice);
                totalBill.innerHTML = `<h3 class="total-bill"> Invoice : $ ${invoice} </h3>`;
                sessionStorage.setItem("invoice", JSON.stringify(invoice));
                console.log(inputPassword.value);
            }

            if(inputEmail.value !== emailValue) {
                inputEmail.classList.add("incorrect");
                errors.push("this email is not registered");
                e.preventDefault();
            }

            if(inputPassword.value !== passWord) {
                inputPassword.classList.add("incorrect");
                errors.push("this password is not registered");
                e.preventDefault();
            }
            
        errorLog.innerHTML = errors.join('. ');
    })
