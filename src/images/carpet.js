import "phaser";
import CONSTANTS from "../constants";

export default class Carpet extends Phaser.GameObjects.Image {

    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.setTexture('red carpet');
        this.setPosition(scene.game.config.width/2, scene.game.config.height/2);
    }
    
}