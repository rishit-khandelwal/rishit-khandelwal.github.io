class Dot {
  constructor (x,y) {
    this.position = createVector(x,y);
    this.colorval = 0;
  }
  
  show() {
    stroke(this.colorval);
    strokeWeight(1);
    point(this.position.x,this.position.y);
  }
}

class DotArray  {
  constructor(size,number) {
    this.array = [];
    this.stepsize = size/number;
    let counter = 0;
    for (let x = 0; x < size ; x+=size/number) {
      this.array.push([]);
      for (let y = 0; y < size ; y+=size/number) {
        this.array[counter].push(new Dot(x,y));
      }
      counter++;
    }
  }
  
  update() {
    let c = 0;
    for(let layer of this.array) {
      let size = layer.length;
      for (let i = 0; i<size; i+=this.stepsize) {
        let t = 0;
        let n = 0;
        if (c == 0 && i == 0) {
          break;
        }
        if (c!=0) {
          let d = this.array[c-1][i].colorval;
          this.array[c-1][i].colorval = (this.array[c][i].colorval+d)/2;
          // console.log((2*this.array[c][i].colorval*d)/(this.array[c][i].colorval+d));
          t += this.array[c-1][i].colorval;
          n++;
        }
        if (c!=size-1) {
          let d = this.array[c+1][i].colorval;          
          this.array[c+1][i].colorval = (this.array[c][i].colorval+d)/2;
          t += this.array[c+1][i].colorval;
          n++;
        }
        if (i!=0) {
          let d = this.array[c][i-1].colorval+this.array[c][i].colorval/8;
          this.array[c][i-1].colorval = (this.array[c][i].colorval+d)/2;
          t += this.array[c][i-1].colorval;
          n++
        }
        if (i!=size-1) {
          let d = this.array[c][i+1].colorval+this.array[c][i].colorval/8;
          this.array[c][i+1].colorval = (this.array[c][i].colorval+d)/2;
          t += this.array[c][i+1].colorval;
          n++;
        }
        this.array[c][i].colorval = (t+this.array[c][i].colorval)/(n+2);

      }
      c++;
    }
  }
  
  show() {
    for(let layer of this.array) {
      for (let dot of layer) {
        dot.show();
      }
    }
  }
}

var dots = [];
let s = window.innerHeight;
let ss = 1;
function setup() {
  createCanvas(s,s);
  dots = new DotArray(s,s/ss);
}

function draw() {
  background(172);
  let x = mouseX;
  let y = mouseY;
  // console.log(x,y)
  if (x < width && y < height && x % ss == 0 && y % ss == 0 && x != 0 && y != 0) {
      dots.array[x][y].colorval = (255+dots.array[x][y].colorval)/2;
  }
  dots.update();
  dots.show();
}
