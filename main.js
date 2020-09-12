//SETTINGS GAME
const SCORE = document.querySelector('.score'),
START = document.querySelector('.start'),
GAME_AREA = document.querySelector('.gameArea'),
CAR = document.createElement('div'),
AUDIO = document.createElement('audio');
const MAX_ENEMY = 8;
const HEIGHT_ELEM = 100;

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    START: false,
    SCORE: 0,
    speed: 3,
    traffic: 3
};

//music settings
AUDIO.loop = true;
AUDIO.volume = 0.1;
AUDIO.src ='useful_evan_king.mp3';
AUDIO.type = 'audio/mp3';
////////////////////////////////////////////////////////////////

CAR.classList.add('car');
START.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

function startGame(){
    START.classList.add('hide');
    GAME_AREA.innerHTML='';
    AUDIO.play();

    //added line on road
    for(let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*HEIGHT_ELEM)+'px';
        line.y = i*HEIGHT_ELEM;
        GAME_AREA.append(line);
    }

    //added enemy on road
    for(let i = 0; i< getQuantityElements(HEIGHT_ELEM * setting.traffic); i++){
        const ENEMY = document.createElement('div');
        const RANDOM_ENEMY = Math.floor(Math.random()* MAX_ENEMY)+1;
        ENEMY.classList.add('enemy');
        ENEMY.y = -HEIGHT_ELEM * setting.traffic * (i+1);
        ENEMY.style.top = ENEMY.y + 'px';
        ENEMY.style.left = Math.floor(Math.random() * (GAME_AREA.offsetWidth - 50)) + 'px';
        ENEMY.style.background = `transparent url(./image/enemy${RANDOM_ENEMY}.png) center/ cover no-repeat`;
        GAME_AREA.append(ENEMY);
    }

    setting.SCORE = 0;
    setting.START = true;
    GAME_AREA.append(CAR);

    //reload car after dtp
    CAR.style.left = GAME_AREA.offsetWidth/2 - CAR.offsetWidth/2;
    CAR.style.top ='auto';
    CAR.style.bottom = '10px';
    START.classList.add('hide');

    setting.x = CAR.offsetLeft;
    setting.y = CAR.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame(){
    if (setting.START){
        setting.SCORE += setting.speed;
        SCORE.innerHTML = 'SCORE<br>'+setting.SCORE;

        moveRoad();
        moveEnemy();

        //limit movement area
        if(keys.ArrowLeft && setting.x > 0){
            setting.x -= setting.speed;
        }
        if(keys.ArrowRight && setting.x < (GAME_AREA.offsetWidth - CAR.offsetWidth)){
            setting.x += setting.speed;
        }
        if(keys.ArrowDown && setting.y < (GAME_AREA.offsetHeight - CAR.offsetHeight)){
            setting.y += setting.speed;
        }
        if(keys.ArrowUp && setting.y >0){
            setting.y -= setting.speed;
        }
        CAR.style.left = setting.x + 'px';
        CAR.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
    
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

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line){
         line.y += setting.speed;
         line.style.top = line.y + 'px';

         if(line.y >= document.documentElement.clientHeight){
             line.y = -HEIGHT_ELEM;
         }
    });
}

function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        //logick dtp
        let carRect = CAR.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if(carRect.top <= enemyRect.bottom && 
            carRect.right >= enemyRect.left &&
            carRect.left <= enemyRect.right &&
            carRect.bottom >= enemyRect.top){
                setting.START = false;
                AUDIO.pause();
                AUDIO.currentTime = 0;
                console.warn('DTP');
                START.classList.remove('hide');
                START.style.top = SCORE.offsetHeight;
        }

        //###############################
        item.y += setting.speed/2;
        item.style.top = item.y + 'px';
        if(item.y >= document.documentElement.clientHeight){
            item.y = -HEIGHT_ELEM * setting.traffic;
            item.style.left = Math.floor(Math.random() * (GAME_AREA.offsetWidth - 50)) + 'px';
        }
    });
}

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight / heightElement + 1;
}