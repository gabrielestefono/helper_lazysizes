/* Pegar todos os elementos que contém background-image no css */

const allElementsQuery = document.querySelectorAll('*');
const allElements = Array.from(allElementsQuery);
const elementsWithBackground = [];

allElements.forEach((element) => {
	const elementStyle = getComputedStyle(element);
  	const hasBackground = elementStyle.getPropertyValue('background-image');

  	if (hasBackground !== 'none') {
		elementsWithBackground.push(element);
  	}
});

/* Transformar as classes dos elementos selecionados em string e passar para um novo array */

const elementsWithBackgroundString = []

elementsWithBackground.forEach((element) => {
	const elementClass = element.className;
	elementsWithBackgroundString.push(elementClass);
});

console.log(elementsWithBackgroundString);

/* Pegar o link da imagem de background */

const elementsWithBackgroundImage = [];

elementsWithBackground.forEach((element) => {
	const elementStyle = getComputedStyle(element);
	const backgroundImage = elementStyle.getPropertyValue('background-image');
	elementsWithBackgroundImage.push(backgroundImage);
});

/* Remover o caminho absoluto mantendo apenas o caminho relativo */

const elementsWithBackgroundImageRelative = [];
const urlAtual = window.location.href;


elementsWithBackgroundImage.forEach((element) => {
	const elementUrl = element.replace('url("', '').replace('")', '');
	const elementUrlRelative = elementUrl.replace(urlAtual, '');
	elementsWithBackgroundImageRelative.push(elementUrlRelative);
});

console.log(elementsWithBackgroundImageRelative);

