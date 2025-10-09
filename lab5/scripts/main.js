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
document.getElementById("submeter").onclick = () => {
  const cor = document.getElementById("corEscolhida").value.toLowerCase();
  document.body.style.backgroundColor = cor;
};

// 5. Contador com botão
let contadorBotao = 0;
const botaoConta = document.getElementById("conta");
const contadorSpan = document.getElementById("contador");

botaoConta.addEventListener("click", () => {
  contadorBotao++;
  contadorSpan.textContent = contadorBotao;
});
botaoConta.addEventListener("dblclick", () => {
  contadorBotao = 0;
  contadorSpan.textContent = contadorBotao;
});

// 6. Efeito na imagem
const imagem = document.getElementById("imagem");
imagem.addEventListener("mouseover", () => {
  imagem.style.border = "3px solid gold";
});
imagem.addEventListener("mouseout", () => {
  imagem.style.border = "none";
});
