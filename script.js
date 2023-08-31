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

console.log(elementsWithBackground);