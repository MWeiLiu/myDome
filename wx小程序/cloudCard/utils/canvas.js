class Circle {
  constructor(x, y, r, color) {
    this.x = x
    this.y = y
    this.r = r,
    this.c = color ? color : this.getRandomColor()
  }
  getRandomColor() {
    let r = Math.floor(Math.random() * 100) + 155
    let g = Math.floor(Math.random() * 100) + 155
    let b = Math.floor(Math.random() * 100) + 155
    return `rgb(${r},${g},${b})`
  }
}

class RandomCircle {
  constructor(obj) {
    this.ctx = wx.createCanvasContext(obj.id);
    this.ctx.width = obj.width;
    this.ctx.height = obj.height;
    this.dWidth = this.ctx.width;
    this.dHeight = this.ctx.height;

    this.fix = obj.fix || false;
    this.minMargin = obj.minMargin || 5;
    this.minRadius = obj.minRadius || 20;
    this.radiuArr = obj.radiuArr || [80, 70, 60, 50, 45, 40, 40, 35, 35, 30];
    this.total = obj.total || 10;
    this.circleArray = [];
    this.circleNumber = 1;
  }
  drawOneCircle(c) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = c.c;
    this.ctx.fillStyle = c.c;
    this.ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.fillStyle = 'black';
    this.ctx.fillText(this.circleNumber, c.x, c.y);
    this.ctx.draw();
    this.circleNumber++;
  }

  check(x, y, r) {
    return !(x + r > this.dWidth || x - r < 0 || y + r > this.dHeight || y - r < 0)
  }

  // 获取一个新圆的半径，主要判断半径与最近的一个圆的距离
  getR(x, y) {
    if (this.circleArray.length === 0) return Math.floor(Math.random() * 10 + 15);
    let lenArr = this.circleArray.map(c => {
      let xSpan = c.x - x;
      let ySpan = c.y - y;
      return Math.floor(Math.sqrt(Math.pow(xSpan, 2) + Math.pow(ySpan, 2))) - c.r
    });
    let minCircleLen = Math.min(...lenArr);
    let minC = this.circleArray[lenArr.indexOf(minCircleLen)];
    let tempR = this.fix ? this.radiuArr[this.circleArray.length] : minCircleLen - this.minMargin;
    let bool = this.fix ? (tempR <= minCircleLen - minC.r) : (tempR >= this.minRadius);
    return bool ? tempR : false
  }

  // 生成一个圆，随机生成圆心。
  // 如果连续生成200次半径都没有合适的话，终止进程
  createOneCircle() {
    let x, y, r;
    let createCircleTimes = 0
    while (true) {
      createCircleTimes++;
      x = Math.floor(Math.random() * this.dWidth);
      y = Math.floor(Math.random() * this.dHeight);
      let TR = this.getR(x, y);
      if (!TR) {
        continue;
      } else {
        if (TR > 40) {
          r = 40;
        } else {
          r = TR;
        }
      }
      if (this.check(x, y, r) || createCircleTimes > 10) {
        break;
      }
    }
    this.check(x, y, r) && this.circleArray.push(new Circle(x, y, r))

  }

  // 如果生成100次新圆都失败的话，终止方案。
  // 如果生成100种方案都没有合适可用的话，终止进程。
  init() {
    let n = 0;
    while (this.circleArray.length < this.total) {
      this.circleArray = [];
      let i = 0;
      while (this.circleArray.length < this.total) {
        this.createOneCircle();
        i++;
        if (i >= 50) {
          break;
        }
      }
      n++;
      if (n > 50) {
        break;
      }
    }
    // 根据半径从大到小画圆。
    console.log(this.circleArray);
    this.circleArray.sort((a, b) => a.r - b.r).forEach(c => {
      console.log(c);
      this.drawOneCircle(c)
    })
  }
}
let p;
function myCanvas(id,width,height,total,radiuArr){
  p = new RandomCircle({
    id: id,
    width: width,
    height: height,
    total: total,
    radiuArr: radiuArr
  })
  p.init();
}
module.exports = {
  tagCan: myCanvas
}