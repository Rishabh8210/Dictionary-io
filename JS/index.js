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

            let phoneticsText = "";
            let partofspeech = "";
            let Definition = "";
            let Example = "";

            // For Phonetics Text
            for(i = 0; i < data[0].phonetics.length; i++){
                if(`${data[0].phonetics[i].text}` != ""){
                    phoneticsText = `${data[0].phonetics[i].text}`;
                    break;
                }
            }

            // For PartOfSpeech 
            for(i = 0; i < data[0].meanings.length; i++){
                if(`${data[0].meanings[i].partOfSpeech}` != ""){
                    partofspeech = `${data[0].meanings[i].partOfSpeech}`;
                    break;
                }
            }

            // For Wordmeaning

            for(i = 0; i < data[0].meanings.length; i++)
            {
                for(j = 0; j < data[0].meanings[i].definitions.length; j++)
                {
                    if(`${data[0].meanings[i].definitions[j].definition}` != ""){
                        Definition = `${data[0].meanings[i].definitions[j].definition}`;
                        break;
                    }
                }
                if(Definition != ""){
                    break;
                }
            }
            console.log(typeof Definition);
            console.log(typeof `${Definition}`);
            // For input Example
            for(i = 0; i < data[0].meanings.length; i++){
                for(j = 0; j< data[0].meanings[i].definitions.length; j++){
                    if(`${data[0].meanings[i].definitions[j].example}` != ""){
                        Example = `${data[0].meanings[i].definitions[j].example}`;
                        break;
                    }
                }
                if(Example != ""){
                    break;
                }
            }

            //Setting audio(src) attribute   
            for(i = 0; i <= data[0].phonetics.length; i++)
            {
                let temp = `${data[0].phonetics[i].audio}`;
                if(temp != ""){
                    sound.setAttribute("src",`${data[0].phonetics[i].audio}`);
                    break;
                }
            }

            result.innerHTML = `<div class="word">
            <h2>${input}</h2>
            <i class="fa-sharp fa-solid fa-volume-high" onclick ="sound.play()"></i>
            </div>
            <div class="details">
            <p>${phoneticsText}</p>
            <p>${partofspeech}</p>
            </div>
            <div class="wordmeaning">
            <P>${Definition}</P>
            </div><div class="example">
            <P>Example : <br>${Example}</P>
            </div>`;
            // // console.log(data[0].phonetics.length);
            // // sound.setAttribute("src",`${data[0].phonetics[1].audio}`);
            // console.log(sound)
        }
    else
    console.log("Kuch toh gadbad hai");
}

xhr.send();

}
btn.addEventListener("click",fetchData);

