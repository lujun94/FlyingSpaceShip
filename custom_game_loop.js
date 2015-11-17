// <editor-fold desc="CustomGameLoop">
function CustomGameLoop() {
    this.elementManager = new ElementManager();
}

CustomGameLoop.prototype = new GameLoop();

CustomGameLoop.prototype.generateFakePointData = function(f, n, color) {
    var returnData = new PointData();
    returnData.setColor(color);
    var step = 1000 / n;
    var randomSpread = 200;
    for (var i = 0; i < n; i++) {
        var x = i * step;
        var point = 
                new Point(
                    x + (Math.random() * randomSpread - randomSpread / 2), 
                    f(x) + (Math.random() * randomSpread - randomSpread / 2));
        returnData.addPoint(point);
    }
    return returnData;
}

CustomGameLoop.prototype.initialize = function(canvas) {
    GameLoop.prototype.initialize.call(this, canvas);
    // add initialization here
}

CustomGameLoop.prototype.draw = function(g) {
    g.fillStyle = "black";
    g.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.elementManager.draw(g);
//    var backgroundImage = new Image();
//    backgroundImage.src = "voyager.png";
//    g.drawImage(backgroundImage, 300, 300);
    // add drawing here
}
CustomGameLoop.prototype.addElement = function(e){
    this.elementManager.addElement(e);
}
// </editor-fold>

function initialize() {
    var customGameLoop = new CustomGameLoop();
    customGameLoop.initialize(document.getElementById("canvas"));
    
    var starField = new StarField();   
    starField.setDistance(0.5, 800, 0.1);
    //starField.createStars();
    customGameLoop.addElement(starField); 
    
    var starField2 = new StarField();   
    starField2.setDistance(1, 500, 1);
    //starField2.createStars();
    customGameLoop.addElement(starField2); 
    
    var voyager = new Spaceship();
    voyager.setURL("voyager.png");
    
    customGameLoop.addElement(voyager);
    
    var starField3 = new StarField();   
    starField3.setDistance(1.5, 100, 2);
    //starField3.createStars();
    customGameLoop.addElement(starField3); 
    
}

window.onload = initialize;


