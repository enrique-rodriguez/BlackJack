import "phaser";


export default class Image extends Phaser.GameObjects.Image {

	constructor(scene, config) {
		super(scene);

		scene.add.existing(this);
		scene.grid.placeAtIndex(config.indexPos, this);
        this.setTexture(config.texture);
	}
	
}