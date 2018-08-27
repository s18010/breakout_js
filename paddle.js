class Paddle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.half_width = width / 2;
        this.half_height = height / 2;
        this.color = color;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.beginPath();
        ctx.moveTo(this.half_width, 0);
        ctx.lineTo(this.half_width, this.half_height);
        ctx.lineTo(-this.half_width, this.half_height);
        ctx.lineTo(-this.half_width, -this.half_height);
        ctx.lineTo(this.half_width, -this.half_height);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.restore();
    }

    move(dx) {
        this.x += dx;

        // 画面左を超えないように
        const left = this.x - this.half_width;
        if (left < 0) {
            this.x -= left;
        }

        // 画面右を超えないように
        const right = this.x + this.half_width;
        if (right > WINDOW_WIDTH) {
            this.x -= right - WINDOW_WIDTH
        }
    }

    collide(ball) {
        const top = this.y - this.half_height;
        const bottom = this.y + this.half_height;
        // ボールがブロックより上か下にある場合、何もしない
        if (top > ball.bottom || bottom < ball.top) {
            return;
        }

        const left = this.x - this.half_width;
        const right = this.x + this.half_width;

        if (left < ball.right && right > ball.left) {
            if (ball.rightBottom.x < left && ball.rightBottom.y > top) {
                // ブロックの左角より下側であたったら上に戻さない
                ball.reboundHorizontal(left - ball.right);
            } else if (ball.leftBottom.x > right && ball.leftBottom.y > top) {
                // ブロックの右角より下側であたったら上に戻さない
                ball.reboundHorizontal(ball.left - right);
            } else {
                // 通常通り上に跳ね返す
                ball.reboundVertical(ball.bottom - top);
            }
        }
    }
}