import "phaser";
import ChipModel from "../../game/chip";
import CONSTANTS from "../../constants";

export default class Chip extends Phaser.GameObjects.Sprite {

    static SCALE = 0.75;
    static VALUES = [1  , 5  ,  10,  50, 100, 500, 1000, 2000];

    constructor(scene, value) {
        super(scene, 0, 0);
        scene.add.existing(this);

        this.model = new ChipModel(value);

        super.setTexture("chips");
        super.setFrame(`$${value}`);
        super.setScale(Chip.SCALE);
        super.setInteractive();

        this.on("pointerup", () => this.getRandomSound().play());
    }

    getValue() {
        return this.model.value;
    }

    getRandomSound() {
        let sound = "bet" + (Math.floor(Math.random() * CONSTANTS.Sounds.POKER_CHIP) + 1);
        return this.scene.sound.add(sound);
    }
}