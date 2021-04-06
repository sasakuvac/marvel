const input = document.querySelector('.search-input');
const resultsBox = document.querySelector('.results-section');
let results = '';


if (localStorage.length < 1) {
    fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc&limit=100')
    .then(response => response.json())
    .then(data => {
        let marvelCharacters = data.data;
        localStorage.setItem('results', JSON.stringify(marvelCharacters.results));
    })
};

let charactersList = JSON.parse(localStorage.getItem('results'));

function displayCharacters() {

    let filteredResults = charactersList.filter(character => 
        character.name.includes(results)
     );

     console.log(filteredResults)

     filteredResults.forEach(character => {
        let marvelImg = document.createElement('img'); 
        marvelImg.className += 'char-images';
        marvelImg.src = character.thumbnail.path + '.' + character.thumbnail.extension;
            
        let marvelHeading = document.createElement('h3');
        marvelHeading.className += 'marvel-heading'; 
        marvelHeading.innerHTML = character.name;

        let marvelHeadingBox = document.createElement('div');
        marvelHeadingBox.className += 'marvel-heading-box';

        let characterBox = document.createElement('article');
        characterBox.className += 'character-box';

        resultsBox.appendChild(characterBox);
        characterBox.appendChild(marvelImg);
        characterBox.appendChild(marvelHeadingBox);
        marvelHeadingBox.appendChild(marvelHeading);
     });
 
    if(results.length === 0) {
        resultsBox.innerHTML = '';
    }
};


input.addEventListener('input', e => {
    e.preventDefault();
   results = e.target.value;
    displayCharacters();
});

