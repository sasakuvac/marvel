/* 

http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc

*/


let input = document.querySelector('input');
let resultsBox = document.querySelector('.results-section');
let button = document.querySelector('button');


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

            // selecting character images & adding class name
            let marvelImg = document.createElement('img'); 
            marvelImg.className += 'char-images';
            marvelImg.src = charactersList[i].thumbnail.path + '.' + charactersList[i].thumbnail.extension;
            
            // selecting character names & adding class name
            let marvelHeading = document.createElement('h3');
            marvelHeading.className += 'marvel-heading'; 
            marvelHeading.innerHTML = charactersList[i].name;

            // creating marvelHeadingBox
            let marvelHeadingBox = document.createElement('div');
            marvelHeadingBox.className += 'marvel-heading-box';

            // creating article element
            let characterBox = document.createElement('article');
            characterBox.className += 'character-box';

            // adding elements
            resultsBox.appendChild(characterBox);
            characterBox.appendChild(marvelImg);
            characterBox.appendChild(marvelHeadingBox);
            marvelHeadingBox.appendChild(marvelHeading);

            // temporary code
            if (charactersList[i] === charactersList[9]) {
                break;
            }    
        }

    }
    })






