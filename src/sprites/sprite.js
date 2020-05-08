import 'phaser';


export default class Sprite extends Phaser.GameObjects.Sprite {

    constructor(scene, config) {
        super(scene);
        this.config = config;
        
        scene.add.existing(this);
        
        scene.grid.placeAtIndex(config.indexPos, this);

        if(config.texture && config.frame) 
            this.setTexture(config.texture, config.frame);

        else if(config.texture)
            this.setTexture(config.texture);

        if(config.scale)
            this.setScale(config.scale);

        if(config.interactive)
            this.setInteractive();

        this.create();
    }

    create() {}

    update() {}

}