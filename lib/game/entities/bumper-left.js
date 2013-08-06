ig.module(
    'game.entities.bumper-left'
)
.requires(
    'impact.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityBumperLeft = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    size: {x: 18, y: 11},
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/bumper-left.png', 18, 11 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );
        
        this.gravityFactor = 0;
        this.bounciness = 0.5;
        
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