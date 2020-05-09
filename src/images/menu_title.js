import "phaser";


export default class MenuTitle extends Phaser.GameObjects.Image {

    constructor(scene) {
        let position = scene.grid.getIndexPos(37);
        super(scene, position.x, position.y);
        scene.add.existing(this);
        this.setTexture('blackjack');
    }
    
}