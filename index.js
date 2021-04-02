let input = document.querySelector('input');
let resultsBox = document.querySelector('.results-section');
let button = document.querySelector('button');



async function fetchData(searchText) {
    const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc&limit=100');
    const data = await response.json();
    const marvelCharacters = data['data'];
    const practice = marvelCharacters['results'];

    
    let characterName = practice.filter(element => {
        const regex = new RegExp(`^${searchText}`, 'gi');
       return element.name.match(regex);
    });

    if(searchText.length === 0) {
        characterName = [];
        resultsBox.innerHTML = '';
    }

    displayCharacters(characterName);

};

function displayCharacters(characterName) {
    if(characterName.length > 0) {
        const display = characterName.map(match => {
            let marvelImg = document.createElement('img'); 
            marvelImg.className += 'char-images';
            marvelImg.src = match.thumbnail.path + '.' + match.thumbnail.extension;
            
            let marvelHeading = document.createElement('h3');
            marvelHeading.className += 'marvel-heading'; 
            marvelHeading.innerHTML = match.name;

            let marvelHeadingBox = document.createElement('div');
            marvelHeadingBox.className += 'marvel-heading-box';

            let characterBox = document.createElement('article');
            characterBox.className += 'character-box';

            resultsBox.appendChild(characterBox);
            characterBox.appendChild(marvelImg);
            characterBox.appendChild(marvelHeadingBox);
            marvelHeadingBox.appendChild(marvelHeading);
        });
    }
}


input.addEventListener('input', () => fetchData(input.value));

