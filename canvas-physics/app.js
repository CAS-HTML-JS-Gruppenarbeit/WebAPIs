// Check the type of selected ball
const balltypeRadioButtons = document.querySelectorAll('input[name="balltype"]');
let balltype = document.querySelector('input[name="balltype"]:checked').value;
balltypeRadioButtons.forEach(radio => {
    radio.addEventListener('change', function() {
        balltype = this.value;
        //console.log('Ball type changed to:', balltype);
    });
});


const canvas = document.getElementById('myCanvas');

const ctx = canvas.getContext('2d');

const balls = []

// Bounce of canvas border
function ballHitWall(ball) {
    //A collision has occured on any side of the canvas
    if(ball.x + ball.radius > 600 ||
        ball.x - ball.radius < 0 ||
        ball.y + ball.radius > 600 ||
        ball.y - ball.radius < 0){
        if(ball.timeDiff1){
            ball.timeDiff2 = new Date() - ball.timeDiff1;
            ball.timeDiff2 < 200 ? ball.shouldAudio = false : null;
        }
        //Sort out elasticity & then change direction
        ball.dy = (ball.dy * ball.elasticity);

        //Right side of ball hits right side of canvas
        if(ball.x + ball.radius > 600) {
            //We set the X & Y coordinates first to prevent ball from getting stuck in the canvas border
            ball.x = 600 - ball.radius;
            ball.dx *= -1;
        }else if(ball.x - ball.radius < 0){
            //Left side of ball hits left side of canvas
            ball.x = 0 + ball.radius;
            ball.dx *= -1;
        }else if(ball.y + ball.radius > 600){
            //Bottom of ball hits bottom of canvas
            ball.y = 600 - ball.radius;
            ball.dy *= -1;
        }else if(ball.y - ball.radius < 0){
            //Top of ball hits top of canvas
            ball.y = 0 + ball.radius;
            ball.dy *= -1;
        }

        ball.timeDiff1 = new Date();
    }
}

function ballHitBall(ball1, ball2) {
    let collision = false;
    let dx = ball1.x - ball2.x;
    let dy = ball1.y - ball2.y;
    //Modified pythagorous, because sqrt is slow
    let distance = (dx * dx + dy * dy);
    if(distance <= (ball1.radius + ball2.radius)*(ball1.radius + ball2.radius)){
        collision = true;
    }
    return collision;
}

function collideBalls(ball1,ball2){
    //It matters that we are getting the exact difference from ball 1 & ball 2
    let dx = ball2.x - ball1.x;
    let dy = ball2.y - ball1.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    //Work out the normalized collision vector (direction only)
    let vCollisionNorm = {x: dx / distance, y:dy/distance}
    //Relative velocity of ball 2
    let vRelativeVelocity = {x: ball1.dx - ball2.dx,y:ball1.dy - ball2.dy};
    //Calculate the dot product
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
    //Don't do anything because balls are already moving out of each others way
    if(speed < 0) return;
    let impulse = 2 * speed / (ball1.mass + ball2.mass);
    //Becuase we calculated the relative velocity of ball2. Ball1 needs to go in the opposite direction, hence a collision.
    ball1.dx -= (impulse * ball2.mass * vCollisionNorm.x);
    ball1.dy -= (impulse * ball2.mass * vCollisionNorm.y);
    ball2.dx += (impulse * ball1.mass * vCollisionNorm.x);
    ball2.dy += (impulse * ball1.mass * vCollisionNorm.y);
    //Still have to account for elasticity
    ball1.dy = (ball1.dy * ball1.elasticity);
    ball2.dy = (ball2.dy * ball2.elasticity);
}

function collide(index) {
    let ball = balls[index];
    for(let j = index + 1; j < balls.length; j++){
        let testBall = balls[j];
        if(ballHitBall(ball,testBall)){
            collideBalls(ball,testBall);
        }
    }
}
//
class Ball {
    constructor(x, y, radius, angle, speed, color, gravity, friction, elasticity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        this.gravity = gravity || 0.5;
        this.elasticity = elasticity || 0.5;
        this.friction = friction || 0.008;
        this.color = color;
        this.timeDiff1 = null;
        this.timeDiff2 = new Date();
    }

    draw() {
        // Now, draw a circle at (mouseX, mouseY)
        ctx.fillStyle = this.color;

        // Begin a path for drawing
        ctx.beginPath();
        // arc(x, y, radius, startAngle, endAngle)
        // We'll use Math.PI * 2 for the full circumference of the circle
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }

    move() {
        //Sort out gravity
        if(this.y + this.radius < 600){
            this.dy += this.gravity;
        }

        //Apply friction to X axis
        this.dx = this.dx - (this.dx*this.friction);

        this.x += this.dx;
        this.y += this.dy;
    }

}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //Shoot the cannon balls
    balls.forEach((ball, index) => {
        //Moves the balls
        ball.move();
        ballHitWall(ball);
       // collide(index);
        //Renders balls to canvas
        ball.draw();
    });
}

// Draw ball on canvas on Click on canvas
canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;


    const ballradius = balltype === 'Tennis' ? 10 : balltype === 'Basketball' ? 25 : 30;
    const ballcolor = balltype === 'Tennis' ? '#ffbf00' : balltype === 'Basketball' ? '#ff8500' : '#3a1e15';
    const ballspeed = balltype === 'Tennis' ? 10 : balltype === 'Basketball' ? 9 : 8;
    const ballfriction = balltype === 'Tennis' ? 0.01 : balltype === 'Basketball' ? 0.05 : 0.1;
    const ballgravity = balltype === 'Tennis' ? 0.05 : balltype === 'Basketball' ? 0.1 : 0.3;
    const ballelasticity = balltype === 'Tennis' ? 0.8 : balltype === 'Basketball' ? 0.6 : 0.4;

    const createBall = new Ball(x, y, ballradius, 1, ballspeed, ballcolor, ballgravity, ballfriction, ballelasticity);
//    const createBall = new Ball(x, y, ballradius, Math.random() * 2 * Math.PI, ballspeed, ballcolor, ballgravity, ballfriction, ballelasticity);
    //createBall.draw();
    console.log('Neuer Ball', createBall);
    balls.push(createBall);


});

animate();