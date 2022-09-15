const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let xhr = new XMLHttpRequest();
xhr.open('GET',url,true);

xhr.onload = function(){

}


let btn = document.getElementById('button');
let result = document.getElementById('result');
let sound = document.getElementById('sounds');



fetchData = function(){
    let input = document.getElementById('searchWord').value;
    // console.log(input);
    
    let xhr = new XMLHttpRequest();
    xhr.open('GET',`${url}${input}`,true);
    
    
    xhr.onload = function(){
        if(this.status === 200){
            let data = JSON.parse(this.responseText);
            // console.log(obj);
            result.innerHTML = `<div class="word">
            <h2>${input}</h2>
            <i class="fa-sharp fa-solid fa-volume-high" onclick ="playSound()"></i>
            </div>
            <div class="details">
            <p>${data[0].phonetics[0].text || ""}</p>
            <p>${data[0].meanings[0].partOfSpeech}</p>
            </div>
            <div class="wordmeaning">
            <P>${data[0].meanings[0].definitions[0].definition}</P>
            </div><div class="example">
            <P>Example : <br>${data[0].meanings[0].definitions[0].example || ""}</P>
            </div>`;
            sound.setAttribute("src",`${data[0].phonetics[0].audio}`);
            console.log(sound)
        }
    else
    console.log("Kuch toh gadbad hai");
}

xhr.send();

}
btn.addEventListener("click",fetchData);

function playSound(){
    sound.play();
}
