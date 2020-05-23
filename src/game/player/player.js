import AbstractPlayer from "./abstract_player";

/**
 * Player class. Has API for giving and receiving money.
 *
 * @export
 * @class Player
 * @extends {AbstractPlayer}
 */
export default class Player extends AbstractPlayer {

    /**
     * Creates an instance of Player.
     * @param {*} money
     * @memberof Player
     */
    constructor(money) {
        super();
        this.money = money;
    }

    /**
     * Increases the player's balance by the amount given.
     *
     * @param {*} chip
     * @memberof Player
     */
    take(chip) {
        if (typeof chip === 'number' && isFinite(chip))
            this.money -= chip;
        else
            this.money -= chip.getValue();

        if (this.money < 0) this.money = 0;
    }

    /**
     * Increases the player's balance by the amount given.
     *
     * @param {*} chip
     * @memberof Player
     */
    give(chip) {
        if (typeof chip === 'number' && isFinite(chip))
            this.money += chip;
        else
            this.money += chip.getValue();
    }

}