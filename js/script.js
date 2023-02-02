const arena = document.querySelector('.arena');
let isCameraActive = true;

const rotateArena = (dir, x, y) => {
    if (dir == 'r' || dir == 'l') {
        arena.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    } else if (dir == 'u' || dir == 'd') {
        arena.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
    }
}

const camera = () => {
    if (isCameraActive) {
        let prevX = 0;
        let prevY = 0;

        window.addEventListener("mousemove", (e) => {
            const currentX = e.clientX;
            const currentY = e.clientY;

            const transform = arena.style.transform;

            let rotateX = parseInt(transform.match(/rotateX\((-?\d+)deg\)/)[1], 10);
            let rotateY = parseInt(transform.match(/rotateY\((-?\d+)deg\)/)[1], 10);

            // console.log(rotateX, rotateY);

            if (currentX > prevX) {
                rotateY++;
                rotateArena('r', rotateX, rotateY);
            } else if (currentX < prevX) {
                rotateY--;
                rotateArena('l', rotateX, rotateY);
            }

            if (currentY > prevY) {
                if(rotateX >= -7) {
                    rotateX--;
                    rotateArena('d', rotateX, rotateY);
                }
            } else if (currentY < prevY) {
                if(rotateX <= -3){
                    rotateX++;
                    rotateArena('u', rotateX, rotateY);
                }
            }

            prevX = currentX;
            prevY = currentY;
        });
    }
}

const trackMovement = () => {

}

const generateTerrain = () => {

}


const controls = () => {
   

}


controls();
camera();