ig.module(
    'game.entities.random-number'
)
.requires(
    'impact.entity',
    'game.bm'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityRandomNumber = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    font: new ig.Font('media/white-font.png'),
    bucketNumber: 0,
    firebaseRoot: bm.firebaseRoot,
    size: {x:50, y:50},
    
    init: function( x, y, settings ) {
        
        this.gravityFactor = 0;
        // Call the parent constructor
        this.parent( x, y, settings );
        this.zIndex = 99;
        
        //var self = this;
        
        this.bucketNumber = Math.floor((Math.random()*6)+1);
        var numbersRef = new Firebase(this.firebaseRoot + 'game/numbers');
        
        // Get number from firebase and display it
        numbersRef.on('child_added', function(s) {
            this.bucketNumber = s.val().bucketNumber;
                
                console.log(this.bucketNumber);
        });
        
        this.bucketNumber = Math.floor((Math.random()*6)+1);
    },
    
    check: function(other) {
        
        // Push number to firebase
        var numbersRef = new Firebase(this.firebaseRoot + 'game/numbers');
        numbersRef.push({bucketNumber: this.bucketNumber});
        
        console.log('collide!');
    },
    
    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    },
    
    draw: function() {
        
        this.parent();
        
        this.font.draw(this.bucketNumber, this.pos.x + 25, this.pos.y - 10, ig.Font.ALIGN.CENTER);
    },
});

});