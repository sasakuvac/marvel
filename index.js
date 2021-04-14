const input = document.querySelector('.search-input');
const resultsBox = document.querySelector('.results-section');
let charactersList;

if (!localStorage.getItem('marvel')) {
    fetch('http://gateway.marvel.com/v1/public/characters?ts=1&apikey=2bdacb7a1f4583f33e4203c84e08d0a1&hash=9deece9ffa95454ab6d363d7531ff8cc&limit=100')
        .then(response => response.json())
        .then(data => {
            charactersList = data.data.results.map(entity => ({
                id: entity.id,
                name: entity.name,
                image: entity.thumbnail.path + '.' + entity.thumbnail.extension,
                bookmarked: false
            }))

            localStorage.setItem('marvel', JSON.stringify(charactersList));
            displayCharacters(charactersList);
        })
} else {
    charactersList = JSON.parse(localStorage.getItem('marvel'));
    displayCharacters(charactersList);
}


function displayCharacters(marvelResults) {
    marvelResults.forEach(character => {
        let marvelImg = document.createElement('img');
        marvelImg.className += 'char-images';
        marvelImg.src = character.image;
        let bookmarkValue = character.bookmarked ? "bookmark" : "bookmark_border";

        let bookmarkBorder = document.createElement('i');
        bookmarkBorder.className += 'material-icons';
        bookmarkBorder.setAttribute("id", character.id);
        bookmarkBorder.textContent = bookmarkValue;

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
        marvelHeadingBox.appendChild(bookmarkBorder);
    });
};


input.addEventListener('keyup', event => {
    let characters = charactersList.filter(character =>
        character.name.toLowerCase().includes(event.target.value)
    );
    resultsBox.innerHTML = '';
    displayCharacters(characters);
    bookmarking();
});

function bookmarking() {
    document.querySelectorAll('.material-icons').forEach(button => {
    let bookmarked;
    button.addEventListener('click', event => {
        if (event.target.innerText == 'bookmark_border') {
            bookmarked = true;
            event.target.innerText = 'bookmark';
        } else {
            bookmarked = false;
            event.target.innerText = 'bookmark_border';
        }
        for (let character of charactersList) {
            if (character.id == Number(button.id)) {
                character.bookmarked = bookmarked;
            }
        }
        localStorage.setItem('marvel', JSON.stringify(charactersList));
    })
});
}

bookmarking();

