var boy = document.getElementById("boy");
var idleImageNumber = 1;
var idleAnimationNumber = 0;

function idleAnimation() {
  idleImageNumber = idleImageNumber + 1;
  if (idleImageNumber == 11) {
    idleImageNumber = 1;
  }

  boy.src = "resources/Idle (" + idleImageNumber + ").png";
}

function idleAnimationStart() {
  idleAnimationNumber = setInterval(idleAnimation, 200);
}

var runImageNumber = 1;
var runAnimationNumber = 0;
function runAnimation() {
  runImageNumber = runImageNumber + 1;
  if (runImageNumber == 11) {
    runImageNumber = 1;
  }
  boy.src = "resources/Run (" + runImageNumber + ").png";
}

function runAnimationStart() {
  runAnimationNumber = setInterval(runAnimation, 100);
  clearInterval(idleAnimation);
}
var jumpImageNumber = 1;
var jumpAnimationNumber = 0;
var boyMarginTop = 577;

function jumpAnimation() {
  jumpImageNumber = jumpImageNumber + 1;

  if (jumpImageNumber <= 6) {
    boyMarginTop = boyMarginTop - 35;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber >= 7) {
    boyMarginTop = boyMarginTop + 35;
    boy.style.marginTop = boyMarginTop + "px";
  }

  if (jumpImageNumber == 11) {
    jumpImageNumber = 1;
    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = 0;
    runImageNumber = 0;
    runAnimationStart();
  }
  boy.src = "resources/Jump (" + jumpImageNumber + ").png";
}

function jumpAnimationStart() {
  clearInterval(idleAnimationNumber);
  runImageNumber = 0;
  clearInterval(runAnimationNumber);
  jumpAnimationNumber = setInterval(jumpAnimation, 100);
}

function keyCheck(event) {
  //   alert(event.which);
  //   enter = 13
  // space = 32

  var keyCode = event.which;
  if (keyCode == 13) {
    if (runAnimationNumber == 0) {
      runAnimationStart();
    }
    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }
    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }
  if (keyCode == 32) {
    if (jumpAnimationNumber == 0) {
      jumpAnimationStart();
    }
    if (moveBackgroundAnimationId == 0) {
      moveBackgroundAnimationId = setInterval(moveBackground, 100);
    }
    if (boxAnimationId == 0) {
      boxAnimationId = setInterval(boxAnimation, 100);
    }
  }
}

var backgroundImagePositionX = 0;
var moveBackgroundAnimationId = 0;
var score = 0;

function moveBackground() {
  backgroundImagePositionX = backgroundImagePositionX - 20;
  document.getElementById("background").style.backgroundPositionX =
    backgroundImagePositionX + "px";

  score = score + 1;

  document.getElementById("score").innerHTML = score;
}

// set brackets
var boxMarginLeft = 1900;

function createBox() {
  for (var i = 0; i <= 10; i++) {
    var box = document.createElement("div");
    box.className = "box";
    document.getElementById("background").appendChild(box);
    box.style.marginLeft = boxMarginLeft + "px";
    box.id = "box" + i;

    // boxMarginLeft = boxMarginLeft + 500;

    if (i < 5) {
      boxMarginLeft = boxMarginLeft + 2000;
    }
    if (i >= 5) {
      boxMarginLeft = boxMarginLeft + 1000;
    }
  }
}

var boxAnimationId = 0;

function boxAnimation() {
  for (var i = 0; i < 10; i++) {
    var box = document.getElementById("box" + i);
    var currentMarginLeft = getComputedStyle(box).marginLeft;
    var newMarginLeft = parseInt(currentMarginLeft) - 35;
    box.style.marginLeft = newMarginLeft + "px";

    if ((newMarginLeft >= -110) & (newMarginLeft <= 110)) {
      if (boyMarginTop > 550) {
        clearInterval(boxAnimationId);

        clearInterval(runAnimationNumber);
        runAnimationNumber = -1;

        clearInterval(jumpAnimationNumber);
        jumpAnimationNumber = -1;

        clearInterval(moveBackgroundAnimationId);
        moveBackgroundAnimationId = -1;

        deadAnimationNumber = setInterval(boyDeadAnimation, 100);
      }
    }
  }
}

//dead Animation
var deadImageNumber = 1;
var deadAnimationNumber = 0;
function boyDeadAnimation() {
  deadImageNumber = deadImageNumber + 1;
  if (deadImageNumber == 11) {
    deadImageNumber = 10;
  }
  document.getElementById("end").style.visibility = "visible";
  document.getElementById("endscore").innerHTML = score;

  boy.src = "resources/Dead (" + deadImageNumber + ").png";
}

function reload() {
  location.reload();
}
