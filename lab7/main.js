let produtos ={};
let categorias={};


document.addEventListener("DOMContentLoaded", () => {

  fetch("https://deisishop.pythonanywhere.com/products/")
  .then(response => response.json())
  .then(data => {
     produtos = data;carregarProdutos(produtos);atualizarCesto(); 
  })
  .catch(error => {console.error("Erro:", error);});

  
 fetch("https://deisishop.pythonanywhere.com/categories/")
    .then(response => response.json())
    .then(data => {
      categorias = data;
      criarFiltroCategorias(categorias);
      criarFiltroOrdenacao();
      criarFiltroPesquisa();
    })
    .catch(error => console.error("Erro ao carregar categorias:", error));
  

});
  //Garante que o cesto aparece logo ao abrir a página

//---------------------Criar Filtros--------------------------
const divFiltros = document.createElement("div");
divFiltros.id = "filtro-container";
divFiltros.style.display = "flex";
divFiltros.style.justifyContent = "center"; // centraliza horizontalmente
divFiltros.style.alignItems = "center";     // centraliza verticalmente
divFiltros.style.gap = "10px";              // mais espaço entre os elementos
divFiltros.style.padding = "15px";          // aumenta o padding interno
divFiltros.style.border = "3px solid #333";
divFiltros.style.borderRadius = "20px";
divFiltros.style.marginTop = "10px";        // espaço do topo do header
document.querySelector("header").append(divFiltros);


function criarFiltroCategorias(categorias) {
  divFiltros.classList.add("filtro-item");

  const label = document.createElement("label");
  label.setAttribute("for", "filtro-categorias");
  label.textContent = "Categoria: ";

  const select = document.createElement("select");
  select.id = "filtro-categorias";

  const opcaoTodas = document.createElement("option");
  opcaoTodas.value = "todas";
  opcaoTodas.textContent = "Todas as categorias";
  select.appendChild(opcaoTodas);

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });

  select.addEventListener("change", filtrarProdutos);

  divFiltros.append(label, select);
}

function criarFiltroOrdenacao() {
  divFiltros.classList.add("filtro-item");

  const label = document.createElement("label");
  label.setAttribute("for", "filtro-ordenacao");
  label.textContent = "Preço: ";

  const select = document.createElement("select");
  select.id = "filtro-ordenacao";

  [
    { value: "padrao", text: "Padrão" },
    { value: "crescente", text: "Menor para maior" },
    { value: "decrescente", text: "Maior para menor" }
  ].forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.value;
    option.textContent = opt.text;
    select.appendChild(option);
  });

  select.addEventListener("change", filtrarProdutos);

  divFiltros.append(label, select);
}

function criarFiltroPesquisa() {
  divFiltros.classList.add("filtro-item");

  const label = document.createElement("label");
  label.setAttribute("for", "filtro-pesquisa");
  label.textContent = "Pesquisar: ";

  const input = document.createElement("input");
  input.type = "text";
  input.id = "filtro-pesquisa";
  input.placeholder = "Nome do produto...";
  input.addEventListener("input", filtrarProdutos);

  divFiltros.append(label, input);
}




// --------------------filtrar tudo-------------------
// funcao que engloba todos os filtros
function filtrarProdutos() {
  const categoria = document.getElementById("filtro-categorias").value;
  const ordenacao = document.getElementById("filtro-ordenacao").value;
  const pesquisa = document.getElementById("filtro-pesquisa").value.toLowerCase();

  // Filtrar por categoria
  let produtosFiltrados = produtos.filter(p => {
    return (categoria === "todas" || p.category === categoria);
  });

  // Filtrar por pesquisa de nome
  produtosFiltrados = produtosFiltrados.filter(p =>
    p.title.toLowerCase().includes(pesquisa)
  );

  // Ordenar
  if (ordenacao === "crescente") {
    produtosFiltrados.sort((a, b) => a.price - b.price);
  } else if (ordenacao === "decrescente") {
    produtosFiltrados.sort((a, b) => b.price - a.price);
  }

  // Atualizar lista
  carregarProdutos(produtosFiltrados);
}

// --------------------gestão dos produtos-------------------
function carregarProdutos(produtos) {
  const container = document.getElementById("produtos");
  container.innerHTML = ""; // limpar antes de carregar

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

    // ----------------- BOTÃO COMPRAR -----------------
  const comprarBtn = document.createElement("button");
  comprarBtn.textContent = "Comprar 🛒";
  comprarBtn.style.marginLeft = "10px";
  comprarBtn.addEventListener("click", () => {
    // Aqui apenas redireciona — o cesto já está guardado no localStorage
    window.location.href = "checkout.html";
  });

   const botoesDiv = document.createElement("div");
  botoesDiv.style.marginTop = "10px";
  botoesDiv.append(limparBtn, comprarBtn);

  secaoCesto.appendChild(botoesDiv);
}




// ------------------------------------------------------
/*const titulo = document.createElement('h1');
titulo.textContent = 'Viva o JavaScript!';
document.body.append(titulo);*/
