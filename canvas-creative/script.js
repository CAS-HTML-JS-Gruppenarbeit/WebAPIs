const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let hue = 1;
let objectCounter = 0;

const mouse = {
  isPainting: false,
  x: 0,
  y: 0,
};

function randomNumberbetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  mouseSetup();

  //randomDrawing();
});

function randomDrawing() {
  setInterval(() => {
    const thing = new Thing(
      randomNumberbetween(50, canvas.width - 50),
      randomNumberbetween(50, canvas.height - 50)
    );
    thing.update();
    objectCounter += 1;
    console.log(objectCounter);
  }, 10);
}

function mouseSetup() {
  canvas.addEventListener("mousedown", () => {
    mouse.isPainting = !mouse.isPainting;
  });
  canvas.addEventListener("mouseup", () => {
    // mouse.isPainting = false;
    //   ctx.fillStyle = 'black';
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
  canvas.addEventListener("mousemove", (e) => {
    if (mouse.isPainting) {
      mouse.x = e.x;
      mouse.y = e.y;
      const thing = new Thing(mouse.x, mouse.y);
      thing.update();
    }
  });
}

class Thing {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //   this.speedX = Math.random() * 4 - 2;
    //   this.speedY = Math.random() * 4 - 2;
    this.speedX = randomNumberbetween(-1, 1);
    this.speedY = randomNumberbetween(-1, 1);
    this.size = Math.random() * 1 + 2;
    this.maxSize = Math.random() * 5 + 3;
    this.angle = Math.random() * 6.2;
  }

  update() {
    this.x += this.speedX + Math.sin(this.angle);
    this.y += this.speedY;
    this.size += 0.1;
    this.angle += 0.2;

    if (this.size < this.maxSize) {
      hue += 0.05;
      let color = "hsl(" + hue + ",100%,50%)";
      ctx.fillStyle = color;

      // ctx.fillRect(this.x, this.y, this.size, this.size);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      requestAnimationFrame(this.update.bind(this));
    }
  }
}
