document.addEventListener("DOMContentLoaded", () => {
  carregarProdutos(produtos);
  atualizarCesto(); //Garante que o cesto aparece logo ao abrir a página
});

function carregarProdutos(produtos) {
  const container = document.getElementById("produtos");

  produtos.forEach(produto => {
    const artigo = criarProduto(produto);
    container.appendChild(artigo);
  });
}

function criarProduto(produto) {
  const artigo = document.createElement("article");

  const img = document.createElement("img");
  img.src = produto.image;
  img.alt = produto.title;

  const titulo = document.createElement("h3");
  titulo.textContent = produto.title;

  const preco = document.createElement("p");
  preco.innerHTML = `<strong>${produto.price.toFixed(2)} €</strong>`;

  const descricao = document.createElement("p");
  descricao.textContent = produto.description;


  const botao = document.createElement("button");
  botao.textContent = "+ Adicionar ao cesto";
  botao.addEventListener("click", () => adicionarAoCesto(produto));

  artigo.append(img, titulo, preco, descricao, botao);

  return artigo;
}

// --------------------gestão do cesto-------------------

// Lê o carrinho do localStorage (ou cria um vazio)
function obterCesto() {
  return JSON.parse(localStorage.getItem("cesto")) || [];
}

// Guarda o carrinho atualizado no localStorage
function guardarCesto(cesto) {
  localStorage.setItem("cesto", JSON.stringify(cesto));
}

// Adiciona um produto ao carrinho
function adicionarAoCesto(produto) {
  const cesto = obterCesto();
  const existente = cesto.find(p => p.id === produto.id);

  if (!existente) {
    cesto.push(produto);
    guardarCesto(cesto);
    atualizarCesto();
  } else {
    alert("Este produto já está no cesto!");
  }
}

// Atualiza o conteudo do cesto
function atualizarCesto() {
  const cesto = obterCesto();
  const secaoCesto = document.getElementById("cesto");

  secaoCesto.innerHTML = "<h2>Cesto</h2>";

  if (cesto.length === 0) {
    secaoCesto.innerHTML += "<p>O teu cesto está vazio.</p>";
    return;
  }

  const lista = document.createElement("ul");
  let total = 0;

  cesto.forEach(produto => {
    const item = document.createElement("li");
    item.textContent = `${produto.title} - ${produto.price.toFixed(2)} €`;
    lista.appendChild(item);
    total += produto.price;
  });

  const totalEl = document.createElement("p");
  totalEl.innerHTML = `<strong>Total: ${total.toFixed(2)} €</strong>`;

  secaoCesto.append(lista, totalEl);

  // Adiciona botão para limpar o cesto
  const limparBtn = document.createElement("button");
  limparBtn.textContent = "Limpar cesto";
  limparBtn.addEventListener("click", () => {
    localStorage.removeItem("cesto");
    atualizarCesto();
  });

  secaoCesto.appendChild(limparBtn);
}




// ------------------------------------------------------
const titulo = document.createElement('h1');
titulo.textContent = 'Viva o JavaScript!';
document.body.append(titulo);
