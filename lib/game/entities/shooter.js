ig.module(
    'game.entities.shooter'
)
.requires(
    'impact.entity',
    'game.bm'
)
.defines(function() {

// Create your own entity, subclassed from ig.Enitity
EntityShooter = ig.Entity.extend({

    // Set some of the properties
    collides: ig.Entity.COLLIDES.NONE,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,

    size: {x: 44, y: 24},
    firebaseRoot: bm.firebaseRoot,
    
    // Load an animation sheet
    animSheet: new ig.AnimationSheet( 'media/shooter-nub.png', 44, 24 ),
    
    init: function( x, y, settings ) {
        // Add animations for the animation sheet
        this.addAnim( 'idle', 0.1, [0] );

        this.gravityFactor = 0;
        this.bounciness = 0;
        this.vel.x = 0;
        this.vel.y = 0;
        this.maxVel.x = 0;
        this.maxVel.y = 0;
        this.currentAnim.angle += 1.55; // Point shooter downward
        this.currentAnim.pivot = {x:this.size.x/2 - 50, y:this.size.y/2};
        rstate = true; // Start auto-rotating the shooter from side to side
        this.angle = 0;
        
        this.shooterAngleRef = new Firebase(this.firebaseRoot + 'game/shooter');
        this.ballShotRef = new Firebase(this.firebaseRoot + 'game/ball/shot');
        
        // Call the parent constructor
        this.parent( x, y, settings );x
    },
    
    callBall: function() {

        var cos = Math.cos(this.currentAnim.angle);
        var sin = Math.sin(this.currentAnim.angle);
        
        // Our center
        var cx = this.pos.x + this.size.x/2;
        var cy = this.pos.y + this.size.y/2;
        
        // Just in front of us
        var dist = Math.max(this.size.x/2, this.size.y/2 + 45);
        var x = cx + cos * dist;
        var y = cy + sin * dist;
        
        // Launch ball
        var b = ig.game.spawnEntity(EntityBall, x - this.size.x / 2 + - 49, y - this.size.y / 2);
        // b.pos.x = x - b.size.x/2 + - 49;
        // b.pos.y = y - b.size.y/2;
        b.body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(cos * b.speed,sin * b.speed), b.body.GetPosition() );
        // b.vel.x = cos * b.speed;
        // b.vel.y = sin * b.speed;
        
        this.ball = ig.game.getEntitiesByType(EntityBall)[0];
    },
    
    // Auto-rotate shooter from side to side
    rotateShooter: function() {
        
        if (rstate === true) {
            this.currentAnim.angle += Math.PI/9 * ig.system.tick; // move right
            
            this.shooterAngleRef.update({angle: this.currentAnim.angle});
            if (this.currentAnim.angle >= 0.60) {
                rstate = false;
            }
        } else {
            // It's false
            this.currentAnim.angle -= Math.PI/9 * ig.system.tick; // move left
            this.shooterAngleRef.update({angle: this.currentAnim.angle});
            if (this.currentAnim.angle <= 2.40) {
                rstate = true;
            }
        }
    },
    
    fbRotateShooter: function(angle) {
        this.currentAnim.angle = angle;
    },
    
    update: function() {
        // This method is called for every frame on each entity.
        // React to input, or compute the entity's AI here.
        
        if (ig.input.pressed('call')) {
            this.ballShotRef.set({shot: 'true'});
        }
        
        // Auto-rotate shooter from side to side
       // this.rotateShooter();
        
        if (ig.input.state('left')) {
            if (this.currentAnim.angle <= 2.40) {
                this.shooterAngleRef.update({angle: this.currentAnim.angle});
                this.currentAnim.angle += Math.PI/9 * ig.system.tick;
                //console.log('left ' + this.currentAnim.angle);
            }
        }
        
        if (ig.input.state('right')) {
            if (this.currentAnim.angle >= 0.60) {
                this.shooterAngleRef.update({angle: this.currentAnim.angle});
                this.currentAnim.angle -= Math.PI/9 * ig.system.tick;
                //console.log('right ' + this.currentAnim.angle);
            }
        }
        
        // Call the parent update() method to move the entity
        // according to its physics
        this.parent(); 
    }
});

});