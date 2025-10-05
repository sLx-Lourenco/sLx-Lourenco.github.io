// Contador no título
let counter = 0;
const heading = document.querySelector('h1');

function count() {
  counter++;
  heading.textContent = counter;
} 

// 1. Passa por aqui
const passa = document.getElementById("passa");
passa.addEventListener("mouseover", () => {
  passa.style.color = "blue";
  passa.textContent = "Olá! Passaste o rato!";
});
passa.addEventListener("mouseout", () => {
  passa.style.color = "black";
  passa.textContent = "1. Passa por aqui!";
});

// 2. Pinta-me!
document.getElementById("vermelho").onclick = () =>
  document.querySelector("#pinta span").style.color = "red";
document.getElementById("verde").onclick = () =>
  document.querySelector("#pinta span").style.color = "green";
document.getElementById("azul").onclick = () =>
  document.querySelector("#pinta span").style.color = "blue";

// 3. Mudar cor ao digitar
let contadorInput = 0;
const texto = document.getElementById("texto");
const cores = ["lightcoral", "lightgreen", "lightblue"];

texto.addEventListener("input", () => {
  texto.style.backgroundColor = cores[contadorInput % cores.length];
  contadorInput++;
});

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
