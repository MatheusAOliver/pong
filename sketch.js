//variaveis da bolinha  
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let cRaquete = 10;
let aRaquete = 90;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let xVelocidadeOponente;
let yVelocidadeOponente;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//dificuldade do jogo

let chanceDeErrar = 0;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
}

function draw(){
  background(0);
  mostraBolinha ();
  movimentaBolinha();
  colisaoBolinha();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  }

function mostraBolinha(){
   circle(xBolinha, yBolinha, diametro);
 }
function movimentaBolinha(){
   xBolinha += velocidadeXBolinha;
   yBolinha += velocidadeYBolinha;
 }

function colisaoBolinha(){
   if (xBolinha + raio > width || xBolinha - raio < 0){ 
    velocidadeXBolinha *= -1; 
   }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
   }
 }

function mostraRaquete(x, y){
   rect(x, y, cRaquete, aRaquete)  
 }

function movimentaMinhaRaquete(){
   if (keyIsDown(UP_ARROW)){
     yRaquete -= 10;
   }
   if (keyIsDown(DOWN_ARROW)){
     yRaquete += 10;
   }
 }

function verificaColisaoRaquete(){
  if (xBolinha - raio < xRaquete + cRaquete && yBolinha - raio < yRaquete + aRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}
function colisaoRaqueteOponente(){
    if(xBolinha + raio > xRaqueteOponente && yBolinha - raio < yRaqueteOponente + aRaquete && yBolinha + raio > yRaqueteOponente){
  velocidadeXBolinha *= -1;
  raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - cRaquete / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

function incluiPlacar(){
  textAlign(CENTER)
  stroke(255)
  textSize(16);
  fill(color(255,140,0));
  rect(150, 10, 40, 20);
  fill(255)
  text(meusPontos,170, 26);
  fill(color(255,140,0));
  rect(450,10, 40, 20);
  fill(255)
  text(pontosDoOponente,470,26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha <10){
    pontosDoOponente +=1;
    ponto.play();
  }
}
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 10
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}
