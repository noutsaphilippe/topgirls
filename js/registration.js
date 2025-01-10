const inputName = document.getElementById('name');
const inputEmail= document.getElementById('email');
const inputDate = document.getElementById('date');
const inputPass = document.getElementById('password');
const inputPassC = document.getElementById('c-password');
const inputQuest = document.getElementById('town');
const form = document.querySelector('form');
const errorMessage = document.querySelector('.error-message');

form.addEventListener("input", (i) => {
    const errors = [];

    if (i.target.value !== "" ){
        getSignupValidation(inputName.value,inputDate.value,inputEmail.value,inputPass.value,inputPassC.value,inputQuest.value);
        console.log(inputName.value,inputDate.value,inputEmail.value,inputPass.value,inputPassC.value,inputQuest.value);
    }

    if (i.target.value === "" || i.target.value == null) {
        i.preventDefault();
        getSignupFormError(inputName.value,inputDate.value,inputEmail.value,inputPass.value,inputPassC.value,inputQuest.value,errors);
        console.log(errors);
    }

    if (errors.length > 0) {
        //that means there are some errors
        i.preventDefault();
        errorMessage.innerText = errors.join('. ');
    }
})

const allInputs = [inputDate,inputEmail,inputName,inputPass,inputPassC,inputQuest];

    allInputs.forEach((input) => {
        input.addEventListener("input", (e) => {
            if (input.classList.contains('incorrect')){
                input.classList.remove('incorrect');
                errorMessage.innerText = '';
            }
        })
    })

function getSignupFormError(name,date,email,passw,passwc,question,errors) {
    
    if(name === "" || name == null){
        errors.push("Full Name is required")
        inputName.classList.add('incorrect')
    }
    if(email === "" || email == null){
        errors.push("Email is required")
        inputEmail.classList.add('incorrect')
    }
    if(date === "" || date == null){
        errors.push("Date of birth is required")
        inputDate.classList.add('incorrect')
    }
    if(passw === "" || passw == null){
        errors.push("Password is required")
        inputPass.classList.add('incorrect')
    }
    if(passwc === "" || passwc == null){
        errors.push("Confirmation password is required")
        inputPassC.classList.add('incorrect')
    }
    if(question === "" || question == null){
        errors.push("Security question field is required")
        inputQuest.classList.add('incorrect')
    }
    if(passw !== passwc){
        errors.push("Passwords does not match")
        inputPassC.classList.add('incorrect')
        inputPass.classList.add('incorrect')
    }

    return errors;
}

function getSignupValidation(name,date,email,passw,passwc,question) {
    if(name !== ""){
        fullName = name;
        sessionStorage.setItem('fullName', fullName);
    }
    if(date !== ""){
        dateOfBirth = date;
        sessionStorage.setItem('dateOfBirth', dateOfBirth);
    }
    if(email !== ""){
        emailValue = email;
        sessionStorage.setItem('emailValue', emailValue);
    }
    if(passw !== ""){
        passWord = passw;
        sessionStorage.setItem('passWord', passWord);
    }
    if(passwc !== ""){
        confirmPass = passwc;
        if(confirmPass === passWord) {
            sessionStorage.setItem('confirmPass', confirmPass);
        }else {
            element.formNoValidate = false;
            element.checked = false;
        } 
    }
    if(question !== ""){
        questionValue = question;
        sessionStorage.setItem('questionValue', questionValue);
    }
}