/**
 * Model for a playing card.
 *
 * @export
 * @class CardModel
 */
export default class CardModel {

    /**
     * All of the suits in casino playing cards.
     *
     * @static
     * @memberof CardModel
     */
    static SUITS = ['club', 'heart', 'spade', 'diamond'];

    /**
     *
     *
     * @static The values for the faces of the playing cards.
     * @memberof CardModel
     */
    static VALUES = (function () {
        let values = [];
        for (var i = 1; i <= 13; i++) values.push(i.toString());
        return values;
    })();

    /**
     *Creates an instance of CardModel.
     * @param {*} suit the suit of the card.
     * @param {*} value the value of the card.
     * @param {boolean} [visible=true]
     * @memberof CardModel
     */
    constructor(suit, value, visible = true) {

        if (!CardModel.SUITS.includes(suit))
            throw ("Invalid suit");

        if (!CardModel.VALUES.includes(value))
            throw ("Invalid value");

        this.suit = suit;
        this.value = value;
        this.visible = visible;
    }

    /**
     * Deterimines if the card is an Ace.
     *
     * @returns true if the card is an ace.
     * @memberof CardModel
     */
    isAce() {
        return this.value == '1';
    }

    /**
     * Determines if the card is visible.
     *
     * @returns true if the card is visible.
     * @memberof CardModel
     */
    isVisible() {
        return this.visible;
    }

    /**
     * Calculates the score of the card.
     *
     * @returns
     * @memberof CardModel
     */
    getScore() {
        let intValue = parseInt(this.value);

        if (intValue > 10)
            return 10;
        else if (intValue == 1)
            return 11;

        return intValue;
    }

    /**
     * Returns a simple name for the card. Used for loading frames of the cards.
     *
     * @returns a frame friendly name of the card.
     * @memberof CardModel
     */
    toString() {
        return `${this.suit}${this.value}`;
    }
}