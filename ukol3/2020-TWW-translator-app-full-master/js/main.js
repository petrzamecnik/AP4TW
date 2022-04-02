// select the button using ID
let button = document.querySelector('#translateBtn');
let userInput = document.querySelector('#userInput');
let resultInput = document.querySelector('#result');
let loadingDiv = document.querySelector('#loading');
// let historySection = document.getElementById("history-section");
let historyP = document.getElementById("history-p");
let usrIn = ""
let res = ""


// function addItemToHistory(valueIn, valueOut) {
//     let numOfItemsInStorage = localStorage.length
//     localStorage.setItem(valueIn, valueOut)
// }

function addItemToHistory(valueIn, valueOut) {
    let numOfItemsInStorage = localStorage.length
    let text = valueIn + " -> " + valueOut
    localStorage.setItem(numOfItemsInStorage, text)
}


function loadHistory() {
    let numOfItemsInStorage = localStorage.length
    historyP.innerHTML = ""

    for (let i = numOfItemsInStorage - 1; i >= 0; i--) {
        let text = localStorage.getItem(i)
        historyP.innerHTML += text + "<br>"
    }
}


button.onclick = function () {
    // show the loading dialog
    loadingDiv.style.display = 'block';
    // disable translate button
    button.setAttribute('disabled', 'disabled');

    console.log(userInput.value);
    usrIn = userInput.value;
    let inputText = userInput.value;

    // test - write into DOM
    resultInput.value = inputText;

    // REST API url endpoint
    let url = 'https://api.mymemory.translated.net/get?q=' + inputText + '&langpair=cs|en';

    // create the GET request against API to obtain JSON result
    fetch(url)
        .then(function (response) {
            // server returns the response, parse it to JSON
            return response.json();
        })
        .then(function (myJson) {
            console.log(myJson);
            // get translation string from JSON, put it in result input
            resultInput.value = myJson.responseData.translatedText;
            res = resultInput.value;

            // my things
            addItemToHistory(usrIn, res)
            loadHistory()

            // hide the loading dialog
            loadingDiv.style.display = 'none';
            // enable translate button
            button.removeAttribute('disabled');
        });
}


