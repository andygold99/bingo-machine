ig.module(
    'game.entities.jackpot'
)
.requires(
    'impact.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityJackpot = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.FIXED,
    font: new ig.Font('media/white-font.png'),
    total: 0,
    
    init: function( x, y, settings ) {
        
        this.gravityFactor = 0;
        // Call the parent constructor
        this.parent( x, y, settings );
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
        
        this.font.draw(this.total, this.pos.x, this.pos.y + 2, ig.Font.ALIGN.CENTER);
    },
});

});