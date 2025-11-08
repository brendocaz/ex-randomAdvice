// // Selecionando os elementos do HTML
const botaoGerar = document.getElementById('btn-gerar');
const textoConselho = document.getElementById('texto-atividade');
const numeroConselho = document.getElementById('numero-conselho');
const divInfoIdConselho = document.getElementById('info-atividade')
const divConselho = document.getElementById('card-atividade');
const carregando = document.getElementById('loading');
const contadorElemento = document.getElementById('contador');
const botaoCopiar = document.getElementById('btn-copiar');

// váriavel para contar os conselhos gerados
let contador = 0;

// váriavel para guardar o ultimo conselho gerado
let ultimoConselhoGerado;

// Lista para guardar conselhos gerados
const arrayConselho = [];


// Função para buscar o conselho na API
async function buscarConselho() {
    divConselho.style.display = 'none';
    carregando.style.display = 'block';

  try {
    const resposta = await fetch('https://api.adviceslip.com/advice');
    const dados = await resposta.json();

    textoConselho.textContent = dados.slip.advice;
    numeroConselho.textContent = dados.slip.id;
    divInfoIdConselho.style.display= 'flex';

    if(arrayConselho.includes(dados.slip.id)) {
         textoConselho.textContent = 'Esse conselho já foi gerado. Clique novamente para gerar um novo'
    }

    arrayConselho.push(dados.slip.id);
    console.log(arrayConselho)


    divConselho.classList.add('animate__animated', 'animate__zoomIn')

    contador++
    contadorElemento.textContent = contador;

    ultimoConselhoGerado = dados.slip.advice;
    
    divConselho.style.display = 'block';
    carregando.style.display = 'none';
    console.log(dados);
  } catch(erro) {
    console.log('Ocorreu um erro ao buscar o conselho: ', erro);
  }
}

// Escutador de evento do click botao gerar
botaoGerar.addEventListener('click', buscarConselho)

//Função para copiar o conselho e colocar no ctrl +
 async function copiarConselho() {
  try {
    await navigator.clipboard.writeText(ultimoConselhoGerado);

    botaoCopiar.textContent = '✓ Copiado!';
    botaoCopiar.style.background = '#4caf50';

    setTimeout(function() {
      botaoCopiar.textContent = '📋 Copiar';
      botaoCopiar.style.background = '';
    }, 2000);
  } catch(erro) {
    console.log('Ocorreu um erro ao copiar para o CTRL + V: ', erro);
  }
}

// Escutador de evento do click no botao copiar
botaoCopiar.addEventListener('click', copiarConselho);