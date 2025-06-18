const can_width = 640;
const can_height = 360;

// Charakter Logik
let x = 0; // Startposition
let y = 150; // Y-Position der Box
const speed = 250; // Bewegungsgeschwindigkeit
const boxSize = 50; // Größe der Box

// Bullet Logik
let bullets = [];
let bulletSize = 10;
let bulletSpeed = 250;

// Canvas Setup
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = can_width;
canvas.height = can_height;

// Cursor Y-Position
let cursorY = 0;
canvas.addEventListener("mousemove", function(event) {
    const rect = canvas.getBoundingClientRect();
    cursorY = event.clientY - rect.top;
    //console.log("Y:", cursorY);
});

// Klick-Event zum Schiessen
canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const bulletY = event.clientY - rect.top; // Y-Position der Maus
    bullets.push({ x: x + boxSize, y: bulletY - 5 }); // Neues Bullet hinzufügen
});

// Animation Loop
let lastTime = performance.now(); // Startzeit festlegen
function update(time) {
    console.log(time);
    
    // Delta-Zeit berechnen
    const deltaTime = (time - lastTime) / 1000; // Delta-Zeit in Sekunden
    lastTime = time; // Aktuelle Zeit speichern

    // Hintergrund Zeichnen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Weiße Box zeichnen
    ctx.fillStyle = "white";
    ctx.fillRect(x, cursorY - boxSize / 2, boxSize, boxSize);

    // Projektile (Bullet) zeichnen
    ctx.fillStyle = "white";
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize); // Bullet zeichnen
        bullet.x += bulletSpeed * deltaTime; // Bewegung nach rechts

        // Entfernen, wenn Bullet aus dem Canvas geht
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });

    // Bewegung der Box nach rechts
    //x += speed * deltaTime; // Bewegung nach rechts
    //if (x > canvas.width) x = -boxSize; // Neustart, wenn die Box aus dem Bild geht

    requestAnimationFrame(update); // Nächsten Frame anfordern

}

requestAnimationFrame(update);

