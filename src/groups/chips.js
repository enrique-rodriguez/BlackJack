import "phaser";

/**
 * A container for storing all of the chips that are in the betting scene.
 *
 * @export
 * @class Chips
 * @extends {Phaser.GameObjects.Group}
 */
export default class Chips extends Phaser.GameObjects.Group {

    /**
     * Creates an instance of Chips.
     * @param {*} scene
     * @memberof Chips
     */
    constructor(scene) {
        super(scene);
        this.chips = {}
    }

    /**
     * Adds the given chip to the container.
     *
     * @param {*} chip
     * @memberof Chips
     */
    add(chip) {

        if (!this.exists(chip)) {
            super.add(chip);
            this.chips[chip.getValue()] = chip;
        }
    }

    /**
     * Removes the given chip from the container.
     *
     * @param {*} chip
     * @memberof Chips
     */
    remove(chip) {
        if (this.exists(chip)) {
            this.chips[chip.getValue()] = undefined;
        }

        super.remove(chip);
    }

    /**
     * Checks if the given chip is stored in this container.
     *
     * @param {*} chip
     * @returns
     * @memberof Chips
     */
    exists(chip) {
        return this.chips[chip.getValue()] != undefined;
    }
}