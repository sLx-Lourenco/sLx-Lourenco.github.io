// main.js

let counter = 0;
const heading = document.querySelector('h1');

function count() {
   counter++;
   heading.textContent = counter;
} 

// 1.
const passa = document.getElementById("passa");
passa.addEventListener("mouseover", () => {
  passa.style.color = "blue";
  passa.textContent = "Olá! Passaste o rato!";
});
passa.addEventListener("mouseout", () => {
  passa.style.color = "black";
  passa.textContent = "1. Passa por aqui!";
});

// 2.
document.getElementById("vermelho").onclick = () => document.querySelector("#pinta span").style.color = "red";
document.getElementById("verde").onclick = () => document.querySelector("#pinta span").style.color = "green";
document.getElementById("azul").onclick = () => document.querySelector("#pinta span").style.color = "blue";

// 3.
const texto = document.getElementById("texto");
texto.addEventListener("mousemove", () => {
  texto.style.backgroundColor = "lightcoral";
});
texto.addEventListener("mouseout", () => {
  texto.style.backgroundColor = "white";
});

// 4.
document.getElementById("submeter").onclick = () => {
  const cor = document.getElementById("corEscolhida").value.toLowerCase();
  document.body.style.backgroundColor = cor;
};

// 5.
let contador = 0;
const botaoConta = document.getElementById("conta");
const contadorSpan = document.getElementById("contador");

botaoConta.addEventListener("click", () => {
  contador++;
  contadorSpan.textContent = contador;
});
botaoConta.addEventListener("dblclick", () => {
  contador = 0;
  contadorSpan.textContent = contador;
});

// 6. mouseover na imagem
const imagem = document.getElementById("imagem");
imagem.addEventListener("mouseover", () => {
  imagem.style.border = "3px solid gold";
});
imagem.addEventListener("mouseout", () => {
  imagem.style.border = "none";
});
