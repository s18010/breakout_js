const canvas = document.getElementById("main");
const ctx = canvas.getContext("2d");
const WINDOW_WIDTH = canvas.width;
const WINDOW_HEIGHT = canvas.height;
const SPF = 1000 / 60;
const PADDLE_SPEED = 5;
const BLOCK_WIDTH = 50;
const BLOCK_HEIGHT = 20;

const input = new Input();
const ball = new Ball(400, 300, 10, 'red');
const paddle = new Paddle(400, 550, 80, 10, 'deepskyblue');
const blocks = [];
var score = 0;

for (var x = 100 ; x <= 700 ; x += 100) {
    for (var y = 80 ; y <= 250 ; y += 50) {
    blocks.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "lime"));
        blocks.push(new Block(x, y, BLOCK_WIDTH, BLOCK_HEIGHT, "lime"));
    }
}

window.setInterval(game_tick, SPF);

function game_tick() {
    // 入力状況に応じた呼び出し
    if (input.space) {
        ball.start(5);
    }
    if (input.left) {
        paddle.move(-PADDLE_SPEED);
    }
    if (input.right) {
        paddle.move(PADDLE_SPEED);
    }


    // ボールの移動
    ball.move();

    // ボールとブロックの当たり判定
    paddle.collide(ball);
    block_collide();


    // 各種オブジェクトの描画
    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    paddle.draw(ctx);
    ball.draw(ctx);
    blocks.forEach((block) => block.draw(ctx));

    print_score();
    game_clear();
    game_over();
}


//当たり判定
function block_collide() {
     blocks.forEach(function(block) {
         if (block.collide(ball)) {
             block.exist = false;
             score += 10;
         }
     });
}


function game_over() {
    if (ball.y > canvas.height) {
        ctx.save();
        ctx.font = "64px serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#f00";
        ctx.strokeStyle = "#fff";
        ctx.fillText("GAME OVER", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.strokeText("GAME OVER", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
        ctx.restore();
    }
}

function game_clear() {
    var isgame_clear = false;
    blocks.forEach(function(block) {
        if (block.exist) {
            isgame_clear = true;
        }
    });
    if (isgame_clear) {
        return
    }
    ctx.save();
    ctx.font = "64px serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#00f";
    ctx.strokeStyle = "#fff";
    ctx.fillText("GAME CLEAR", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    ctx.strokeText("GAME CLEAR", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    ctx.restore();
}

function print_score() {
    ctx.save();
    ctx.font = "30px serif";
    ctx.textAlign = "right";
    ctx.fillStyle = "#fff";
    ctx.fillText("score: " + score, WINDOW_WIDTH - 24, 24);
    ctx.restore();
}
