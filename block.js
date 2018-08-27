class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.half_width = width / 2;
        this.half_height = height / 2;
        this.color = color;
        this.exist = true;
    }

    draw(ctx) {
        if (!this.exist) {
            return
        }
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

    collide(ball) {
        if (!this.exist) {
            return
        }
        let result = true;
        const top = this.y - this.half_height;
        const bottom = this.y + this.half_height;
        // ボールがブロックより上か下にある場合、何もしない
        if (top > ball.bottom || bottom < ball.top) {
            return false;
        }

        const left = this.x - this.half_width;
        const right = this.x + this.half_width;

        if (left < ball.right && right > ball.left) {
            if (ball.rightBottom.x < left && ball.rightBottom.y > top
                && ball.rightBottom.y < bottom) {
                // ブロックの左上角より下側であたったら上に戻さない
                ball.reboundHorizontal();
            } else if (ball.leftBottom.x > right && ball.leftBottom.y > top
                && ball.leftBottom.y < bottom) {
                // ブロックの右上角より下側であたったら上に戻さない
                ball.reboundHorizontal();
            } else if (ball.rightTop.x < left && ball.rightTop.y < bottom
                && ball.rightTop.y > top) {
                // ブロックの左下角より上側であたったら下に戻さない
                ball.reboundHorizontal();
            } else if (ball.leftTop.x > right && ball.leftTop.y < bottom
                && ball.leftTop.y > top) {
                // ブロックの右下角より上側であたったら下に戻さない
                ball.reboundHorizontal();
            } else if (ball.bottom > top && ball.top < top) {
                // ブロックの上にあたった
                ball.reboundVertical();
            } else {
                // ブロックの下に当たった
                ball.reboundVertical();
            }
        } else {
            result = false;
        }

        return result;
    }
}