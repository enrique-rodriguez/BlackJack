import "phaser";
import CONSTANTS from "../constants";

export default class Carpet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);
        this.setTexture('red carpet');
        this.setPosition(CONSTANTS.Dimensions.WIDTH/2, CONSTANTS.Dimensions.HEIGHT/2);
    }
}