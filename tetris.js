
var world = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 11, 11, 0, 0, 0],
    [0, 0, 0, 11, 11, 0, 0, 0],
];
window.onload = function() {
function drawWorld() {
    document.getElementById("world").innerHTML = "";
    for(var y=0; y<world.length; y++) {
       //console.log(world[y]);
        for(var x=0; x<world[y].length; x++) {
           // console.log(world[y][x]);
           if(world[y][x] === 0) {
               document.getElementById("world").innerHTML += "<div class='empty'></div>";
            } else if(world[y][x] === 1 || world[y][x] === 11) {
                document.getElementById("world").innerHTML += "<div class='squareShape'></div>";
            }
            
        }
        document.getElementById("world").innerHTML += "<br>" 
    }
}
//freeze function
function freeze() {
    for(var y=0; y<world.length; y++){
        for(var x=0; x<world[y].length; x++) {
            if(world[y][x] > 0 && world[y][x] < 10) {
                world[y][x] = world[y][x] + 10;
            }
        }
    }

    checkLines();
    var ran = Math.floor(Math.random()*3)
    if(ran === 0) {
        world[0] = [0, 0, 0, 1, 1, 0, 0, 0];
        world[1] = [0, 0, 0, 1, 1, 0, 0, 0];
    } else if (ran === 1) {
        world[0] = [0, 0, 0, 1, 0, 0, 0, 0];
        world[1] = [0, 0, 0, 1, 0, 0, 0, 0];
        world[2] = [0, 0, 0, 1, 0, 0, 0, 0];
        world[3] = [0, 0, 0, 1, 0, 0, 0, 0];
    } else if (ran ===2) {
        world[0] = [0, 0, 0, 1, 1, 0, 0, 0];
        world[1] = [0, 0, 1, 1, 0, 0, 0, 0];
    }
    

}

function checkLines() {
    for(var y = 0; y<world.length; y++) {
        fullLine = true;
        for(var x = 0; x< world[y].length; x++) {
            if(world[y][x] < 10) {
                    fullLine = false;
            }
        }
        if(fullLine) {
            world.splice(y, 1);
            world.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0]);
            y --;
        }
    }
}


function moveShapesDown() {
    var canMove = true;
    for(var y=0; y<world.length; y++) {
        for(var x=0; x<world[y].length; x++){
            if(world[y][x] > 0 && world[y][x] < 10) {
                if(y === world.length-1 || world[y + 1][x] > 10) {
                    canMove = false;
                    freeze();
                }
            }
    }
}
    if(canMove) {
        for(var y = world.length-1; y>=0; y--) {
            for(var x=0; x<world[y].length; x++) {
                if(world[y][x] > 0 && world[y][x] < 10){
                    world[y+1][x] = world[y][x];
                    world[y][x] = 0;
                }
            }
        }
    }
}

function gameLoop() {
    console.log("game running");
    moveShapesDown();
    drawWorld();
    setTimeout(gameLoop, 1000);
}

function moveShapesLeft() {
    var canMove = true;
    for(var y=0; y<world.length; y++) {
        for(var x=0; x<world[y].length; x++){
            if(world[y][x] > 0 && world[y][x] < 10) {
                if(x === 0 || world[y][x - 1] > 10) {
                    canMove = false;
                }
            }
    }
}
if(canMove) {
    for(var y = world.length-1; y>=0; y--) {
        for(var x=0; x<world[y].length; x++) {
            if(world[y][x] > 0 && world[y][x] < 10){
                world[y][x-1] = world[y][x];
                world[y][x] = 0;
            }
        }
    }
}
}



function moveShapesRight() {
    var canMove = true;
    for(var y=0; y<world.length; y++) {
        for(var x=0; x<world[y].length; x++){
            if(world[y][x] > 0 && world[y][x] < 10) {
                if(x === 7 || world[y][x + 1] > 10) {
                    canMove = false;
                }
            }
    }
}
if(canMove) {
    for(var y = world.length-1; y>=0; y--) {
        for(var x=world[y].length; x>=0; x--) {
            if(world[y][x] > 0 && world[y][x] < 10){
                world[y][x+1] = world[y][x];
                world[y][x] = 0;
            }
        }
    }
}
}

document.onkeydown = function(e) {
    if(e.keyCode === 37) {
        moveShapesLeft();
    } else if (e.keyCode === 39) {
        moveShapesRight();
    } else if (e.keyCode === 40) {
        moveShapesDown();
    }
    drawWorld();
}

drawWorld();
gameLoop();

} 