let input,
	allResults,
	bookmarkedResults,
	public_key,
	private_key,
	hash,
	url,
	marvelData,
	storageData,
	buttons,
	numOfCharacters;

input = document.querySelector("input");
allResults = document.querySelector(".all-results");
bookmarkedResults = document.querySelector(".bookmarked-results");
public_key = "62e22c18dcf97c92ee28fb6df6b3d253";
private_key = "c1db7d4100ea8cdfd287dc3104dd94601f2c957b";
numOfCharacters = 100;

url = createUrl(public_key, private_key, numOfCharacters);

myStorage = localStorage.getItem("marvel");

if (!myStorage) {
	setDataToLocalStorage();
} else {
	storageData = JSON.parse(myStorage);
	displayCharacters(storageData);
	buttons = document.querySelectorAll(".marvel-bookmark");
}

async function setDataToLocalStorage() {
	await fetch(url)
		.then(async (res) => await res.json())
		.then((result) => {
			marvelData = result.data.results.map((character) => ({
				id: character.id,
				name: character.name,
				bookmarked: false,
				image: character.thumbnail.path + "." + character.thumbnail.extension,
			}));

			localStorage.setItem("marvel", JSON.stringify(marvelData));
			displayCharacters(marvelData);
		});
}

function displayCharacters(characters) {
	if (characters.length > 0) {
		characters.map((element) => {
			let childElement;
			if (element.bookmarked) {
				childElement = createElement(element, "star");
				bookmarkedResults.innerHTML += childElement;
			} else {
				childElement = createElement(element, "star_border");
				allResults.innerHTML += childElement;
			}
		});
	} else {
		allResults.innerHTML = "<h1 class='no-results'>Nothing to display</h1>";
	}
}

input.addEventListener("keyup", (e) => {
	let filtered = storageData.filter((character) => character.name.toLowerCase().includes(e.target.value.toLowerCase()));
	allResults.innerHTML = "";
	bookmarkedResults.innerHTML = "";
	displayCharacters(filtered);
});

for (let button of buttons) {
	button.addEventListener("click", (e) => {
		console.log(e.target);
		let bookmarked;

		if (e.target.innerText === "star") {
			bookmarked = false;
			e.target.innerText = "star_border";
		} else {
			bookmarked = true;
			e.target.innerText = "star";
		}

		for (let element of storageData) {
			if (element.id === Number(button.id)) {
				element.bookmarked = bookmarked;
			}
		}

		localStorage.setItem("marvel", JSON.stringify(storageData));
	});
}

function createUrl(public, private, limit) {
	let timestamp = Date.now();
	let hash = md5(timestamp + private + public);
	return `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${public}&hash=${hash}&limit=${limit}`;
}

function createElement(element, star) {
	return `<article class="character-box"> 
	<img class="char-images" src=${element.image} </img>
	<i id=${element.id} class="medium material-icons marvel-bookmark">${star}</i>
	<div class="marvel-heading-box">
	<h3 class ="marvel-heading">${element.name}</h3>
	</div>
	</article>`;
}
