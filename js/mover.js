let canvas, ctx, pageWidth, pageHeight, globalRadius, initialAngle, currentFrame, totalFrames, increment

currentFrame = 0;
totalFrames = 15000;
increment = Math.PI * 2 / totalFrames

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

initialAngle = (Math.random() * (1 - 0.6) + 0.6) * Math.PI / 2

function init () {

  pageWidth = getWidth();
  pageHeight = getHeight();
  globalRadius = (pageWidth + pageHeight) / 200;

  canvas = document.getElementById('backCanvas');
  ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  dotPositions = dotCreater(initialAngle, 1000);
  allDotsDraw(dotPositions);

  
  window.requestAnimationFrame(animateDot);

}

document.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', resizeDots)

// Function to find the initial position of each dot
function initialPositionFinder(angle, index) {
  
  // angle in radians

  // Find the radius of the dot
  radius = 1 + Math.ceil((angle * index) / (2 * Math.PI)) * globalRadius / 2;

  // Find the resulting angle of the dot
  theta =  (angle * index) % (2 * Math.PI);

  // Find x and y coord
  x = radius * Math.cos(theta);
  y = radius * Math.sin(theta);

  // Create an array to return
  returnArray = [x, y, radius];

  return returnArray;

}

// Function to update the position of each dot
function updatePositionFinder(angle, index) {
  
  // angle in radians

  // Find the radius of the dot
  radius = 1 + Math.ceil((initialAngle * index) / (2 * Math.PI)) * globalRadius / 2;

  // Find the resulting angle of the dot
  theta =  (angle * index) % (2 * Math.PI);

  // Find x and y coord
  x = radius * Math.cos(theta);
  y = radius * Math.sin(theta);

  // Create an array to return
  returnArray = [x, y, radius];

  return returnArray;

}

// Function to create the dots
function dotCreater(angle, numberDots) {

  // angle in radians

  // Initialise an array with positions
  positions = [];

  // Create an array with points for each dot
  for (i = 0; i < numberDots; i++) {
    positions.push(initialPositionFinder(angle, i));
  }

  // Return array of positions
  return positions;

}

// Function to create the dots
function dotUpdater(angle, numberDots) {

  // angle in radians

  // Initialise an array with positions
  positions = [];

  // Create an array with points for each dot
  for (i = 0; i < numberDots; i++) {
    positions.push(updatePositionFinder(angle, i));
  }

  // Return array of positions
  return positions;

}

// Function to draw a dot
function dotDrawer(position) {

  ctx.beginPath()
  ctx.arc((position[0] + (pageWidth / 2)), (position[1] + (pageHeight / 2)), globalRadius, 0, 2 * Math.PI, false) 
  ctx.fill()
  ctx.restore()

}

// Function to draw all dots
function allDotsDraw(positions) {
  for (i = 0; i < positions.length; i++){
    dotDrawer(positions[i])
  }
}

// Function to animate dot
function animateDot() {
  
  ctx.clearRect(0, 0, pageWidth, pageHeight)

  currentFrame += 1;
  if (currentFrame == totalFrames) {
    currentFrame = 0;
  }

  dotPositions = dotUpdater(initialAngle + currentFrame * increment, 1000)
    
  allDotsDraw(dotPositions)

  setTimeout(function(){
    window.requestAnimationFrame(animateDot);
  }, 80);
}

// Function to resize dots on window resize
function resizeDots() {
  pageWidth = getWidth();
  pageHeight = getHeight();
  globalRadius = (pageWidth + pageHeight) / 200;

  canvas = document.getElementById('backCanvas');
  ctx = canvas.getContext('2d');
  ctx.canvas.width  = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}