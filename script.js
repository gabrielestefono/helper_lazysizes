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

/* Verificar o tipo de elemento da classe */

const elementsWithBackgroundImageType = [];

elementsWithBackgroundString.forEach((element) => {
	/* Se a classe for composta por mais de uma classe, pegar apenas a primeira */
	const elementClass = element.split(' ')[0];
	const elementQuery = document.querySelector(`.${elementClass}`);
	const elementType = elementQuery.tagName;
	elementsWithBackgroundImageType.push(elementType.toLowerCase());
});

/* Transformar os elementos em string */

function elementToString(el) {
  const tmpDiv = document.createElement('div');
  tmpDiv.appendChild(el.cloneNode(true));
  return tmpDiv.innerHTML;
}

const elementsWithBackgroundImageHTML = [];

elementsWithBackground.forEach((element) => {
	const elementHTML = elementToString(element);
	elementsWithBackgroundImageHTML.push(elementHTML);
});

/* Juntar tudo em uma só string */

let juntarTudo = (tag, imagem, elementoEmString) => {
	let tipo = `></${tag}>`;
	tipo = `data-bg="${imagem}"` + tipo;
	let elemento = elementoEmString.replace(`></${tag}>`, tipo);
	return elemento;
}

/* Criar um array com os elementos */

let array = [];

elementsWithBackgroundString.forEach((element, index) => {
	let elementoParaCopiar = juntarTudo(elementsWithBackgroundImageType[index], elementsWithBackgroundImageRelative[index], elementsWithBackgroundImageHTML[index]);
	array.push(elementoParaCopiar);
});

let elemento = {}

array.forEach((element, index) => {
    elemento[index.toString()] = element;
});

/* Transformar o objeto em json */

/* Criar o JSON formatado manualmente */

let jsonFormatted = "{\n";
Object.keys(elemento).forEach((key, index, array) => {
    jsonFormatted += `    ${key}: ${elemento[key]}`;
    if (index < array.length - 1) {
        jsonFormatted += ',';
    }
    jsonFormatted += '\n';
});
jsonFormatted += "}";

/* Exportar o JSON formatado */

let exportarJSON = () => {
	const element = document.createElement('button');
	element.style.width = '500px';
	element.style.height = '500px';
	element.style.position = 'absolute';
	element.style.top = '0';
	element.style.left = '0';
	element.style.zIndex = '99'
	element.style.backgroundColor = 'red';
	element.style.color = 'white';
	element.style.fontSize = '50px';
	element.style.fontWeight = 'bold';
	element.style.border = 'none';
	element.style.outline = 'none';
	element.style.cursor = 'pointer';
	element.style.display = 'flex';
	element.style.justifyContent = 'center';
	element.style.alignItems = 'center';
	element.style.fontFamily = 'sans-serif';
	element.innerHTML = 'Exportar JSON';
	document.body.appendChild(element);
	element.addEventListener('click', () => {
		const element = document.createElement('a');
		const file = new Blob([jsonFormatted], {type: 'application/json'});
		element.href = URL.createObjectURL(file);
		element.download = 'json.json';
		element.click();
	});
}

exportarJSON();
