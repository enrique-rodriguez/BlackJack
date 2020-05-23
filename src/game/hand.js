/**
 * Responsible for managing the cards the player has.
 *
 * @export
 * @class Hand
 */
export default class Hand {

    /**
     * Creates an instance of Hand.
     * @memberof Hand
     */
    constructor() {
        this.cards = [];
        this.hasAce = false;
        this.dirty = false;
        this.total = 0;
    }

    /**
     * Adds the given card to the hand.
     *
     * @param {CardModel} card
     * @memberof Hand
     */
    add(card) {
        if (card.isAce()) this.hasAce = true;

        this.cards.push(card);
        this.setDirty(true);
    }

    /**
     * Sets the hand's dirty flag. Used for updating the hand's score.
     *
     * @param {*} option
     * @memberof Hand
     */
    setDirty(option) {
        this.dirty = option;
    }

    /**
     * Removes the cards in the hand.
     *
     * @memberof Hand
     */
    reset() {
        this.cards = [];
        this.setDirty(true);
    }

    /**
     * Gets all of the aces in the hand. Used for calculating the best hand
     * when the player goes over 21, but has aces that can count as 1.
     *
     * @returns
     * @memberof Hand
     */
    getAces() {
        let aces = [];

        this.cards.forEach(card => {
            if (card.isAce()) aces.push(card);
        });

        return aces;
    }

    /**
     * Set's the total score for the hand.
     *
     * @param {*} total
     * @memberof Hand
     */
    setTotal(total) {
        this.total = total;
        this.setDirty(false);
    }

    /**
     * Returns the total for the hand if it's not dirty. Recalculates if it is.
     *
     * @returns
     * @memberof Hand
     */
    getTotal() {
        if (!this.dirty) return this.total;

        var total = this.calculateHandsScore();

        this.setTotal(total);

        return total;
    }


    /**
     * Calculates the best possible hand score using the current cards.
     *
     * @returns
     * @memberof Hand
     */
    calculateHandsScore() {
        var score = 0;

        for (const card of Object.values(this.cards)) {
            if (!card.isVisible()) continue;
            score += card.getScore();
        }

        if (score > 21 && this.hasAce)
            score = this.correctValue(score);

        return score;
    }

    /**
     * Assumes that the hand has aces and attempts to adjust the player's score
     * in case they exceeded 21.
     *
     * @param {*} total
     * @returns
     * @memberof Hand
     */
    correctValue(total) {

        for (var i = 0; i < this.getAces().length; i++) {
            total -= 10;
            if (total <= 21) return total;
        }

        return total;
    }
}