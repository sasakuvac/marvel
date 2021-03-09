/* 

http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc

*/


let input = document.querySelector('input');
let resultsBox = document.querySelector('.results');
let button = document.querySelector('button');
let characterBox = document.querySelector('article');


   // function fetchCharacters() {
        fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc&limit=100')

    .then(res => res.json())
    .then(data => {
        let charactersList = data['data']['results'];
        
        console.log(charactersList)
        //results.textContent = characters [0].name;
        // let marvelImg = characters.thumbnail.path + '.' + characters.thumbnail.extension;
        // results.innerHTML = `<img src="${marvelImg}" />`
    
        button.addEventListener('click', test);
        function test() {
        for (let i = 0; i < charactersList.length; i++) {


            let marvelImg = document.createElement('img'); 
            marvelImg.className += 'char-images';
            marvelImg.src = charactersList[i].thumbnail.path + '.' + charactersList[i].thumbnail.extension;
            

            let marvelHeading = document.createElement('h3');
            marvelHeading.innerHTML = charactersList[i].name;

            
            characterBox.className = 'character-box';
            characterBox.appendChild(marvelImg);
            characterBox.appendChild(marvelHeading);


            if (charactersList[i] === charactersList[9]) {
                break;
            }

            /*if (charactersList[i] === charactersList[9]) {
                break;
            }*/
            

            
        }

    }
    })
//}
 
/*

 <article class="marvel-character-box">
                <img src="${marvelImg}" class="marvel-img">
                <h3 class="marvel-heading"> ${marvelCharacters[i].title} </h3>
                <span class="marvel-id">${marvelCharacters[i].id}</span>
                <span class="marvel-bookmark">&hearts;</span>
                <span class="bookmark--hidden">X</span>
                </article>



marvelImg = marvelCharacters[i].thumbnail.path + '.' + marvelCharacters[i].thumbnail.extension;


document.addEventListener('DOMContentLoaded', loadContent);

*/
    

    





/*
let characters = data['data']['results'];
      
        console.log(characters)

         console.log(data['data'])
*/




/*

 <article class="marvel-character-box">
                <img src="${marvelImg}" class="marvel-img">
                <h3 class="marvel-heading"> ${marvelCharacters[i].title} </h3>
                <span class="marvel-id">${marvelCharacters[i].id}</span>
                <span class="marvel-bookmark">&hearts;</span>
                <span class="bookmark--hidden">X</span>
                </article>



marvelImg = marvelCharacters[i].thumbnail.path + '.' + marvelCharacters[i].thumbnail.extension;


document.addEventListener('DOMContentLoaded', loadContent);

*/