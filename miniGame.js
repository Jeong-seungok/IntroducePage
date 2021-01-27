const miniGame = document.querySelector('.miniGame');
const miniGameCanvasEl = document.querySelector('.miniGame--canvas');
const ctx = miniGameCanvasEl.getContext("2d");
const startBtnEl = document.querySelector('.miniGame--start');

miniGameCanvasEl.width = miniGame.offsetWidth;
miniGameCanvasEl.height = miniGame.offsetHeight / 2.5;

// 플레이어
class Player{
    constructor(x,y,radius,color,score){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.score = score;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color
        ctx.fill();
    }
}
// 발사체
class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
// 적
class Enemy{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const xCenter = miniGameCanvasEl.width / 2;
const yCenter = miniGameCanvasEl.height / 2;
const player = new Player(xCenter, yCenter, 30, 'blue',0);
const projectiles = [];
const enemies = [];
let stage=1;

function spawnEnemies(){
    const spawnTime = 3000 - (100 * stage) >= 1000 ? 3000 - (100 * stage) : 1000;
    setInterval(()=>{
        const radius = Math.random() * (30 - 20) + 20;
        let x;
        let y;
        if(Math.random() < 0.5){
            x = Math.random() < 0.5 ? 0 - radius : miniGameCanvasEl.width + radius;
            y = Math.random() * miniGameCanvasEl.height;
        }else{
            x = Math.random() * miniGameCanvasEl.width;
            y = Math.random() < 0.5 ? 0 - radius : miniGameCanvasEl.width + radius;
        }
        const color = `hsl(${Math.random() * 360},50%,50%)`;
        const angle = Math.atan2(yCenter - y, xCenter - x);
        const velocity = {
            x: stage > 1 ? Math.cos(angle) * (stage * 0.7) : Math.cos(angle) * 0.5,
            y: stage > 1 ? Math.sin(angle) * (stage * 0.7) : Math.sin(angle) * 0.5
        };
        enemies.push(new Enemy(x, y, radius, color, velocity));
    },spawnTime)
}

const miniGameFinishEl = document.querySelector('.miniGame--finish');
const finishInfoEl = miniGameFinishEl.querySelector('.finish--info');
const finishBtn = miniGameFinishEl.querySelector('.finish--btn');
const InfoEl = document.querySelector('.miniGame--info');
const pointEl = InfoEl.querySelectorAll('em')[0];
const stageEl = InfoEl.querySelectorAll('em')[1];
let rankList; // 랭킹을 담을 변수
let requestId;
let score = 0;

function animate(){
    requestId = window.requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, miniGameCanvasEl.width, miniGameCanvasEl.height);
    player.draw();
    projectiles.forEach((projectile,projectileIdx) => {
        projectile.update();

        if( projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > miniGameCanvasEl.width ||
            projectile.y + projectile.radius < 0 || 
            projectile.y - projectile.radius > miniGameCanvasEl.height){
            setTimeout(()=>{
                projectiles.splice(projectileIdx,1);
            },0);
        }
    });
    enemies.forEach((enemy, enemyIdx) => {
        enemy.update();
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        // End Game
        if(distance - player.radius - enemy.radius < 1){
            window.cancelAnimationFrame(requestId);
            setTimeout(()=>{
                miniGameFinishEl.classList.add('is-active')
                finishInfoEl.innerHTML = `
                    <span>Name: <input type="text" placeholder="닉네임"></span>
                `
                finishBtn.innerText = 'RESTART';
            }, 0)
        }else if(score >= 200 * stage){
            window.cancelAnimationFrame(requestId);
            setTimeout(() => {                
                startBtnEl.classList.remove('is-click');
                startBtnEl.innerText = 'NEXT STAGE';
            }, 0);
        }
        projectiles.forEach((projectile, projectileIdx) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if(distance - projectile.radius - enemy.radius < 1){
                if(enemy.radius - 10 > 10){
                    enemy.radius -= 10;
                    setTimeout(()=>{
                        projectiles.splice(projectileIdx,1);
                    },0);
                }else{
                    setTimeout(()=>{
                        score += 10;
                        pointEl.innerText = score;
                        enemies.splice(enemyIdx,1);
                        projectiles.splice(projectileIdx,1);
                    },0);
                }
            }
        })
    })
}
miniGameCanvasEl.addEventListener('click',(e)=>{
    // 팝업이 떴을 경우
    if(startBtnEl.classList.contains('is-click'))
        e.preventDefault();
    const angle = Math.atan2(e.offsetY - yCenter, e.offsetX - xCenter);
    const velocity = {
        x: Math.cos(angle)*5,
        y: Math.sin(angle)*5
    };
    projectiles.push(new Projectile(xCenter, yCenter, 30, 'red', velocity));
})
// 시작, 다음 스테이지 버튼
startBtnEl.addEventListener('click',()=>{
    const reset = () =>{
        ctx.clearRect(0,0,miniGameCanvasEl.width, miniGameCanvasEl.height);
        enemies.splice(0,enemies.length);
        projectiles.splice(0,projectiles.length);
        stageEl.innerText = stage;
        player.score = score;
    }
    if(startBtnEl.innerText === 'NEXT STAGE'){
        ++stage;
        reset();
    }
    startBtnEl.classList.add('is-click');
    setTimeout(()=>{
        animate();
        spawnEnemies();
    },1000);
})
// 다시 시작, 유저이름 입력
finishBtn.addEventListener('click',()=>{
    const reset = () =>{
        score = 0;
        ctx.clearRect(0,0,miniGameCanvasEl.width, miniGameCanvasEl.height);
        enemies.splice(0,enemies.length);
        projectiles.splice(0,projectiles.length);
        stageEl.innerText = stage;
        pointEl.innerText = score;
    }
    player.score += score;
    const inputEl = finishInfoEl.querySelector('input');
    const userDataObj = {
        name: inputEl.value,
        score: player.score,
        stage: stage
    }
    rankList.push(userDataObj);
    setData(rankList);
    miniGameFinishEl.classList.remove('is-active');
    setTimeout(()=>{
        reset();
        animate();
        spawnEnemies();
        player.score = 0;
    },1000);
})

/* Modal start*/
const miniGameBtnEl = document.querySelector('.miniGame--button');
const modalInfoBtn = miniGameBtnEl.querySelector('.modal--info');
const modalRankBtn = miniGameBtnEl.querySelector('.modal--rank');
const miniGameModalEl = document.querySelector('.miniGame--modal');
const modalTitle = miniGameModalEl.querySelector('.modal--title');
const modalDescription = miniGameModalEl.querySelector('.modal--description');
const modalCloseBtn = miniGameModalEl.querySelector('.modal--close');

// 게임설명, 랭킹 버튼
miniGameBtnEl.addEventListener('click',(e)=>{
    const target = e.target;
    if(target === modalInfoBtn){
        modalTitle.innerText = '💣게임설명';
        miniGameModalEl.classList.add('is-active');
        modalDescription.innerHTML = `
        <ul class="info--rule">
            <li>1. 점수가 200점이 되면 다음 스테이지로 넘어갑니다.</li>
            <li>2. 플레이어가 장애물과 닿는 순간 게임이 끝나게 됩니다.</li>
            <li>3. 스테이지가 올라갈수록 난이도가 올라가니 집중하세요.</li>
        </ul>
        `;
    }else if(target == modalRankBtn){
        let medal;
        modalTitle.innerText = '📊 랭킹';
        miniGameModalEl.classList.add('is-active');
        modalDescription.innerHTML = '';
        const rankListEl = document.createElement('ul');
        rankListEl.classList.add('rank--list');
        rankList.sort((a,b)=>b.score-a.score).map((user,idx)=>{
            if(idx>2)
                return false;
            if(idx === 0)
                medal = '🥇';
            else if(idx === 1)
                medal = '🥈';
            else
                medal = '🥉';
            const liEl = document.createElement('li');
            liEl.innerHTML = `${medal} ${user.name} | stage: ${user.stage} | score: ${user.score}`;
            rankListEl.append(liEl);
        })
        modalDescription.append(rankListEl);
    }else
        return false;
});
modalCloseBtn.addEventListener('click',()=>{
    miniGameModalEl.classList.remove('is-active');
})
/* Modal end*/

// 랭크 업데이트
function setData(value){
    localStorage.setItem('user',JSON.stringify(value));
}
// 초기 랭크 업데이트
function initData(){
    const userData = JSON.parse(localStorage.getItem('user'));
    const defaultData = [
    {
        name: '정승옥',
        score: 550,
        stage: 3
    },
    {
        name: 'BOB',
        score: 450,
        stage: 3
    },
    {
        name: 'STEVE',
        score: 250,
        stage: 2
    }];
    rankList = defaultData;
    if(userData === null){
        localStorage.setItem('user',JSON.stringify(defaultData));
    }
}
initData(); // 초기 랭크 업데이트 실행