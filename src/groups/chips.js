import "phaser";

export default class Chips extends Phaser.GameObjects.Group {

    constructor(scene) {
        super(scene);
        this.chips = {}
    }

    add(chip) {

        if(!this.exists(chip)) {
            super.add(chip);
            this.chips[chip.getValue()] = chip;
        }
    }

    remove(chip) {
        if(this.exists(chip)) {
            this.chips[chip.getValue()] = undefined;
        }

        super.remove(chip);
    }

    exists(chip) {
        return this.chips[chip.getValue()] != undefined;
    }
}