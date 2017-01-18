import '../css/style.css';
import $ from 'jquery';
import p5 from 'p5';

function sketch(p){
  var canvasWidth, currentCanvasWdith, currentCanvasHeight, scaleValue, centerT;

  p.responsive_canvas = () => {
    p.translate((1 - scaleValue)*currentCanvasWdith/2, (1 - scaleValue)*currentCanvasHeight/2);
    p.scale(scaleValue, scaleValue);
  }

  p.preload = () => {
    currentCanvasWdith = $('#sketch').width();
    currentCanvasHeight = $('#sketch').height();

    if(currentCanvasWdith < 640){
      scaleValue = currentCanvasWdith/640;
    } else{
      scaleValue = currentCanvasWdith/canvasWidth;
    }
  }

  p.setup = () => {
    p.createCanvas(currentCanvasWdith, currentCanvasHeight)
    .id('canvas')
    .parent('sketch');

    p.noLoop();
  }

  p.draw = () => {
    p.responsive_canvas();

    p.stroke(0);
    p.noFill();

    let point = [
      { 'x': p.width/2, 'y': p.height/2 - 150*p.sqrt(3) },
      { 'x': p.width/2 - 300, 'y': p.height/2 + 150*p.sqrt(3) },
      { 'x': p.width/2 + 300, 'y': p.height/2 + 150*p.sqrt(3) }
    ]
    p.triangle(point[0].x, point[0].y, point[1].x, point[1].y, point[2].x, point[2].y)

    p.drawSierpinskiTriangle(point, 6);
  }

  p.drawSierpinskiTriangle = (point, num) => {
    if(num != 0){
      p.triangle((point[0].x + point[1].x)/2, (point[0].y + point[1].y)/2, (point[1].x + point[2].x)/2,
      (point[1].y + point[2].y)/2, (point[2].x + point[0].x)/2, (point[2].y + point[0].y)/2);

      let topTrianglePoint = [
        { 'x': point[0].x, 'y': point[0].y },
        { 'x': (point[0].x + point[1].x)/2, 'y': (point[0].y + point[1].y)/2 },
        { 'x': (point[2].x + point[0].x)/2, 'y': (point[2].y + point[0].y)/2 },
      ]
      let leftTrianglePoint = [
        { 'x': (point[0].x + point[1].x)/2, 'y': (point[0].y + point[1].y)/2 },
        { 'x': point[1].x, 'y': point[1].y },
        { 'x': (point[1].x + point[2].x)/2, 'y': (point[1].y + point[2].y)/2 }
      ]
      let rightTrianglePoint = [
        { 'x': (point[2].x + point[0].x)/2, 'y': (point[2].y + point[0].y)/2 },
        { 'x': (point[1].x + point[2].x)/2, 'y': (point[1].y + point[2].y)/2 },
        { 'x': point[2].x, 'y': point[2].y }
      ]
      p.drawSierpinskiTriangle(topTrianglePoint, num - 1);
      p.drawSierpinskiTriangle(leftTrianglePoint, num - 1);
      p.drawSierpinskiTriangle(rightTrianglePoint, num - 1);
    }
  }

  p.windowResized = () => {
    currentCanvasWdith = $('#sketch').width();
    currentCanvasHeight = $('#sketch').height();
    p.resizeCanvas(currentCanvasWdith, currentCanvasHeight);

    if(currentCanvasWdith < 640){
      scaleValue = currentCanvasWdith/640;
    } else{
      scaleValue = currentCanvasWdith/canvasWidth;
    }
  }
}

var app = new p5(sketch, $('body')[0]);
