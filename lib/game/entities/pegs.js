ig.module(
    'game.entities.pegs'
)
.requires(
    'impact.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityPegs = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 340, y: 226},
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/peg-formation.png', 340, 226 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );
//        this.addAnim( 'jump', 0.1, [3,4,5] );
        
        this.gravityFactor = 0;
        this.bounciness = 1;
        
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