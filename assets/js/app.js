const inputText =  document.querySelector("#password");
const passwordLength = document.querySelector("#password-length");
const securityIndicatorBar = document.querySelector("#security-indicator-bar");
const uppercaseCheckElement = document.querySelector("#uppercase-check");
const numbersCheckElement = document.querySelector("#numbers-check");
const symbolCheckElement = document.querySelector("#symbol-check");


const generatePasswordTrigger = () =>{

    generatePassword();

    passwordLength.addEventListener('input', () =>{
        document.querySelector('#length-value').innerText = passwordLength.value;
        generatePassword();
    });
}

const generatePassword = () => {

    let chars = "abcdefghjkmnpqrstuvwxyz";
    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbersChars = "123456789";
    const symbolsChars = "?!@&*()[]";
    let password = "";
    
    if(document.querySelector("#uppercase-check").checked){
        chars += upperCaseChars;
    }

    if(document.querySelector("#numbers-check").checked){
        chars += numbersChars;
    }
    
    if(document.querySelector("#symbol-check").checked){
        chars += symbolsChars;
    }


    for(let i = 0; i < passwordLength.value; i++){
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }

    inputText.value = password;
    calculateSecurity();
    calculatefontSize();
}

const copyPassword = () => {
    const btn1 = document.querySelector("#copyBtn");
    const btn2 = document.querySelector("#copy");

    btn1.addEventListener("click", () =>{
        navigator.clipboard.writeText(inputText.value)
    });

    btn2.addEventListener("click", () =>{
        navigator.clipboard.writeText(inputText.value)
    });
}

const calculateSecurity = () => {
    // o peso de todas as variáveis tem que totalizar 100
    const percent = Math.round( (passwordLength.value / 64) * 30 + (uppercaseCheckElement.checked ? 15:0) + (numbersCheckElement.checked ? 25:0) + (symbolCheckElement.checked ? 30:0)     );

    securityIndicatorBar.style.width = `${percent}%`  

    if(percent >= 65){
       securityIndicatorBar.classList.remove("critical");
       securityIndicatorBar.classList.remove("warning");
       securityIndicatorBar.classList.remove("completed");
    
       securityIndicatorBar.classList.add("safe");

        if(percent === 100){
            securityIndicatorBar.classList.add("completed");
        }

    }else if(percent <= 35){
        securityIndicatorBar.classList.remove("safe");
        securityIndicatorBar.classList.remove("warning");
        securityIndicatorBar.classList.remove("completed");

        securityIndicatorBar.classList.add("critical");
    }else{
        securityIndicatorBar.classList.remove("safe");
        securityIndicatorBar.classList.remove("critical");
        securityIndicatorBar.classList.remove("completed");

        securityIndicatorBar.classList.add("warning");
    }
}

const calculatefontSize = () => {
    if(passwordLength.value > 45){
        inputText.classList.remove("font-sm");
        inputText.classList.remove("font-xs");

        inputText.classList.add("font-xxs");

    }else if(passwordLength.value > 34){
        inputText.classList.remove("font-sm");
        inputText.classList.remove("font-xxs");

        inputText.classList.add("font-xs");

    }else if(passwordLength.value > 20){
        inputText.classList.remove("font-xxs");
        inputText.classList.remove("font-xs");

        inputText.classList.add("font-sm");

    }else{
        inputText.classList.remove("font-sm");
        inputText.classList.remove("font-xs");
        inputText.classList.remove("font-xxs");
    }
}

uppercaseCheckElement.addEventListener("click", () =>{
    generatePasswordTrigger();
});


numbersCheckElement.addEventListener("click", () =>{
    generatePasswordTrigger();
});


symbolCheckElement.addEventListener("click", () =>{
    generatePasswordTrigger();
});


document.querySelector("#renew").addEventListener("click", () =>{
    generatePasswordTrigger();
});



generatePasswordTrigger();
copyPassword();


