// Contador no título

let counter = 0;
const heading = document.querySelector('h1');

function count() {
   counter++;
   heading.textContent = counter;
} 

// 1.
const passa = document.querySelector("#passa");

function onMouseOver(){
  passa.textContent = "Olá! Passaste o rato!";
}

function onMouseOut(){
  passa.textContent = "Olá! Passaste o rato!";
}

passa.onmouseover = onMouseOver();
passa.onmouseout = onMouseOut();

// 2.

/*const pinta = document.querySelector("#pinta");

pintaRed = function(){
  pinta.style.color = "red";
}
pintaGreen = function(){
  pinta.style.color = "green";
}

pintaBlue = function(){
  pinta.style.color = "blue";
}

document.querySelector("#red").onclick =pintaRed;
document.querySelector("#green").onclick =pintaGreen;
document.querySelector("#blue").onclick =pintaBlue;*/

document.getElementById("vermelho").onclick = () => document.querySelector("#pinta span").style.color = "red";
document.getElementById("verde").onclick = () => document.querySelector("#pinta span").style.color = "green";
document.getElementById("azul").onclick = () => document.querySelector("#pinta span").style.color = "blue";

// 3.
const inputColorir = document.querySelector("#palavra");
const cores = ['red', 'blue', 'green'];
let index=0;

function colorir(){
  inputColorir.style.background = cores[index];
  index = (index+1)%cores.lenght;
}

inputColorir.onkeyup = () => colorir;


// 4. Mudar cor do fundo ao submeter
const inputCor = document.querySelector("#corEscolhida");
const botaoSubmeter = document.querySelector("#submeter");

function mudarCorDeFundo() {
  const cor = inputCor.value.toLowerCase();
  document.body.style.backgroundColor = cor;
}

botaoSubmeter.onclick = () => mudarCorDeFundo();


// 5. Contador com botão
const botaoConta = document.querySelector("#conta");
const contadorSpan = document.querySelector("#contador");
let contadorBotao = 0;

function atualizarContador(valor) {
  contadorBotao = valor;
  contadorSpan.textContent = contadorBotao;
}

botaoConta.onclick = () => atualizarContador(contadorBotao + 1);
botaoConta.ondblclick = () => atualizarContador(0); //duplo click

// 6. Efeito na imagem
const imagem = document.querySelector("#imagem");

function destacarImagem() {
  imagem.style.border = "3px solid gold";
}
function removerDestaque() {
  imagem.style.border = "none";
}

imagem.onmouseover = () => destacarImagem();
imagem.onmouseout = () => removerDestaque();
