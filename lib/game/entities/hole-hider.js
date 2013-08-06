ig.module(
    'game.entities.hole-hider'
)
.requires(
    'impact.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityHoleHider = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    size: {x: 31, y: 59},
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/hole-hider.png', 31, 59 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );
        
        this.gravityFactor = 0;
        this.bounciness = 0;
        this.vel.x = 0;
        this.vel.y = 0;
        this.maxVel.x = 0;
        this.maxVel.y = 0;
        this.zIndex = 99;
        
        // Call the parent constructor
        this.parent( x, y, settings );
    },
    
    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    }
});

});