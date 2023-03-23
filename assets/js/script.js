// Array que armazena os produtos no carrinho
var carrinho = [];

// Função que adiciona um produto ao carrinho
function adicionarItem(id) {
  var produto = {
    id: id,
    nome: "Produto " + id,
    preco: id == 1 ? 50 : id == 2 ? 100 : 75 // exemplo com três produtos
  };
  carrinho.push(produto);
  atualizarCarrinho();

  // armazenar o carrinho no localStorage
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função que atualiza e exibe o carrinho
function atualizarCarrinho() {
  // limpar a lista de produtos no carrinho
  var carrinhoElemento = document.getElementById("carrinho");
  carrinhoElemento.innerHTML = "";

  // adicionar cada produto do carrinho à lista
  for (var i = 0; i < carrinho.length; i++) {
    var produto = carrinho[i];
    var produtoElemento = document.createElement("li");
    produtoElemento.innerHTML = produto.nome + " - R$ " + produto.preco.toFixed(2);

    var botaoRemover = document.createElement("button");
    botaoRemover.innerHTML = "Remover";
    botaoRemover.onclick = (function (produto) {
      return function () {
        removerItem(produto);
      };
    })(produto);
    produtoElemento.appendChild(botaoRemover);

    carrinhoElemento.appendChild(produtoElemento);
  }

  // calcular o valor total do carrinho
  var valorTotal = 0;
  for (var i = 0; i < carrinho.length; i++) {
    valorTotal += carrinho[i].preco;
  }

  // exibir o valor total do carrinho
  var valorTotalElemento = document.getElementById("valor-total");
  valorTotalElemento.innerHTML = "Valor Total: R$ " + valorTotal.toFixed(2);

  // armazenar o valor total do carrinho no localStorage
  localStorage.setItem("valorTotal", valorTotal);
}

// Função que remove um produto do carrinho
function removerItem(produto) {
  var index = carrinho.indexOf(produto);
  if (index !== -1) {
    carrinho.splice(index, 1);
    atualizarCarrinho();

    // armazenar o carrinho no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }
}

// Recuperar o carrinho do localStorage quando a página for carregada
var carrinhoSalvo = localStorage.getItem("carrinho");
if (carrinhoSalvo) {
  carrinho = JSON.parse(carrinhoSalvo);
  atualizarCarrinho();
}

// Recuperar o valor total do localStorage quando a página for carregada
var valorTotalSalvo = localStorage.getItem("valorTotal");
if (valorTotalSalvo) {
  var valorTotalElemento = document.getElementById("valor-total");
  valorTotalElemento.innerHTML = "Valor Total: R$ " + parseFloat(valorTotalSalvo).toFixed(2);
}
