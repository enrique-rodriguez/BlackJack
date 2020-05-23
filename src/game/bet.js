/**
 * Responsible for storing the player's bet at the start of the round.
 *
 * @export
 * @class Bet
 */
export default class Bet {

    /**
     * Creates an instance of Bet.
     * @param {*} amount of money to place on the bet.
     * @memberof Bet
     */
    constructor(amount) {
        this.amount = amount;
    }

}