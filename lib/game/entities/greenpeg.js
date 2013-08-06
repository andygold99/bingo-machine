ig.module(
    'game.entities.greenpeg'
)
.requires(
    'impact.entity',
    'game.bm'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityGreenpeg = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    
    // Set font
    font: new ig.Font('media/green-font.png'),
    timer: 100,
    firebaseRoot: bm.firebaseRoot,
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/green-peg-states.png', 41, 41 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );

        this.gravityFactor = 0;
        this.bounciness = 0;
        this.vel.x = 0;
        this.vel.y = 0;
        this.maxVel.x = 0;
        this.maxVel.y = 0;
        this.size = {x:18, y:18};
        this.offset = {x:13, y:14};
        this.totalPoints = 0;
        this.lit = false;
        
        var myDataRef = new Firebase(this.firebaseRoot + 'game');
        
        // This checks for changes in the jackpot value and updates them in the jackpot entity
        myDataRef.on('value', function(s) {
            this.jackpot = s.child('jackpot').val(); // Gets jackpot value from firebase 
            this.totalPoints = this.jackpot;
        });
        
        // Call the parent constructor
        this.parent( x, y, settings );
    },
    
    check: function(other) {
        
        // Only light peg and show points once
        if (!this.lit) {
            this.lightUp();
            this.showPoints();
            this.lit = true;
        }
    },
    
    // Show peg points
    showPoints: function() {
        this.pointsLabel = true;
        this.timer = 100;
        this.totalPoints += 50;
        
        var myDataRef = new Firebase(this.firebaseRoot + 'game');
        var pegRef = new Firebase(this.firebaseRoot + 'game/pegs');
        pegRef.push({id: this.id, lit: 'true'});
        myDataRef.update({jackpot: this.totalPoints});
    },
    
    // Light up peg
    lightUp: function() {
        
        //if (!this.lit) {
                    this.addAnim('lit', 0.1, [1]);
                    this.currentAnim = this.anims.lit;
                    //this.lit = true;
                    
                    //console.log('yahoo!');
                //}
        
        var pegRef = new Firebase(this.firebaseRoot + 'game/pegs');
        pegRef.on('child_added', function(s) {
            this.pegId = s.val().id;
            console.log(this.pegId);
            
            if (this.id === this.pegId) {
                
                if (!this.lit) {
                    this.addAnim('lit', 0.1, [1]);
                    this.currentAnim = this.anims.lit;
                    this.lit = true;
                    
                    //console.log('yahoo!');
                }
            }
        });
    },
    
    // Fade out points when hitting the pegs
    fadeOutPoints: function() {
        if (this.pointsLabel) {
            --this.timer;
    
            if (this.timer < 30 ) {
                this.font.alpha = 1 * (this.timer/30);
                this.pointsLabel = false;
            }
            
            
        }
    },
    
    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.

        this.fadeOutPoints();
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    },
    
    draw: function() {
        // Draw all entities and backgroundMaps
		this.parent();
        
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
       
       if (this.pointsLabel) {
            this.font.draw('50pts', this.pos.x, this.pos.y, ig.Font.ALIGN.RIGHT);
       }
	}
});

});