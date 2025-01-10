//{}

paypal.Buttons({
    createOrder: function(data,actions){
        return actions.order.create({
            intent: 'CAPTURE',
            payer: {
                name: {
                    given_name:'',
                    surname:''
                },
                adress: '',
                email_adress: '',
            },
            purchase_units: [{
                amount: {
                    value: `${invoice}`,
                    currency_code: "USD"
                }
            }]
        });
    },
    onApprove: function(data,actions){
        return actions.order.capture().then(function(details){
            console.log(details);
            orderId = details.id
            alert("Thanks for your payment !" +details.payer.name.given_name);
        })
    },
    onCancel: function(data){
        alert("Payment cancelled");
    },
    onError: function(err){
        alert("Something went wrong");
    },
}).render('#paypal-button-container');

//----------------------landing page------------------------------------
const movement = {
    distance: "50px",
    origin: "top",
    duration: 2000
};
const movement1 = {
    distance: "50px",
    origin: "top",
    duration: 4000
};
const movement2 = {
    distance: "50px",
    origin: "top",
    duration: 6000
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