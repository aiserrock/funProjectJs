const score = document.querySelector('.score'),
start = document.querySelector('.start'),
gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');
car.classList.add('car');
//music
const audio = document.createElement('audio');
audio.loop = true;
audio.volume = 0.1;
audio.src ='useful_evan_king.mp3';
audio.type = 'audio/mp3';

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const maxEnemy = 7;
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
};
console.dir(audio);
function startGame(){
    audio.play();
    start.classList.add('hide');
    setting.start = true;
    //added line on road
    for(let i = 0; i < getQuantityElements(100); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100)+'px';
        line.y = i*100;
        gameArea.append(line);
    }
    //added enemy on road
    for(let i = 0; i< getQuantityElements(100 * setting.traffic);i++){
        const enemy = document.createElement('div');
        const randomEnemy = Math.floor(Math.random()* maxEnemy)+1;
        enemy.classList.add('enemy');
        enemy.y = -100 * setting.traffic * (i+1);
        enemy.style.top = enemy.y + 'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.background = `transparent url(./image/enemy${randomEnemy}.png) center/ cover no-repeat`;
        gameArea.append(enemy);
    }
    gameArea.append(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function startRun(event){
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = true;
    }
    console.log(event.key);

}

function stopRun(event){
    event.preventDefault();
    if(keys.hasOwnProperty(event.key)){
        keys[event.key] = false;
    }
}

function playGame(){
    if (setting.start){
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
        }
        if(keys.ArrowUp && setting.y >0){
            setting.y -= setting.speed;
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
    
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
         line.y += setting.speed;
         line.style.top = line.y + 'px';

         if(line.y >= document.documentElement.clientHeight){
             line.y = -100;
         }
    });
}

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        item.y += setting.speed /2;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }
    });
}