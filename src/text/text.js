import "phaser";


export default class Text extends Phaser.GameObjects.Text {

	constructor(scene, config) {
		super(scene);
		scene.add.existing(this);
		scene.grid.placeAtIndex(config.indexPos, this);
		this.setOrigin(0.5);
		this.setStyle({fontSize: 35});
        this.setStroke(0x000000, 3);
	}


}