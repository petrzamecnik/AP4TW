// select the button using ID
let button = document.querySelector('#translateBtn');
let userInput = document.querySelector('#userInput');
let resultInput = document.querySelector('#result');
let loadingDiv = document.querySelector('#loading');
var usrIn = ""
var res = ""


function checkLocalStorage(){
    if (localStorage.length > 0)
        return false
    else
        return true
}

function fillHistory() {
    if (checkLocalStorage()){
        let p = document.getElementById("history-text")

    }
}


button.onclick = function () {
    // show the loading dialog
    loadingDiv.style.display = 'block';
    // disable translate button
    button.setAttribute('disabled','disabled');

    console.log(userInput.value);
    usrIn = userInput.value;
    let inputText = userInput.value;

    // test - write into DOM
    resultInput.value = inputText;

    // REST API url endpoint
    let url = 'https://api.mymemory.translated.net/get?q=' + inputText + '&langpair=cs|en';

    // create the GET request against API to obtain JSON result
    fetch(url)
    .then(function(response) {
        // server returns the response, parse it to JSON
        return response.json();
    })
    .then(function(myJson) {
        console.log(myJson);
        // get translation string from JSON, put it in result input
        resultInput.value = myJson.responseData.translatedText;
        res = resultInput.value;


        let lsCount = 0
        let lsText = usrIn + " -> " + res
        console.log(lsText)

        localStorage.setItem(lsCount, lsText)

        console.log(localStorage)


        // hide the loading dialog
        loadingDiv.style.display = 'none';
        // enable translate button
        button.removeAttribute('disabled');
    });



    //
    // if (checkLocalStorage()){
    //     console.log("LOCAL STORAGE EMPTY")
    //     localStorage.setItem()

// }




}


