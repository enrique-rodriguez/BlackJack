import Hand from "../hand";


/**
 * Basic Player class. Contains a hand and API for interacting with it.
 *
 * @export
 * @class AbstractPlayer
 */
export default class AbstractPlayer {

    /**
     * Creates an instance of AbstractPlayer.
     * @memberof AbstractPlayer
     */
    constructor() {
        this.hand = new Hand();
    }

    /**
     * Empties the player's hand of cards.
     *
     * @memberof AbstractPlayer
     */
    resetHand() {
        this.hand.reset();
    }

    /**
     * Adds ta new card to the current hand.
     *
     * @param {*} card
     * @memberof AbstractPlayer
     */
    add(card) {
        this.hand.add(card);
    }

    /**
     * Determines if the player has a hand with a total of 21.
     *
     * @returns true if hand is worth 21 points.
     * @memberof AbstractPlayer
     */
    hasBlackjack() {
        return this.hand.getTotal() == 21;
    }

    /**
     * Gets the total value for the player's hand.
     *
     * @returns the total for the player's hand.
     * @memberof AbstractPlayer
     */
    getHandTotal() {
        return this.hand.getTotal();
    }

    /**
     * Sets the current hand's dirty value.
     *
     * @param {*} option
     * @memberof AbstractPlayer
     */
    setDirty(option) {
        this.hand.setDirty(option);
    }

    /**
     * Returns true if the player's hand exceeds 21
     *
     * @returns true if the hands value is over 21
     * @memberof AbstractPlayer
     */
    isBusted() {
        return this.getHandTotal() > 21;
    }
}