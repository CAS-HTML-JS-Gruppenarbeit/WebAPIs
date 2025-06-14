// Get the canvas and context
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// --- Canvas API Examples ---

// // 1. Draw filled rectangle
// ctx.fillStyle = colors.turquoise;
// ctx.fillRect(50, 50, 200, 100);

// // 2. Draw stroked rectangle
// ctx.strokeStyle = colors.peterRiver;
// ctx.lineWidth = 5;
// ctx.strokeRect(300, 50, 200, 100);

// // 3. Draw a filled circle
// ctx.beginPath();
// ctx.arc(150, 250, 60, 0, 2 * Math.PI); // Full circle
// ctx.fillStyle = colors.alizarin;
// ctx.fill();

// let angle = 0;
// setInterval(() => {
//   ctx.beginPath();
//   ctx.arc(150, 250, 60, 0, angle);
//   ctx.fillStyle = colors.sunFlower;
//   ctx.fill();
//   angle += 0.1; // Increment angle for animation
//   if (angle >= 2 * Math.PI) {
//     angle = 0; // Reset angle after a full circle
//   }
// }, 100);

// // 4. Draw a stroked circle
// ctx.beginPath();
// ctx.arc(400, 250, 60, 0, 2 * Math.PI);
// ctx.strokeStyle = colors.sunFlower;
// ctx.lineWidth = 4;
// ctx.stroke();

// // 5. Draw a line
// ctx.beginPath();
// ctx.moveTo(50, 400);
// ctx.lineTo(450, 400);
// ctx.strokeStyle = colors.clouds;
// ctx.lineWidth = 3;
// ctx.stroke();

// // 6. Erase a part (clearRect)
// ctx.clearRect(120, 80, 60, 60); // Erase a square in the first rectangle

// // 7. Draw text
// ctx.font = "32px Arial";
// ctx.fillStyle = colors.carrot;
// ctx.fillText("Canvas API Demo", 50, 500);

// // 8. Draw semi-transparent rectangle
// ctx.globalAlpha = 0.5;
// ctx.fillStyle = "#f1c40f";
// ctx.fillRect(200, 350, 200, 100);

// ctx.fillStyle = colors.turquoise;
// ctx.fillRect(300, 250, 200, 200);

// canvas.addEventListener("click", (event) => {
//   const x = event.clientX;
//   const y = event.clientY;

//   ctx.fillStyle = "green";
//   ctx.beginPath();
//   ctx.arc(x, y, 20, 0, Math.PI * 2);
//   ctx.fill();
// });

// document.addEventListener("mousemove", (event) => {
//   // check if mouse is pressed
//   if (event.buttons !== 1) return; // Only proceed if left mouse button is pressed

//   const x = event.clientX;
//   const y = event.clientY;

//   //   ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas leeren
//   ctx.fillStyle = "red";
//   ctx.fillRect(50, 50, 100, 100);

//   ctx.strokeStyle = "blue";
//   ctx.lineWidth = 4;
//   ctx.strokeRect(50, 50, 100, 100);

//   ctx.fillStyle = "green";
//   ctx.beginPath();
//   ctx.arc(x, y, 20, 0, Math.PI * 2);
//   ctx.fill();
// });
