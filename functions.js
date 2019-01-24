/**
 * Main functionality file
 * @author Michal Jarmocik
 */

//constants
const WIDTH = 1200; //canvas width and height
const HEIGHT = 600;
const TORSO_COLOR = '#C2B28F';  //Dog's torso colour
const ACCENT_COLOR = '#E4D8B4'; //Dog's second colour
const BG_COLOR = '#272324';     //Background colour

//setup the canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//Enum's for all possible Dog positions
var PositionEnums = {
    STANDING: 0,
    REACHING: 1,
    LYING: 2,
    SITTING: 3,
    SLEEPING: 4
};

//set up default position
var currentPosition = PositionEnums.STANDING;

//Enum's for all Dog parts
var PartEnums = {
    TORSO: 0,
    FRONT_LEG: 1,
    FRONT_LEG_BACK: 2, //only visible when sitting / shaking paw
    REAR_LEG: 3,
    REAR_LEG_BACK: 4, //only visible when sitting
    TAIL: 5,
    HEAD: 6
};

//an array to store the body parts
bodyParts = [];

///////////////////////////////////////////
//Creating all body parts objects and storing them in an array
//Every part has width and height
//Every part has a method drawPart() to draw itself on canvas, depending on dog's position
//Every part is drawn relatively to torso
///////////////////////////////////////////

//torso
bodyParts[PartEnums.TORSO] = {
    width: 200,
    height: 100,
    x: WIDTH / 2,
    y: 400,
    drawPart: function () {
        context.fillStyle = TORSO_COLOR;
        switch (currentPosition) {
            case PositionEnums.STANDING:
            case PositionEnums.LYING:
            case PositionEnums.SLEEPING:
                context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
                break;
            case PositionEnums.REACHING:
            case PositionEnums.SITTING:
                context.fillRect(this.x - this.height / 2, this.y - this.width / 2, this.height, this.width);
                break;
            default:
               break;
        }
    }
};

//front leg
bodyParts[PartEnums.FRONT_LEG] = {
    width: 30,
    height: 100,
    isShaking: false,
    drawPart: function () {
        context.fillStyle = ACCENT_COLOR;
        switch (currentPosition) {
            case PositionEnums.STANDING:
                this.isShaking = false;
                context.fillRect((bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 2.5), bodyParts[PartEnums.TORSO].y, this.width, this.height);
                break;
            case PositionEnums.REACHING:
                context.save();
                context.translate(bodyParts[PartEnums.TORSO].x, bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].width / 2.4);
                context.rotate(140 * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.height);
                context.restore();
                this.isShaking = false;
                break;
            case PositionEnums.LYING:
            case PositionEnums.SLEEPING:
                context.save();
                context.translate(bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 2.5, bodyParts[PartEnums.TORSO].y);
                context.rotate(78 * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.height);
                context.restore();
                this.isShaking = false;
                break;
            case PositionEnums.SITTING:
                context.fillRect((bodyParts[PartEnums.TORSO].x - 40), bodyParts[PartEnums.TORSO].y, this.width, this.height);
                this.isShaking = false;
                break;
            default:
                break;
        }
    }
};

//front back leg (only visible when sitting) or shaking paw
bodyParts[PartEnums.FRONT_LEG_BACK] = {
    width: 30,
    height: 50,
    drawPart: function () {
        context.fillStyle = ACCENT_COLOR;
        switch (currentPosition) {
            case PositionEnums.SITTING:
                context.fillRect(bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].height / 2 - this.width, bodyParts[PartEnums.TORSO].y + bodyParts[PartEnums.TORSO].height / 2, this.width, this.height);
                break;
            case PositionEnums.STANDING:
                context.fillRect((bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 2.5), bodyParts[PartEnums.TORSO].y + 50, this.width, this.height);
                break;
            default:
                break;
        }
    }
};

//rear leg
bodyParts[PartEnums.REAR_LEG] = {
    width: 30,
    height: 100,
    drawPart: function () {
        context.fillStyle = ACCENT_COLOR;
        switch (currentPosition) {
            case PositionEnums.STANDING:
                context.fillRect((bodyParts[PartEnums.TORSO].x + bodyParts[PartEnums.TORSO].width / 2.5) - this.width, bodyParts[PartEnums.TORSO].y, this.width, this.height);
                break;
            case PositionEnums.REACHING:
                context.fillRect(bodyParts[PartEnums.TORSO].x - this.width / 2, bodyParts[PartEnums.TORSO].y + this.height / 1.6, this.width, this.height);
                break;
            case PositionEnums.LYING:
            case PositionEnums.SLEEPING:
                context.save();
                context.translate(bodyParts[PartEnums.TORSO].x + bodyParts[PartEnums.TORSO].width / 2.5, bodyParts[PartEnums.TORSO].y + 27);
                context.rotate(-77 * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.height);
                context.restore();
                break;
            case PositionEnums.SITTING:
                context.fillRect((bodyParts[PartEnums.TORSO].x + 10), bodyParts[PartEnums.TORSO].y, this.width, this.height);
                break;
            default:
                break;
        }
    }
};

//rear back leg (only visible when sitting)
bodyParts[PartEnums.REAR_LEG_BACK] = {
    width: 30,
    height: 50,
    drawPart: function () {
        context.fillStyle = ACCENT_COLOR;
        switch (currentPosition) {
            case PositionEnums.SITTING:
                context.fillRect(bodyParts[PartEnums.TORSO].x + bodyParts[PartEnums.TORSO].height / 2, bodyParts[PartEnums.TORSO].y + bodyParts[PartEnums.TORSO].height / 2, this.width, this.height);
                break;
            default:
                break;
        }
    }
};

//tail
bodyParts[PartEnums.TAIL] = {
    width: 15,
    height: 80,
    drawPart: function () {
        context.fillStyle = ACCENT_COLOR;
        switch (currentPosition) {
            case PositionEnums.STANDING:
            case PositionEnums.LYING:
            case PositionEnums.SLEEPING:
                context.save();
                context.translate(bodyParts[PartEnums.TORSO].x + bodyParts[PartEnums.TORSO].width / 2.4, bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].height / 2.8);
                context.rotate(-40 * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.height);
                context.restore();
                break;
            case PositionEnums.REACHING:
                context.save();
                context.translate(bodyParts[PartEnums.TORSO].x + bodyParts[PartEnums.TORSO].height / 3, bodyParts[PartEnums.TORSO].y + bodyParts[PartEnums.TORSO].width / 2.8);
                context.rotate(-30 * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.height);
                context.restore();
                break;
            case PositionEnums.SITTING:
                break;
            default:
                break;
        }
    }
};

//head with ears
bodyParts[PartEnums.HEAD] = {
    width: 80,
    x: bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 1.2,
    y: bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].height,
    rotation: 0,
    drawPart: function () {
        //draws the head, depending from position
        context.fillStyle = ACCENT_COLOR;
        switch (currentPosition) {
            case PositionEnums.STANDING:
            case PositionEnums.LYING:
                this.x = bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 1.2;
                this.y = bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].height;
                this.rotation = 0;
                context.fillRect(this.x, this.y, this.width, this.width);
                break;
            case PositionEnums.REACHING:
                this.x = bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].height / 2.8;
                this.y = bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].width / 1.1;
                this.rotation = 30;
                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.rotation * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.width);
                break;
            case PositionEnums.SITTING:
                this.x = bodyParts[PartEnums.TORSO].x - this.width / 2;
                this.y = bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].width / 1.2;
                this.rotation = 0;
                context.fillRect(this.x, this.y, this.width, this.width);
                break;
            case PositionEnums.SLEEPING:
                this.x = bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 1.2;
                this.y = bodyParts[PartEnums.TORSO].y - bodyParts[PartEnums.TORSO].height / 3.2;
                this.rotation = -45;
                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.rotation * Math.PI / 180);
                context.fillRect(0, 0, this.width, this.width);
                break;
            default:
                break;
        }
        //also, drawDog the ears
        if (this.rotation != 0) {
            this.x = 0;
            this.y = 0;
        }
        context.fillStyle = TORSO_COLOR;
        context.fillRect(this.x, this.y - 26, 18, 26);
        context.fillRect(this.x + 62, this.y - 26, 18, 26);
        context.restore();
    }
};

//A function to drawDog every part
function drawDog() {
    for (var i = 0; i < 7; i++) {
        bodyParts[i].drawPart();
    }
}

//Function that draws some background on canvas
function drawBackground() {
    //drawShadow();                                       //drawDog shadow beneath dog first
    context.fillStyle = BG_COLOR;
    context.fillRect(0, 0, WIDTH, 500);        //wipe picture above shadow
    context.fillStyle = '#83B799';
    context.fillRect(0, 500, WIDTH, 2);       //drawDog horizontal ground line
};

//Wipes the image
function wipe() {
    context.fillStyle = BG_COLOR;
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

//Function that changes position of dog and draws it again
changePosition = function (positionEnum) {
    context.restore();
    currentPosition = positionEnum;
    wipe(); //wipe all the image
    drawBackground();   //drawDog the background
    //change torso y position
    if (currentPosition === PositionEnums.STANDING || currentPosition === PositionEnums.SITTING)
        bodyParts[PartEnums.TORSO].y = 400;
    else if (currentPosition === PositionEnums.SLEEPING || currentPosition === PositionEnums.LYING)
        bodyParts[PartEnums.TORSO].y = 450;
    else
        bodyParts[PartEnums.TORSO].y = 338;

    drawDog(); //draw the dog
};


//Programming the buttons
var standUpButton = document.getElementById('standUp');
var sitDownButton = document.getElementById('sitDown');
var sleepButton = document.getElementById('sleep');
var resetButton = document.getElementById('reset');

standUpButton.addEventListener("click", function () {
    if (!isAnimating)
        changePosition(PositionEnums.STANDING)
});
sitDownButton.addEventListener("click", function () {
    if (!isAnimating)
        changePosition(PositionEnums.SITTING)
});
sleepButton.addEventListener("click", function () {
    if (!isAnimating)
        changePosition(PositionEnums.SLEEPING)
});
resetButton.addEventListener("click", function () {
    if (!isAnimating) {
        bodyParts[PartEnums.TORSO].x = WIDTH / 2;
        changePosition(PositionEnums.STANDING);
    }
});
////////////////////////////////////////////////

//Programming the  on canvas clicks
//If clicked above - reach if standing/sitting or stand if lying/slipping
function checkAboveClick(pos) {
    if (currentPosition === PositionEnums.REACHING)
        return false;
    if (pos.y < 350 && pos.x > WIDTH / 2 - 240 && pos.x < WIDTH / 2 + 240) {
        if (currentPosition === PositionEnums.LYING || currentPosition === PositionEnums.SLEEPING)
            changePosition(PositionEnums.STANDING);
        else if (pos.y < 260)
            changePosition(PositionEnums.REACHING);
        return true;
    }
    return false;
}

//If clicked underneath - stand if reaching or lie if standing / sitting
function checkUnderClick(pos) {
    if (currentPosition === PositionEnums.SLEEPING || currentPosition === PositionEnums.LYING)
        return false;
    if (pos.y > 500 && pos.x > WIDTH / 2 - 240 && pos.x < WIDTH / 2 + 240) {
        if (currentPosition === PositionEnums.REACHING)
            changePosition(PositionEnums.STANDING);
        else
            changePosition(PositionEnums.LYING);
        return true;
    }
    return false;
}

//dog can shake paw when standing
function checkFrontLegClick(pos) {
    if (currentPosition === PositionEnums.STANDING) {
        let isShaking = bodyParts[PartEnums.FRONT_LEG].isShaking;
        if (!isShaking) {
            if (checkStandingFLC(pos)) {
                console.log("Leg clicked, shaking: " + isShaking);
                isAnimating = true;
                init();
                bodyParts[PartEnums.FRONT_LEG].isShaking = !isShaking;
                nextFrame();
            }
        }
    }
}

//check the click on front leg, return true if clicked, false if not
function checkStandingFLC(pos) {
    let legX = bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 2.5;
    let legY = bodyParts[PartEnums.TORSO].y;
    return pos.x >= legX && pos.x <= (legX + 30) && pos.y >= legY && pos.y <= legY + 100;
}

////////////////////////
//Leg animation
var requestId;
var rotationProgress;
var isAnimating; //buttons don't work when it's animating

//initialise the animation
function init() {
    context.save();
    context.translate(bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 2.5, bodyParts[PartEnums.TORSO].y);
    rotationProgress = 0;
}

//draw the leg
function leg() {
    context.fillStyle = ACCENT_COLOR;
    context.fillRect(0, 0, 30, 100);
}

//clear frame, draw background, draw dog except for the leg
function clear() {
    context.restore();
    wipe();
    drawBackground();
    for (var i = 0; i < 7; i++) {
        if (i == 1)
            continue;
        bodyParts[i].drawPart();
    }
    context.save();
    context.translate(bodyParts[PartEnums.TORSO].x - bodyParts[PartEnums.TORSO].width / 2.5, bodyParts[PartEnums.TORSO].y);
    context.rotate(rotationProgress * Math.PI / 180);
}

//update context rotation
function update() {
    context.rotate(3 * Math.PI / 180);
    rotationProgress += 3;
}

//clear and draw leg
function draw() {
    clear();
    leg();
}

//stop the animation
function stop() {
    if (requestId) {
        cancelAnimationFrame(requestId);
    }
    isAnimating = false;
}

function nextFrame() {
    requestId = requestAnimationFrame(nextFrame);
    if (rotationProgress >= 87)
        stop();
    update();
    draw();
}

/////////////////////////////////////////

//Get click position (code from lecture)
function getMouseXY(evt) {
    var boundingRect = canvas.getBoundingClientRect();
    var w = (boundingRect.width - WIDTH) / 2;
    var h = (boundingRect.height - HEIGHT) / 2;
    var offsetX = w + boundingRect.left;
    var offsetY = h + boundingRect.top;

    var mx = Math.round(evt.clientX - offsetX);
    var my = Math.round(evt.clientY - offsetY);

    return {x: mx, y: my};
}

//Call this function when click happened on canvas
function onCanvasClicked(evt) {
    var pos = getMouseXY(evt);

    //check click above - if correct then return, if not then check if underneath etc.
    if (checkAboveClick(pos))
        return;
    else if (checkUnderClick(pos))
        return;
    checkFrontLegClick(pos);
}

//Listen for clicks on canvas
canvas.addEventListener("click", onCanvasClicked);


///////////////////////////////////////////////////////
//draw staring point
drawBackground();
drawDog();