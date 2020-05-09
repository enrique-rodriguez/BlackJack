import 'phaser';


export default class LoadingImage extends Phaser.GameObjects.Image {

    constructor(grid) {
        super(grid.scene);
        this.setScale(0.5);
        this.setTexture("boot");
        grid.scene.add.existing(this);
        grid.placeAtIndex(112, this);
    }
    
}