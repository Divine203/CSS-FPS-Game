const arena = document.querySelector('.arena');
const mapArena = document.querySelector('.map--arena');

let isCameraActive = true;
let isShooting = false;
let isEnemy = true;

let enemies = [false, false, false, false, true];

let cameraRotateX;
let cameraRotateY;

const audio = {
    pistolShot1: new Audio(`../assets/audio/gunshot1.mp3`),
    ak47: new Audio(`../assets/audio/ak47.mp3`),
    groan1: new Audio(`../assets/audio/groan1.mp3`)

}

// width: 1366px
// height: 657px

const pxToRem = (pxValue) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const remValue = pxValue / rootFontSize;
    return remValue;
}

const rotateArena = (dir, x, y) => {
    if (dir == 'r' || dir == 'l') {
        arena.style.transform = `rotateX(${x}rad) rotateY(${y}rad)`;
    } else if (dir == 'u' || dir == 'd') {
        arena.style.transform = `rotateX(${x}rad) rotateY(${y}rad)`;
    }
}

// const mapCoordinates = (x, y) => {

//     document.querySelector('.x--val').textContent = `x: ${x}`;
//     document.querySelector('.y--val').textContent = `y: ${y}`;

//     // mapArena.style.left = `${-(pxToRem(y) * variableY)}rem`;
//     // mapArena.style.top = `${((pxToRem(x)) * variableX)+4.5}rem`;
// }

const camera = () => {
    if (isCameraActive) {
        const sensitivity = 0.0127;

        let prevX = 0;
        let prevY = 0;

        window.addEventListener("mousemove", (e) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            const transform = arena.style.transform;

            cameraRotateX = parseFloat(transform.match(/rotateX\((-?[0-9.]+)rad\)/)[1]);
            cameraRotateY = parseFloat(transform.match(/rotateY\((-?[0-9.]+)rad\)/)[1]);

            let xRound = Math.round(cameraRotateX * 100) / 100;
            let yRound = Math.round(cameraRotateY * 100) / 100;

            // console.log(cameraRotateX, cameraRotateY);

            // mapCoordinates(xRound, yRound);


            if (currentX > prevX) {
                cameraRotateY += sensitivity;
                rotateArena('r', cameraRotateX, cameraRotateY);
            } else if (currentX < prevX) {
                cameraRotateY -= sensitivity;
                rotateArena('l', cameraRotateX, cameraRotateY);
            }

            if (currentY > prevY) {
                if (cameraRotateX >= -0.17426) {
                    cameraRotateX -= sensitivity;
                    rotateArena('d', cameraRotateX, cameraRotateY);
                }
            } else if (currentY < prevY) {
                if (cameraRotateX <= 0.052434) {
                    cameraRotateX += sensitivity;
                    rotateArena('u', cameraRotateX, cameraRotateY);
                }
            }

            prevX = currentX;
            prevY = currentY;
        });
    }
}

const trackMovement = () => {

}

const positionEnemies = () => {
    let xPos;
    let yPos;
    let zPos;

    if (enemies[0]) {
        xPos = 1400;
        yPos = 380;
        zPos = -3300;
    } else if (enemies[1]) {
        xPos = -300;
        yPos = 380;
        zPos = -2800;
    } else if (enemies[2]) {
        xPos = 880;
        yPos = 400;
        zPos = -3500;
    } else if (enemies[3]) {
        xPos = 1100;
        yPos = 400;
        zPos = -2600;
    } else if (enemies[4]) {
        xPos = -5;
        yPos = 400;
        zPos = -4150;
    }

    const enemyMarkup = `<div style="
    top: ${yPos}px; 
    left: ${xPos}px;
    transform: translateZ(${zPos}px);
    " class="enemy-cont"></div>`;

    arena.insertAdjacentHTML('afterbegin', enemyMarkup);
}

const checkTarget = (x, y) => {
    let xRound = Math.round(x * 100) / 100;
    let yRound = Math.round(y * 100) / 100;

    if (enemies[0]) { // done
        if ((yRound <= 0.24 || yRound >= 0.22) && (xRound == -0.09)) {
            return true;
        } else {
            return false;
        }
    } else if (enemies[1]) {
        if ((yRound == -0.32 || yRound == -0.33 || yRound == -0.34) && (xRound == -0.09 || xRound == -0.1)) {
            return true;
        } else {
            return false;
        }
    } else if (enemies[2]) {
        if ((yRound == 0.09 || yRound == 0.08 || yRound == 0.06) && (xRound == -0.07 || xRound == -0.09 || xRound == -0.1 || xRound == -0.13 || xRound == -0.14 || xRound == -0.15 || xRound == -0.16)) {
            return true;
        } else {
            return false;
        }
    } else if (enemies[3]) {
        if ((yRound == 0.17 || yRound == 0.18 || yRound == 0.19) && (xRound == -0.1 || xRound == -0.11 || xRound == -0.12 || xRound == -0.13 || xRound || -0.14)) {
            return true;
        } else {
            return false;
        }
    } else if (enemies[4]) {
        if ((yRound == -0.15) && (xRound == -0.07 || xRound == -0.08 || xRound == -0.09 || xRound == -0.1)) {
            return true;
        } else {
            return false;
        }
    }

}

const shoot = () => {
    let isOnTarget = checkTarget(cameraRotateX, cameraRotateY);
    killEnemy(isOnTarget);
}


const killEnemy = (isOnTarget) => {
    const targetedEnemy = document.querySelector('.enemy-cont');

    if (isOnTarget) {
        audio.groan1.play();
        audio.ak47.pause();

        let r = Math.floor(Math.random() * enemies.length);
        targetedEnemy.remove();
        enemies = [false, false, false, false, false];

        setTimeout(() => {
            enemies[r] = true;
            positionEnemies();
            document.querySelector('.enemy--list').textContent = `${enemies[0]}, ${enemies[1]}, ${enemies[2]}, ${enemies[3]}, ${enemies[4]}`
        }, 1000)
    }
}

const controls = () => {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'q') {
            shoot();
            audio.pistolShot1.play();
            // Check if the sound effect is still playing
            if (!audio.pistolShot1.ended || !audio.pistolShot1.paused) {
                // If the sound effect has finished playing, play it again
                audio.pistolShot1.currentTime = 0; // rewind the audio to the beginning
                audio.pistolShot1.play();
            }
        }
    })
}


controls();
camera();
positionEnemies();
