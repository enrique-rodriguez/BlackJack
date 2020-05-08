import "phaser";

import PotText from "../text/pot";


export default class Pot extends Phaser.GameObjects.Group {

    static index = 127;

    constructor(scene) {
        super(scene);

        this.model = new PotText(this.scene);
        this.chips = [];
        this.position = scene.grid.getIndexPos(Pot.index);
    }

    getAmount() {
        return this.model.getAmount();
    }

    getText() {
        return this.model;
    }

    disableInteractive() {
        for(const chip of Object.values(this.getChildren())) {
            chip.disableInteractive();
        }
    }

    add(chip) {
        super.add(chip);

        let newAmount = this.model.amount + chip.model.value;
        this.model.setAmount(newAmount);
        this.chips.push(chip);
        this.position.y -= 2;
        return this.position;
    }

    remove() {
        
        let chip = this.chips.pop();
        let newAmount = this.model.amount - chip.getValue();
        this.model.setAmount(newAmount);
        this.position.y += 2;

        super.remove(chip);

        return chip;
    }

    getTotal() {
        let total = 0;

        for(const chip of Object.values(this.chips))
            total += chip.value;

        return total;
    }
}