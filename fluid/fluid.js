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
      for (let i = 1; i<size; i++) {
        let t = 0;
        let n = 0;
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
        if(this.array[c][i].colorval > 128) {
          this.array[c][i].colorval += 128;
        } else  {
          //
        }

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

// function mousePressed() {
//   let x = mouseX;
//   let y = mouseY;
//   if (dots.array[x][y].colorval == 0) {
//     dots.array[x][y].colorval = 255;
//   }
//   if (dots.array[x][y].colorval == 255) {
//     dots.array[x][y].colorval = 0;
//   }
// }

function setup() {
  let s = 142;
  createCanvas(s,s);
  dots = new DotArray((width+height)/2,(width+height)/2);
}

function draw() {
  background(172);
  let x = mouseX;
  let y = mouseY;
  // console.log(x,y)
  if (x < width && y < height) {
    
      dots.array[x][y].colorval = 255; 
  }
  dots.update();
  dots.show();
}
