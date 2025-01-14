// Variables para los efectos
let swingAngle = 0;
let swingDirection = 1;

let lightningOpacity = 0;
let lightningDirection = 1;

let pulseScale = 1;
let pulseDirection = 0.05;

function setup() {
    // Crear un lienzo que cubra toda la ventana
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1'); // Asegura que el lienzo esté detrás de las imágenes
    noLoop(); // Inicialmente no dibujar continuamente
}

function draw() {
    clear(); // Limpiar el lienzo en cada frame

    // Efecto Swing
    if (document.querySelector('.swing').style.display !== 'none') {
        swingAngle += swingDirection * 0.05;
        if (swingAngle > 15 || swingAngle < -15) {
            swingDirection *= -1;
        }
        push();
        translate(width / 2, height / 2);
        rotate(radians(swingAngle));
        imageMode(CENTER);
        let swingImg = select('.swing');
        if (swingImg) {
            image(swingImg.elt, 0, 0, 200, 200); // Ajusta el tamaño según necesidad
        }
        pop();
    }

    // Efecto Lightning
    if (document.querySelector('.lightning').style.display !== 'none') {
        lightningOpacity += lightningDirection * 5;
        if (lightningOpacity > 255 || lightningOpacity < 100) {
            lightningDirection *= -1;
        }
        fill(255, 255, 0, lightningOpacity);
        noStroke();
        ellipse(random(width), random(height), 50, 50); // Simula relámpagos
    }

    // Efecto Pulse
    if (document.querySelector('.pulse').style.display !== 'none') {
        pulseScale += pulseDirection;
        if (pulseScale > 1.2 || pulseScale < 0.8) {
            pulseDirection *= -1;
        }
        push();
        translate(width / 2, height / 2);
        scale(pulseScale);
        imageMode(CENTER);
        let pulseImg = select('.pulse');
        if (pulseImg) {
            image(pulseImg.elt, 0, 0, 200, 200); // Ajusta el tamaño según necesidad
        }
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// Función para activar el loop de dibujo cuando se activa una overlay
function toggleDrawing() {
    let anyVisible = document.querySelectorAll('.overlay').length > 0;
    if (anyVisible) {
        loop();
    } else {
        noLoop();
    }
}

// Observador para detectar cambios en el DOM y activar/desactivar el loop
const observer = new MutationObserver(toggleDrawing);
observer.observe(document.body, { attributes: true, childList: true, subtree: true });