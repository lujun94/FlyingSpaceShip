function Visual(){
    this.position;
};
Visual.prototype.setPosition = function(p){
    this.position = p;
};

Visual.prototype.getPosition = function(){
    return this.position;
};

Visual.prototype.draw = function(g){
    
};

function Star(){
    this.size; 
    this.color;
}

Star.prototype = new Visual();

Star.prototype.setSize = function(s){
    this.size = s;
};

Star.prototype.getSize = function(){
    return this.size;
};

Star.prototype.setColor = function(c){
    this.color = c;
}

Star.prototype.draw = function(g){
    g.beginPath();
    g.arc(this.position.getX(), this.position.getY(), this.size, 0, 2*Math.PI);
    g.fillStyle = this.color;
    g.fill();
    g.strokeStyle = this.color;
    g.stroke();
};

function StarField(){
    this.speed;
    this.density;
    this.starSize;
    this.buffer;
    this.bufferG;
    this.stars = [];
    this.drawOnBuffer = true;
    this.startX = 0;
}

StarField.prototype = new Visual();


StarField.prototype.setSpeed = function(s){
    this.speed = s;
}

StarField.prototype.setDensity = function(d){
    this.density = d;
}

StarField.prototype.setStarSize = function(s){
    this.starSize = s;
}

StarField.prototype.setDistance = function(s, d, size){
    this.setSpeed(s);
    this.setDensity(d);
    this.setStarSize(size);
}
StarField.prototype.setStarWidth = function(s){
    this.starWidth = s;
}

StarField.prototype.setStarHeight = function(s){
    this.starHeight = s;
}

StarField.prototype.generateRandomPosition = function(){
    var x = Math.round(Math.random()*(this.buffer.width/2));
    var y = Math.round(Math.random()*(this.buffer.height));
    return new Point(x, y);
}

StarField.prototype.createStars = function(){
    for(var i = 0 ; i < this.density; i++){
        var position = this.generateRandomPosition();
        var color = this.generateColor();
        var star = new Star();
        star.setColor(color);
        star.setPosition(position);
        star.setSize(this.starSize);
        this.stars.push(star);
        
        var star2 = new Star();
        star2.setColor(color);
        var x = position.getX() + this.buffer.width/2;
        var newp = new Point(x, position.getY());
        star2.setPosition(newp);
        star2.setSize(this.starSize);
        this.stars.push(star2);
    }
}

StarField.prototype.generateColor = function(){
    var colorArray = ["white", "#82CAFA", "#FFFFC2", "#9F000F"];
    var color;
    var num = Math.random()*10;
    if(num <=7){
       color = colorArray[0]; 
    } else if (num < 9){
       color = colorArray[1];        
    } else if (num < 9.5){
       color = colorArray[2];        
    } else if (num < 10){
       color = colorArray[3];        
    }
    return color;
    
    
}

StarField.prototype.createBuffer = function(){
    this.buffer = document.createElement('canvas');
    var canvas = document.getElementById('canvas');
    
    this.buffer.width = canvas.width*2;
    this.buffer.height = canvas.height;
    
    this.bufferG = this.buffer.getContext('2d');
    
    this.createStars();
    
    for(var i=0 ; i < this.stars.length; i++){
        this.stars[i].draw(this.bufferG);
    }
};

StarField.prototype.draw = function(g){
    if(this.drawOnBuffer === true){
        this.createBuffer();   
        this.drawOnBuffer = false;
    };
    
    g.save();
    g.translate(this.startX, 0);   
    
    
    g.drawImage(this.buffer, 0, 0);    
    g.restore();
    
    if( this.startX > (0 - this.buffer.width/2)){
        this.startX -= this.speed;
    } else {
        this.startX = 0;
    }
    
    

}

function Spaceship(){
    this.url;
    
}
Spaceship.prototype = new Visual();
Spaceship.prototype.setURL = function(u){
    this.url = u;
}
Spaceship.prototype.draw = function(g){
    var backgroundImage = new Image();
    backgroundImage.src = this.url;
    g.drawImage(backgroundImage, 300, 300);
}

function ElementManager(){
    this.elements = [];
}

ElementManager.prototype.addElement = function(e){
    this.elements.push(e);
}
ElementManager.prototype.draw = function(g){
    for(var i = 0; i < this.elements.length; i++){
        this.elements[i].draw(g);
    }
}

