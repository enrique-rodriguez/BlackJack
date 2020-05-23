import "phaser";

import Text from "../text/text";


export default class Pot extends Phaser.GameObjects.Group {

    static index = 127;

    constructor(scene) {
        super(scene);

        this.amount = 0;
        this.text = new Text(this.scene, `$${this.amount}`).setVisible(false);
        this.chips = [];
        this.position = scene.grid.getIndexPos(Pot.index);
    }

    reset() {
        this.amount = 0;

        this.chips.forEach(c => {
            super.remove(c);
            c.destroy();
        });
    }

    disableInteractive() {
        for (const chip of Object.values(this.getChildren())) {
            chip.disableInteractive();
        }
    }

    add(chip) {
        super.add(chip);

        let newAmount = this.amount + chip.model.value;
        this.update(newAmount)

        this.chips.push(chip);
        this.position.y -= 2;
        return this.position;
    }

    update(amount) {
        this.amount = amount;

        if (this.amount <= 0) {
            this.amount = 0;
            this.text.setVisible(false);
        } else {
            this.text.setVisible(true);
        }
        this.text.setText(`$${this.amount}`);
    }

    removeFromTop() {

        let chip = this.chips.pop();
        let newAmount = this.amount - chip.getValue();

        this.update(newAmount);

        this.position.y += 2;

        return chip;
    }


}