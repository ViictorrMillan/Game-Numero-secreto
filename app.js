let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.2});
}
function mensagemIncial () {
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);

}

function verificarChute() {  
        let chute = document.querySelector('input').value;
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        document.getElementById('reiniciar').removeAttribute('disabled');

        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Acertou!');
            exibirTextoNaTela('p', mensagemTentativas); 
            document.getElementById('chute').disabled = true; 
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', 'O número secreto é menor');
            } else { 
                exibirTextoNaTela('p', 'O número secreto é maior');
            }
            tentativas++;
            limparCampo();
        }
    }

// recursão     
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosDaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { 
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);  // adiciona o número ao array
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value ='';
}

function novojogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', 'disabled');
    document.getElementById('chute').disabled = false; 
    mensagemIncial();
}

mensagemIncial();