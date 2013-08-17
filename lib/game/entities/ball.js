ig.module(
    'game.entities.ball'
)
.requires(
    'impact.entity',
    'game.bm',
    'plugins.box2d.entity'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityBall = ig.Box2DEntity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NEVER,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 20, y: 20},
    speed: 600,
    firebaseRoot: bm.firebaseRoot,
    
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
        
        ig.game.sortEntitiesDeferred(); // Stops ball showing in front of entities with a higher zIndex
        
        this.ballPosRef = new Firebase(this.firebaseRoot + 'game/ball');
        ig.log("Created!");
    },

    createBody: function() {
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.position = new Box2D.Common.Math.b2Vec2(
            (this.pos.x + this.size.x / 2) * Box2D.SCALE,
            (this.pos.y + this.size.y / 2) * Box2D.SCALE
        ); 
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        this.body = ig.world.CreateBody(bodyDef);

        var fixture = new Box2D.Dynamics.b2FixtureDef;
        fixture.shape = new Box2D.Collision.Shapes.b2CircleShape(1);
        
        fixture.density = 0.8;
        fixture.friction = 0.3;
        fixture.restitution = 0.5;

        this.body.CreateFixture(fixture);
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
        
        // Remove entity when it enters a bucket
        if (this.pos.y > 500) {
            this.kill();
        }
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    }
});

});