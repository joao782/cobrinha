let canvas = document.getElementById("canvas"); 
let context = canvas.getContext("2d");
let dim = 32;
let cobra = []; 
let direcao = "right";

let comida ={
    x: Math.floor(Math.random() * 15 + 1) * dim,
    y: Math.floor(Math.random() * 15 + 1) * dim
}

cobra[0] ={
    x: 8 * dim,
    y: 8 * dim
}


document.addEventListener('keydown', atualizarTela);


function criarCampo(){
    context.fillStyle = "#d4d4d4";
    context.fillRect(0, 0, 16*dim, 16*dim); 
}

function criarCobrinha (){
    for(i = 0; i < cobra.length; i++){
        context.fillStyle = "green";
        context.fillRect(cobra[i].x, cobra[i].y, dim, dim);
    }
}

function desenharComida (){
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, dim, dim);
}

function atualizarTela(event){
    if(event.keyCode == 37 && direcao != 'right') direcao = 'left';
    if(event.keyCode == 38 && direcao != 'down') direcao = 'up';
    if(event.keyCode == 39 && direcao != 'left') direcao = 'right';
    if(event.keyCode == 40 && direcao != 'up') direcao = 'down';
}

function iniciarJogo(){    

    if(cobra[0].x > 15*dim && direcao == "right") cobra[0].x = 0;
    if(cobra[0].x < 0 && direcao == 'left') cobra[0].x = 16 * dim;
    if(cobra[0].y > 15*dim && direcao == "down") cobra[0].y = 0;
    if(cobra[0].y < 0 && direcao == 'up') cobra[0].y = 16 * dim;
    
    for(i = 1; i < cobra.length; i++){
        if(cobra[0].x == cobra[i].x && cobra[0].y == cobra[i].y){
            clearInterval(jogo);
            alert('Fim de jogo');
        }
    }

    criarCampo();
    criarCobrinha();
    desenharComida();

    var cobraX = cobra[0].x;
    var cobraY = cobra[0].y;

    if (direcao == "right") cobraX += dim;
    if (direcao == "left") cobraX -= dim;
    if (direcao == "up") cobraY -= dim;
    if (direcao == "down") cobraY += dim;

    if(cobraX != comida.x || cobraY != comida.y)
        cobra.pop(); 
    else{
        comida.x = Math.floor(Math.random() * 15 +1) * dim;
        comida.y = Math.floor(Math.random() * 15 +1) * dim;
    }
    
    var cabeca ={
        x: cobraX,
        y: cobraY
    }

    cobra.unshift(cabeca); 
}

let jogo = setInterval(iniciarJogo, 100);
