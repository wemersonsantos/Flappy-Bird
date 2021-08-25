const sprites = new Image();
sprites.src = './sprites/sprites.png'

console.log('Vamos fazer!!!')


const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const context:any = canvas.getContext('2d');



interface flappyCoordinates {
    spriteX: number,
    spriteY: number,
    width: number,
    height: number,
    x: number,
    y: number,
    speed: number,
    gravity: number,
    update:Function,
    draw:Function
}
interface groundCoordinates {
    spriteX: number,
    spriteY: number,
    width: number,
    height: number,
    x: number,
    y: number,
    draw:Function
}
interface backGroundCoordinates {
    spriteX: number,
    spriteY: number,
    width: number,
    height: number,
    x: number,
    y: number,
    draw:Function
}

//*Flappy
const flappyBird:flappyCoordinates = {
    spriteX: 0,
    spriteY: 0,
    width: 34,
    height: 26,
    x: 10,
    y: 50,
    speed:0,
    gravity: 0.25,
    update(){
        flappyBird.speed = flappyBird.speed + flappyBird.gravity
        flappyBird.y = flappyBird.y + flappyBird.speed;
    },
    draw(){
        context.drawImage(sprites,
            flappyBird.spriteX, flappyBird.spriteY, //Sprite X e Y 
            flappyBird.width, flappyBird.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
            flappyBird.x, flappyBird.y, //Posição no HTML aonde irá aparecer a imagem
            flappyBird.width, flappyBird.height//Tamanho da imagem (Tamanho: largura e altura)
            );
        }
};

//*Chão
const ground:groundCoordinates = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    x: 0,
    y: canvas.height - 112,
    draw(){
        context.drawImage(sprites,
            ground.spriteX, ground.spriteY, //Sprite X e Y 
            ground.width, ground.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
            ground.x, ground.y, //Posição no HTML aonde irá aparecer a imagem
            ground.width, ground.height//Tamanho da imagem (Tamanho: largura e altura)
            ); 
            context.drawImage(sprites,
                ground.spriteX, ground.spriteY, //Sprite X e Y 
                ground.width, ground.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
                (ground.x + ground.width), ground.y, //Empurrando a imagem de acordo com a largura
                ground.width, ground.height//Tamanho da imagem (Tamanho: largura e altura)
                ); 
        },
};

//*Fundo
const backGround:backGroundCoordinates = {
    spriteX: 390,
    spriteY: 0,
    width: 276,
    height: 92,
    x: 0,
    y: canvas.height - 204,
    draw(){
        context.fillStyle = '#70C5CE';//API referente a cor ou estilo de uma região
        context.fillRect(0,0, canvas.width, canvas.height)//Alterar a cor de fundo

        context.drawImage(sprites,
            backGround.spriteX, backGround.spriteY, //Sprite X e Y 
            backGround.width, backGround.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
            backGround.x, backGround.y, //Posição no HTML aonde irá aparecer a imagem
            backGround.width, backGround.height//Tamanho da imagem (Tamanho: largura e altura)
            ); 
            context.drawImage(sprites,
                backGround.spriteX, backGround.spriteY, //Sprite X e Y 
                backGround.width, backGround.height, //Tamanho do recorte na sprite (Tamanho: largura e altura)
                (backGround.x + backGround.width), backGround.y, //Empurrando a imagem de acordo com a largura
                backGround.width, backGround.height//Tamanho da imagem (Tamanho: largura e altura)
                ); 
        },
};

function loop(){
    backGround.draw();//!Desenha primeiro o fundo, depois chão e depois o flappybird
    ground.draw();//!a ordem importa aqui
    flappyBird.draw();

    flappyBird.update();

    




    requestAnimationFrame(loop);//Ficar chamando a função, um jogo roda a 60fps, 60 imagens por segundo
};

loop();//chamando a função

