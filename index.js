const input = document.querySelector('.search-input');
const resultsBox = document.querySelector('.results-section');
let charactersList;
const previousBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');
const totalPages = document.querySelector('.total-pages');
const currentPage = document.querySelector('.current-page');
const PER_PAGE = 12;

let currentPageNumber = 1;
previousBtn.disabled = currentPageNumber === 1;
currentPage.textContent = currentPageNumber;

function loadPaging(totalItems, callback) {
    const totalPageCount = Math.ceil(totalItems / PER_PAGE);
    totalPages.textContent = totalPageCount;

    function updatePaging() {
        currentPage.textContent = currentPageNumber;
        const pagingOptions = {
            currentPageNumber: currentPageNumber,
            perPage: PER_PAGE
        };
        callback(pagingOptions);
        nextBtn.disabled = currentPageNumber === totalPageCount;
        previousBtn.disabled = currentPageNumber === 1;
    }
    updatePaging();
    nextBtn.addEventListener('click', () => {
        currentPageNumber++;
        updatePaging();
    });
    
    previousBtn.addEventListener('click', () => {
        currentPageNumber--;
        updatePaging();
    });
}

function pageArraySplit(array, pagingOptions) {
    const currentPageNumber = pagingOptions.currentPageNumber;
    const perPage = pagingOptions.perPage;
    const startingIndex = (currentPageNumber - 1) * perPage;
    const endingIndex = startingIndex + perPage;

    return array.slice(startingIndex, endingIndex);
}

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
            loadPaging(charactersList.length, pagingOptions => {
                const newCharacterList = pageArraySplit(charactersList, pagingOptions);
                displayCharacters(newCharacterList);
            })
        })
} else {
    charactersList = JSON.parse(localStorage.getItem('marvel'));
    loadPaging(charactersList.length, pagingOptions => {
        const newCharacterList = pageArraySplit(charactersList, pagingOptions);
        displayCharacters(newCharacterList);
    });
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
    nextBtn.disabled = characters == true;
    loadPaging(characters.length, pagingOptions => {
        const newArray = pageArraySplit(characters, pagingOptions);
        displayCharacters(newArray);
    })
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
