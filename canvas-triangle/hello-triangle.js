function draw() {
    const canvas = document.getElementById("demo-canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(100, 50);
        ctx.lineTo(150, 150);
        ctx.lineTo(50, 150);
        ctx.fillStyle = "#4a0080";
        ctx.fill();
    }
}
draw();