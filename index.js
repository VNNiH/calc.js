//funcionalidade que eu possi clicar em qualquer local do input
//usar as setas para andar pelo input

//funcionalidade de digitar na calculadora
const main = document.querySelector('main')
//input PRINCIPAL (ACIMA)
const input = document.getElementById('input')
//criando um array com as teclas que eu vou permitir que sejam inseridas no input
//allowedKeys = teclas permitidas
const allowedKeys = ["(", ")", "/","Arrow",
 "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]
//adicionando um evento no input de keydown( tecla para baixo = tecla pressionada)
input.addEventListener('keydown', function(ev){
  //prevenindo o evento padrao para eu mesmo manipular os valores que eu quero
  //mesmo eu clicando no teclado o valor da tecla que eu pressiono nao vai para o input
  //entretando ele ainda envia valor, mas é cmo se o valor nao existisse
  //no caso o comportamento da tecla é prevenido, mas dos eventos ainda sao capturados
  ev.preventDefault()
  //criando uma condicao paras as teclas permitidas
  //ev representa o evento keydown
  //ev.key é uma prop do obj de evento q retorna um valor da tecla pressionada
  //ele forne o valor textual associado a tecla que foi pressionada no evento
  //e qnd isso acontece o valor vai pro includes que ve se ele ta no array ou nao
  //includes é usado para ver se a key esta dentro do allowedKeys se permitir ele retorna
  //um valor booleano, que é usado para o IF p decidir se a tecla vai ser add ou nao
  //dentro da funcao nos capturamos as teclas pressionadas pelo ev key
  //e atribuimos ela ao input value
  //
  if(allowedKeys.includes(ev.key)){
    input.value += ev.key
    return
  }
  //incluindo o backspace
  if(ev.key === 'Backspace'){
    // atribuindo valor do input para ele mesmo so que cm o metodo slice
    //o slice corta o array com base no index que eu passar, ele cria uma copia da string
    //inicial 0 , penultimo -1
    //os indices negativo são usados para contar de tras para frente
    //literalmente a gnt ta criando a função backspace que corta da direita(0) pra esquerda(-1)
    //
    input.value = input.value.slice(0, -1)
  }
  //incluindo Enter
  if(ev.key === 'Enter'){
    calculate()
  }
  //incluindo as keys para eu andar pelo input com arrow
  if (ev.key === 'ArrowLeft') {
    ev.stopPropagation();
    if (ev.currentTarget.selectionStart > 0) {
      ev.currentTarget.setSelectionRange(
        ev.currentTarget.selectionStart - 1,
        ev.currentTarget.selectionStart - 1
      );
    }
    ev.currentTarget.focus();
  }
  
  if (ev.key === 'ArrowRight') {
    ev.stopPropagation();
    if (ev.currentTarget.selectionStart < ev.currentTarget.value.length) {
      ev.currentTarget.setSelectionRange(
        ev.currentTarget.selectionStart + 1,
        ev.currentTarget.selectionStart + 1
      );
    }
    ev.currentTarget.focus();
  }
  
})
//FUNCIONALIDADE PARA FUNCIONAR OS BOTOES QND EU APERTAR CM O CLICK
document.querySelectorAll('.charKey').forEach(function(charKeyBtn){
  charKeyBtn.addEventListener('click', function(){
    //criando uma variavel que armazena o valor da key pelo dataset
    const value = charKeyBtn.dataset.value
    // concatena o valor obtido do click btn para o valor do input
    input.value += value
  })
})
//funcionalidade de clear - limpar todo o input
document.getElementById('clear').addEventListener('click', function(){
  input.value = ''
  //ele pega e poe o cursor no input dps de limpar ele
  input.focus()
})

//capturando o botao de equal
document.getElementById('equal').addEventListener('click', calculate)
//INPUT DE RESULTADO (EMBAIXO)
/* let resultInput = document.getElementById('result') */
//criando funcao para calcular os valores 
function calculate(){
  //aqui eu capturo o valor do input principal e passo pro equal e 
  //depois jogo pro input debaixo
  //input.value= é o conteudo
  //isso aqui faz com que o valor va para o input, porem
  //o valor permanece la quando eu vou iniciar uma nova conta
  //preciso colocar para esse valor sair qnd eu clicar ou digitar novamente
  //CLICAR COM MOUSE OU BOTAO OU DIGITAR AS KEYS QUE EU USO(MENOS ARROW)
  //result é a função
  try {
    const result = eval(input.value);
    if (isNaN(result)) {
    }
    input.value = result;
  } catch (error) {
    console.error(error);
    input.value = 'ERROR'
    if(input.value === 'ERROR'){
      alert('ERROR')
      input.value = ''
    }
  }
  
  // a funcao vai ser aqui dentro pq dps q ele calcular eu tenho que apagar depois de qualquer
  //evento novo la
  //e tenho q fzr aparecer o icone
  //ao lado para poder copiar
  //pode ser um if q ve se tem algo no input se tiver ele deixa la ate ter um eventi
  
}
//adquirindo o root para poder mudar o valor das cores de forma dinamica

const root = document.querySelector(':root')
//switch theme
document.getElementById("themeSwitcher").addEventListener("click", function () {
  let iconElement = document.getElementById('iconTheme')
  if (main.dataset.theme === "dark" && iconElement.src.endsWith("icons/iconsun1.svg")) {
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    iconElement.src = "icons/moonteste.svg";
    iconElement.setAttribute('alt','moonIcon')
    main.dataset.theme = "light"
  } else {
    root.style.setProperty("--bg-color", "#161616")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#ff6600")
    iconElement.src = "icons/iconsun1.svg"
    main.dataset.theme = "dark"
  }
})

//quero colocar o meu resultado no INPUT onde vai os meus numeros
//ao inves de ter dois input
//qnd eu clicar em equal ou enter
//o resultado sobe pro primeiro input