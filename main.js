console.log("Carregou o JS");


const form = document.getElementById('cadastro');
const resultado = document.getElementById('tabela-resultado');
const limpar = document.getElementById('limpar-carrinho');
let carrinho = [];

function normalizaNumero(numero) {
    return Number(numero.replace(",", "."));
}

function exibirResultado(carrinho){
    carrinho.forEach(element => {
    const elementoLinha = document.createElement('tr');
    for(prop in element){
        const elementoColuna = document.createElement('td');
        elementoColuna.textContent = element[prop];
        elementoLinha.appendChild(elementoColuna);
    };
    resultado.appendChild(elementoLinha);
    });
}

if(localStorage.carrinho){
    carrinho = JSON.parse(localStorage.carrinho);
    console.log(carrinho);
    exibirResultado(carrinho);
}

form.addEventListener("submit", event =>{
    
    const codigo = event.target.elements["codigo"].value;
    const produto = event.target.elements["produto"].value;
    const quantidade =  Math.trunc(normalizaNumero(event.target.elements["quantidade"].value));
    const preco = normalizaNumero(event.target.elements["preco"].value).toFixed(2);

    const novoItem = {codigo, produto, quantidade, preco, total: quantidade*preco};

    carrinho.push(novoItem);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    exibirResultado(carrinho);
})

limpar.addEventListener("click", event =>{
    localStorage.clear();
    carrinho = [];
    window.location.reload(true);
})
