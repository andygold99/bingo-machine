ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.levels.bingo',
    'game.entities.ball',
    'game.entities.box2dball',
    'game.entities.jackpot',
    'game.entities.greenpeg',
    'game.entities.shooter',
    'impact.debug.debug',
    'game.bm',

    'plugins.box2d.game',
    'plugins.box2d.debug' // to disable debug draw simply comement this line

)
.defines(function(){

MyGame = ig.Box2DGame.extend({
    
    gravity: 300,
    firebaseRoot: bm.firebaseRoot,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

    initDebugPanel: function(){
        ig.debug.addPanel({
            type: ig.DebugPanel,
            name: "box2d",
            label: "Box2d",

            options:[{
                name: "Enable Debug Draw",

                object: ig.Box2DDebug,
                property: "_debugDraw"
            }]
        });
    },
	
	init: function() {
        this.initDebugPanel();
		// Initialize your game here; bind keys etc.
        this.loadLevel(LevelBingo);
        
        // Set the space key to call a ball, ie shoot
        ig.input.bind(ig.KEY.SPACE, 'call');
        
        // Set left and right to rotate the shooter
        ig.input.bind(ig.KEY.Z, 'left');
        ig.input.bind(ig.KEY.X, 'right');
        
        // Start a game
        ig.input.bind(ig.KEY.S, 'start');
        
        this.jackpotEnt = this.getEntitiesByType(EntityJackpot)[0];
        
        // Reset jackpot to 0
        var myDataRef = new Firebase(this.firebaseRoot + 'game');
        myDataRef.set({jackpot: 0});
        
        // This checks how many pegs are lit and updates the jackpot value
        var pegRef = new Firebase(this.firebaseRoot + 'game/pegs');
        
        pegRef.on('value', function(s) {
            this.count = 0;
            s.forEach(function() {
                this.count++;
            });
            
            ig.game.jackpotEnt.total = this.count * 50;
            myDataRef.update({jackpot: this.count * 50});
   
        });
        
        this.shooterEnt = this.getEntitiesByType(EntityShooter)[0];
        
        this.gameRef = new Firebase(this.firebaseRoot + 'game');
        this.shooterAngleRef = new Firebase(this.firebaseRoot + 'game/shooter');
        
        this.shooterAngleRef.on('value', function(s) {
            this.angle = s.child('angle').val();
            if (!this.reset) {
               // ig.game.shooterEnt.fbRotateShooter(89.50);
                this.reset = true;
            } else {
                ig.game.shooterEnt.fbRotateShooter(this.angle);
            }
        });
        
        // Resets shooter position when game is refreshed
        this.gameRef.on('child_removed', function(s) {
            ig.game.shooterEnt.fbRotateShooter(1.55);
        });
        
        this.ballPosRef = new Firebase(this.firebaseRoot + 'game/ball');
        this.ballShotRef = new Firebase(this.firebaseRoot + 'game/ball/shot');
        
        this.ballShotRef.on('value', function(s) {
            if (!this.shot) {
                this.shot = true;
            } else {
                ig.game.shooterEnt.callBall();
                this.shot = false;
            }
        });
        
        this.ballPosRef.on('value', function(s) {
            this.ballPosX = s.child('x').val();
            this.ballPosY = s.child('y').val();
          //  console.log(ballPosX, ballPosY);
            
            if (!this.moving) {
                this.moving = true;
            } else {
                ig.game.ballEnt.moveBall(this.ballPosX, this.ballPosY);
            }
        });

        
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
        
        this.ballEnt = this.getEntitiesByType(EntityBall)[0];
		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
        
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
	}
});

// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 1024, 700, 1 );

});
