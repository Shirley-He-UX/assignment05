var mImg;
var mSong;
var mAmplitude;
var mCanvas;
var fft;
var ctx;

function preload(){
  mSong = loadSound('./assets/street.mp3');
  mImg = loadImage('./assets/Lena_Soderberg.png');

}

function setup() {
  angleMode(DEGREES);
  mCanvas = createCanvas(windowWidth,windowHeight);
  mAmplitude = new p5.Amplitude();//振幅
  mSong.loop();
  mSong.playMode('sustain');

  fft = new p5.FFT();//FFT (Fast Fourier Transform快速傅里叶变换)
  mSong.connect(fft);
  mSong.rate(1.1);

  background(255,255,255,20);
  mCanvas.mouseClicked(function(){
      if(mSong.isPlaying()==true){
          mSong.pause();
      }else{
          mSong.play();
      } 
  });
}

function draw() {

  background(10,0,0,10);
  
  translate(width/2,height/2);

  rotate(frameCount/4);
  
  
    
  var level = mAmplitude.getLevel(); 
  var g = map(level,0,1,0,windowWidth/50);
  var waveform =fft.waveform();
  noFill();
  stroke(255);
  strokeWeight(g);
  
   for (var i = 0; i< 60; i++){
    var y = map(waveform[i],-1,1,0,width*6/7);
    point(width/6,y);
    rotate(6);
  }
  
  
  
  
  var spectrum =fft.analyze();
  push();
  rotate(frameCount);
  for(var i = 0;i<36; i++){
    var h = map(spectrum[i], 0, 255, windowWidth/10, windowWidth*3/10);
    var myPixel= mImg.get(i*windowWidth/72,windowWidth/3);
    fill(myPixel);
    noStroke();
    rect(0,0,1,h);
    rotate(10);
  }
  pop();
  

  push();
  // mImg.filter("threshold",0.3);
  //mImg.filter("gray");
  image(mImg,-windowWidth/8,-windowWidth/8,windowWidth/4,windowWidth/4);
  pop();
  noFill();
  stroke(10);
  strokeWeight(windowWidth/18);
  ellipse(0,0,windowWidth/4);
  // var level = mAmplitude.getLevel(); //在调用时返回单个幅度读数。对于连续读数，请在绘制循环中运行
  // var radius = map(level,0,1,windowWidth/6,width);
   
  // var myPixel= mImg.get(radius,width/2);
  // //fill(myPixel);
  // noFill();
  // stroke(myPixel);
  // strokeWeight(6);
  // ellipse(0,0,radius*1.4);
}


function keyPressed() {
  mSong.playMode('restart');
  mSong.play();
}

function windowResized(){
  resizeCanvas(windowWidth,windowWidth);
}
