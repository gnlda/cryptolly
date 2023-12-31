let rate = 0.0000345245;
let buyButton = document.querySelector("#buy");
let sellButton = document.querySelector("#sell");
let currentState = true; // true = buy, false = sell
let row1 = document.querySelector("#row1");
let row2 = document.querySelector("#row2");
let input1 = row1.querySelector("input");
let input2 = row2.querySelector("input");
let converterButton = document.querySelector(".converter__button");
let change = false;
const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];


const buyButtonClickHandler = () => {
    if (!currentState) {
        currentState = true;
        rate = 0.0000345245;
        input1.value = 4.000.toFixed(3);
        input2.value = input1.value * rate;
        sellButton.classList.toggle("active");
        buyButton.classList.toggle("active");
        row1.querySelector("#wallet__logo").src = "img/USD.svg";
        row1.querySelector("span").innerHTML = "USD";
        row2.querySelector("#wallet__logo").src = "img/Bitcoin.svg";
        row2.querySelector("span").innerHTML = "BTC";
        converterButton.innerHTML = "Buy Now";
        change = false;
    }
}

const sellButtonClickHandler = () => {
    if (currentState) {
        currentState = false;
        rate = 28964.9;
        input1.value = 1.000.toFixed(3);
        input2.value = input1.value * rate;
        sellButton.classList.toggle("active");
        buyButton.classList.toggle("active");
        row1.querySelector("#wallet__logo").src = "img/Bitcoin.svg";
        row1.querySelector("span").innerHTML = "BTC";
        row2.querySelector("#wallet__logo").src = "img/USD.svg";
        row2.querySelector("span").innerHTML = "USD";
        converterButton.innerHTML = "Sell Now";
        change = false;
    }
}

const valueInputHandler = (e) => {
    console.log(e.data)
    if (!nums.includes(e.data)) {
        input1.value = input1.value.substring(0, input1.value.length - 1);
    }
    input2.value = input1.value * rate;
}

const firstInputClick = () => {
    if (!change) {
        input1.value = '';
        change = true;
    }
}


buyButton.addEventListener("click", buyButtonClickHandler);
sellButton.addEventListener("click", sellButtonClickHandler);
input1.addEventListener("input", valueInputHandler);
input1.addEventListener("click", firstInputClick);
