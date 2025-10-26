document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaCheckout");
  const totalEl = document.getElementById("totalCheckout");
  const finalizarBtn = document.getElementById("finalizar");

  // Criar zona de opções
  const opcoesDiv = document.createElement("div");
  opcoesDiv.id = "opcoes-checkout";
  opcoesDiv.style.marginTop = "20px";
  opcoesDiv.style.display = "flex";
  opcoesDiv.style.flexDirection = "column";
  opcoesDiv.style.alignItems = "center";
  opcoesDiv.style.gap = "10px";

  // Checkbox de estudante
  const estudanteDiv = document.createElement("div");
  estudanteDiv.style.display = "flex";
  estudanteDiv.style.alignItems = "center";
  estudanteDiv.style.gap = "5px";

  const estudanteCheckbox = document.createElement("input");
  estudanteCheckbox.type = "checkbox";
  estudanteCheckbox.id = "estudante";

  const estudanteLabel = document.createElement("label");
  estudanteLabel.setAttribute("for", "estudante");
  estudanteLabel.textContent = "Sou estudante";

  estudanteDiv.append(estudanteLabel, estudanteCheckbox);
  //-----------------------------------------------------------------------------------

  // Campo de texto do cupão
  const cupaoDiv = document.createElement("div");
  cupaoDiv.style.display = "flex";
  cupaoDiv.style.flexDirection = "column";
  cupaoDiv.style.width = "100%";
  cupaoDiv.style.alignItems = "center";
  cupaoDiv.style.gap = "10px";

  const cupaoLabel = document.createElement("label");
  cupaoLabel.setAttribute("for", "cupao");
  cupaoLabel.textContent = "Cupão de desconto:";

  const cupaoInput = document.createElement("input");
  cupaoInput.type = "text";
  cupaoInput.id = "cupao";

  cupaoInput.placeholder = "Insere o teu cupão...";

  cupaoDiv.append(cupaoLabel, cupaoInput);


  // Juntar tudo
  opcoesDiv.append(estudanteDiv, cupaoDiv);
  totalEl.insertAdjacentElement("afterend", opcoesDiv);
  //-----------------------------------------------------------------------------------
  // --- Container dos botões ---
  const botoesContainer = document.createElement("div");
  botoesContainer.style.display = "flex";
  botoesContainer.style.justifyContent = "center";
  botoesContainer.style.gap = "10px";
  botoesContainer.style.marginTop = "20px";

  // Botão Finalizar Compra
  botoesContainer.appendChild(finalizarBtn);


  // Botão Continuar a comprar
  const continuarBtn = document.createElement("button");
  continuarBtn.textContent = "Continuar a comprar";
  continuarBtn.style.backgroundColor = "#333";
  continuarBtn.style.color = "white";
  continuarBtn.style.borderRadius = "5px";
  continuarBtn.style.padding = "10px 20px";
  continuarBtn.style.cursor = "pointer";
  continuarBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  continuarBtn.addEventListener("mouseover", () => continuarBtn.style.backgroundColor = "#555");
  continuarBtn.addEventListener("mouseout", () => continuarBtn.style.backgroundColor = "#333");

  botoesContainer.appendChild(continuarBtn);
  opcoesDiv.insertAdjacentElement("afterend", botoesContainer);


  //------------------------------------------------------------------------------------------------------
  // Função para carregar os produtos do cesto
  function carregarCheckout() {
    const cesto = JSON.parse(localStorage.getItem("cesto")) || [];
    lista.innerHTML = ""; // limpa o conteúdo
    let total = 0;

    if (cesto.length === 0) {
      lista.innerHTML = "<p>O teu cesto está vazio</p>";
      finalizarBtn.disabled = true;
      totalEl.textContent = "";
      return;
    }

    finalizarBtn.disabled = false;

    cesto.forEach((produto, index) => {
      const item = document.createElement("div");
      item.classList.add("produto-checkout");

      const img = document.createElement("img");
      img.src = produto.image;
      img.alt = produto.title;

      const infoDiv = document.createElement("div");
      infoDiv.classList.add("info-produto");

      const titulo = document.createElement("h3");
      titulo.textContent = produto.title;

      const preco = document.createElement("p");
      preco.innerHTML = `<strong>${produto.price.toFixed(2)} €</strong>`;

      const removerBtn = document.createElement("button");
      removerBtn.textContent = "Remover";
      removerBtn.classList.add("remover-btn");
      removerBtn.addEventListener("click", () => {
        removerProduto(index);
      });

      const textoDiv = document.createElement("div");
      textoDiv.classList.add("texto-produto");
      textoDiv.append(titulo, preco);

      infoDiv.append(textoDiv, removerBtn);
      item.append(img, infoDiv);
      lista.appendChild(item);

      total += produto.price;
    });

    totalEl.textContent = `Total: ${total.toFixed(2)} €`;
  }

  // Função para remover produto por índice
  function removerProduto(index) {
    let cesto = JSON.parse(localStorage.getItem("cesto")) || [];
    cesto.splice(index, 1);
    localStorage.setItem("cesto", JSON.stringify(cesto));
    carregarCheckout();
  }


  //-------------------------------------------------------------------------------
  // Finalizar compra
finalizarBtn.addEventListener("click", async () => {
  const cesto = JSON.parse(localStorage.getItem("cesto")) || [];
  if (cesto.length === 0) {
    alert("O cesto está vazio!");
    return;
  }

  // Recolhe dados
  const estudante = document.getElementById("estudante").checked;
  const cupao = document.getElementById("cupao").value.trim();
  const nome = prompt("Qual é o teu nome?") || "Cliente Anónimo";

  // Cria corpo do pedido
  const body = {
    products: cesto.map(p => p.id),
    student: estudante,
    coupon: cupao || null,
    name: nome
  };

  try {
    const response = await fetch("https://deisishop.pythonanywhere.com/buy/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Mostra resposta no alert
    alert("Compra finalizada com sucesso!\n\nResposta da API:\n" + JSON.stringify(data, null, 2));

    // Limpa cesto
    localStorage.removeItem("cesto");

    // Redireciona para a página inicial
    window.location.href = "index.html";

  } catch (error) {
    alert("Ocorreu um erro ao enviar a compra");
    console.error(error);
  }
});
  carregarCheckout();
});
