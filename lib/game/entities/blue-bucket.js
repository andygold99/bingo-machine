ig.module(
    'game.entities.blue-bucket'
)
.requires(
    'impact.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityBlueBucket = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    size: {x: 55, y: 47},
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/blue-bucket.png', 55, 47 ),
    
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