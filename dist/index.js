"use strict";
var sprites = new Image();
sprites.src = './sprites/sprites.png';
console.log('Vamos fazer!!!');
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
//*Chão
var start = {
    spriteX: 135,
    spriteY: 0,
    width: 175,
    height: 153,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    draw: function () {
        context.drawImage(sprites, start.spriteX, start.spriteY, //Sprite X e Y 
        start.width, start.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
        start.x, start.y, //Posição no HTML aonde irá aparecer a imagem
        start.width, start.height //Tamanho da imagem (Tamanho: largura e altura)
        );
    },
};
//*Flappy
var flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 34,
    height: 26,
    x: 10,
    y: 50,
    speed: 0,
    gravity: 0.25,
    update: function () {
        flappyBird.speed = flappyBird.speed + flappyBird.gravity;
        flappyBird.y = flappyBird.y + flappyBird.speed;
    },
    draw: function () {
        context.drawImage(sprites, flappyBird.spriteX, flappyBird.spriteY, //Sprite X e Y 
        flappyBird.width, flappyBird.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
        flappyBird.x, flappyBird.y, //Posição no HTML aonde irá aparecer a imagem
        flappyBird.width, flappyBird.height //Tamanho da imagem (Tamanho: largura e altura)
        );
    }
};
//*Chão
var ground = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    draw: function () {
        context.drawImage(sprites, ground.spriteX, ground.spriteY, //Sprite X e Y 
        ground.width, ground.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
        ground.x, ground.y, //Posição no HTML aonde irá aparecer a imagem
        ground.width, ground.height //Tamanho da imagem (Tamanho: largura e altura)
        );
        context.drawImage(sprites, ground.spriteX, ground.spriteY, //Sprite X e Y 
        ground.width, ground.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
        (ground.x + ground.width), ground.y, //Empurrando a imagem de acordo com a largura
        ground.width, ground.height //Tamanho da imagem (Tamanho: largura e altura)
        );
    },
};
//*Fundo
var backGround = {
    spriteX: 390,
    spriteY: 0,
    width: 276,
    height: 92,
    x: 0,
    y: canvas.height - 204,
    draw: function () {
        context.fillStyle = '#70C5CE'; //API referente a cor ou estilo de uma região
        context.fillRect(0, 0, canvas.width, canvas.height); //Alterar a cor de fundo
        context.drawImage(sprites, backGround.spriteX, backGround.spriteY, //Sprite X e Y 
        backGround.width, backGround.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
        backGround.x, backGround.y, //Posição no HTML aonde irá aparecer a imagem
        backGround.width, backGround.height //Tamanho da imagem (Tamanho: largura e altura)
        );
        context.drawImage(sprites, backGround.spriteX, backGround.spriteY, //Sprite X e Y 
        backGround.width, backGround.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
        (backGround.x + backGround.width), backGround.y, //Empurrando a imagem de acordo com a largura
        backGround.width, backGround.height //Tamanho da imagem (Tamanho: largura e altura)
        );
    },
};
//*Telas
var activeScreen = {}; //Tela ativa no momento
function updateScreen(newScreen) {
    activeScreen = newScreen; //Defini a tela que está ativada no momento
}
var screens = {
    begin: {
        draw: function () {
            backGround.draw(); //!Desenha primeiro o fundo, depois chão e depois o flappybird
            ground.draw(); //!a ordem importa aqui
            flappyBird.draw();
            start.draw(); //Novo jogo
        },
        click: function () {
            updateScreen(screens.game);
        },
        update: function () {
        }
    },
    game: {
        draw: function () {
            backGround.draw(); //!Desenha primeiro o fundo, depois chão e depois o flappybird
            ground.draw(); //!A ordem importa aqui
            flappyBird.draw();
            flappyBird.update(); //Queda
        },
        update: function () {
        }
    },
    end: {
        draw: function () {
        },
        update: function () {
        }
    },
};
function loop() {
    activeScreen.draw();
    requestAnimationFrame(loop); //Ficar chamando a função, um jogo roda a 60fps, 60 imagens por segundo
}
;
window.addEventListener('click', function (e) {
    if (activeScreen.click) {
        activeScreen.click();
    }
});
updateScreen(screens.begin); //muda a tela
loop(); //chamando a função loop
