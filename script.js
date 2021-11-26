const wrapper = document.querySelector(".wrapper");
const input = wrapper.querySelector("input");
const fas = wrapper.querySelector(".word .fas");
const infoText = wrapper.querySelector(".info-text");
const list = wrapper.querySelector(".synonyms .list");
const materialIcons = wrapper.querySelector(".search .material-icons");
let audio;
function data(result,word){
     if(result.title){
          infoText.innerHTML = `Can't Find the Meaning of <span>"${word}"</span>. Please, Try to Search for Another word.`;
     }else{
          wrapper.classList.add("active");
          let definitions = result[0].meanings[0].definitions[0],
          phontetics = `${result[0].meanings[0].partOfSpeech}  /${result[0].phonetics[0].text}/`;
          document.querySelector(".word p").innerText = result[0].word;
          document.querySelector(".word span").innerText = phontetics;
          document.querySelector(".meaning span").innerText = definitions.definition;
          document.querySelector(".example span").innerText = definitions.example;
          audio = new Audio('https:' + result[0].phonetics[0].audio);
          if(definitions.list[0] == undefined){
               list.parentElement.style.display = "none";
          }else{
               list.parentElement.style.display = "block";
               list.innerHTML = "";
               for(let i = 0;i < 5;i++){
                    let tag = `<span onclick="search('${definitions.list[i]}')">${definitions.list[i]},</span>`;
                    tag = i == 4 ? tag = `<span onclick="search('${definitions.list[i]}')">${definitions.list[4]}</span>` : tag;
                    list.insertAdjacentHTML("beforeend",tag);
               }
          }
     }
}
function search(word){
     fetchApi(word);
     input.value = word;
}
function fetchApi(word){
     wrapper.classList.remove("active");
     infoText.style.color = "#000";
     infoText.innerHTML = `Searching the Meaning of <span>"${word}"</span>`;
     let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
     fetch(url)
          .then(response => response.json())
          .then(result => data(result,word))
          .catch(() =>{
               infoText.innerHTML = `Can't Find the Meaning of <span>"${word}"</span>. Please, Try to Search for Another Word.`;
          });
}
input.addEventListener("keyup",event =>{
     let word = event.target.value.replace(/\s+/g,' ');
     if(event.key == "Enter" && word){
          fetchApi(word);
     }
});
fas.addEventListener("click",() => {
     fas.style.color = "#4D59FB";
     audio.play();
     setTimeout(() =>{
          fas.style.color = "#999";
     },900);
});
materialIcons.addEventListener("click",() => {
     input.value = "";
     input.focus();
     wrapper.classList.remove("active");
     infoText.style.color = "#9A9A9A";
     infoText.innerHTML = "Type Any Existing Word and Press Enter to get Meaning, Example, List, etc...";
});