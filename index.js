const input = document.querySelector('.search-input');
const resultsBox = document.querySelector('.results-section');
let charactersList;

if (!localStorage.getItem('results')) {
    fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc&limit=100')
    .then(response => response.json())
    .then(data => {
        charactersList = data.data;
        localStorage.setItem('results', JSON.stringify(charactersList.results));
    })
    displayCharacters(charactersList);
} else {
    charactersList = JSON.parse(localStorage.getItem('results'));
    displayCharacters(charactersList);
}


function displayCharacters(marvelResults) {
    console.log(marvelResults)
     marvelResults.forEach(character => {
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
};

input.addEventListener('keyup', event => {
    let characters = charactersList.filter(character => 
       character.name.toLowerCase().includes(event.target.value)
    );

    resultsBox.innerHTML = '';
    displayCharacters(characters);
});


