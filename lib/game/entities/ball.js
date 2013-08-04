ig.module(
    'game.entities.ball'
)
.requires(
    'impact.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityBall = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 20, y: 20},
    speed: 600,
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/ball.png', 20, 20 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );
        
        // Call the parent constructor
        this.parent( x, y, settings );
        this.maxVel.x = this.maxVel.y = this.speed;
        this.bounciness = 0.6;
        this.zIndex = 10;
        
        this.ballPosRef = new Firebase('https://bingomachine.firebaseio.com/game/ball');
    },
    
    moveBall: function(posX, posY) {
      this.pos.x = posX;
      this.pos.y = posY;
    },
    
    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        
        if (this.pos.y < 800) {
            this.ballPosRef.update({x: this.pos.x, y: this.pos.y});
        }
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    }
});

});