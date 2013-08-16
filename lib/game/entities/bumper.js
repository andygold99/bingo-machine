ig.module(
    'game.entities.bumper'
)
.requires(
    'impact.entity',
    'plugins.box2d.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityBumper = ig.Box2DEntity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    size: {x: 25, y: 11},
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/bumper.png', 35, 11 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );
        
        this.gravityFactor = 0;
        this.bounciness = 0.5;
        this.offset = {x:7, y:0};
        
        // Call the parent constructor
        this.parent( x, y, settings );
    },

    createBody: function() {
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position = new Box2D.Common.Math.b2Vec2(
            (this.pos.x + this.size.x / 2) * Box2D.SCALE,
            (this.pos.y + this.size.y / 2) * Box2D.SCALE
        ); 
        bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;
        this.body = ig.world.CreateBody(bodyDef);

        var fixture = new Box2D.Dynamics.b2FixtureDef;
        fixture.shape = new Box2D.Collision.Shapes.b2CircleShape(1);
        
        fixture.density = 0.8;
        fixture.friction = 0.3;
        fixture.restitution = 0.5;

        this.body.CreateFixture(fixture);
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