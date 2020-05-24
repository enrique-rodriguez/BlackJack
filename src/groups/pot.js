import "phaser";

import Text from "../text/text";


/**
 * Container for storing the chips that were place in a bet.
 *
 * @export
 * @class Pot
 * @extends {Phaser.GameObjects.Group}
 */
export default class Pot extends Phaser.GameObjects.Group {

    /**
     * Index to start placing the chips in a bet.
     *
     * @static
     * @memberof Pot
     */
    static index = 127;

    /**
     * Creates an instance of Pot.
     * @param {*} scene
     * @memberof Pot
     */
    constructor(scene) {
        super(scene);

        this.amount = 0;
        this.text = new Text(this.scene, `$${this.amount}`).setVisible(false);
        this.chips = [];
        this.position = scene.grid.getIndexPos(Pot.index);
    }

    /**
     * Resets the amount for the bet and deletes the containing chips.
     *
     * @memberof Pot
     */
    reset() {
        this.amount = 0;
        this.chips.forEach(c => super.remove(c, true, true));
    }

    /**
     * Disables all of the poker chips's interactivity.
     *
     * @memberof Pot
     */
    disableInteractive() {
        for (const chip of Object.values(this.getChildren())) {
            chip.disableInteractive();
        }
    }

    /**
     * Adds the given chip to the container.
     *
     * @param {*} chip
     * @returns
     * @memberof Pot
     */
    add(chip) {
        super.add(chip);

        let newAmount = this.amount + chip.model.value;
        this.update(newAmount)

        this.chips.push(chip);
        this.position.y -= 2;
        return this.position;
    }

    /**
     * Reset the amount for the pot.
     *
     * @memberof Pot
     */
    resetAmount() {
        this.amount = 0;
    }

    /**
     * Update the amount for the pot with the given value.
     *
     * @param {*} amount
     * @memberof Pot
     */
    update(amount) {
        this.amount = amount;

        this.text.setText(`$${this.amount}`);
    }

    /**
     * Removes and returns the top element in the pot.
     *
     * @returns
     * @memberof Pot
     */
    removeFromTop() {

        let chip = this.chips.pop();
        let newAmount = this.amount - chip.getValue();

        this.update(newAmount);

        this.position.y += 2;

        return chip;
    }


}