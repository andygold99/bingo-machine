ig.module(
  'game.entities.slope'
)
.requires(
  'impact.entity',
  'plugins.box2d.entity'
)
.defines(function() {
  EntitySlope = ig.Box2DEntity.extend({

    collides: ig.Entity.COLLIDES.NEVER,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      
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
        fixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
        fixture.shape.SetAsOrientedBox(this.size.x / 2 * Box2D.SCALE,this.size.y / 2 * Box2D.SCALE, new Box2D.Common.Math.b2Vec2(this.size.x / 2 * Box2D.SCALE,this.size.y / 2 * Box2D.SCALE),10);
        
        fixture.density = 0.8;
        fixture.friction = 0.3;
        fixture.restitution = 0.5;

        this.body.CreateFixture(fixture);
    },


  });
});