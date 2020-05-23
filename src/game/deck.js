import shuffle from "../utils/shuffle";
import CardModel from "./card";


/**
 * 
 *
 * @export
 * @class Deck
 */
export default class Deck {

    /**
     * Creates an instance of Deck.
     * @param {boolean} [shuffle=false]
     * @memberof Deck
     */
    constructor(shuffle = false) {
        this.cards = [];
        this.reset();

        if (shuffle) this.shuffle();
    }

    /**
     * Resets the deck and creates new playing card models.
     *
     * @memberof Deck
     */
    reset() {
        this.removeAllCards();

        for (const suit of Object.values(CardModel.SUITS)) {
            for (const value of Object.values(CardModel.VALUES)) {
                let model = new CardModel(suit, value);
                this.cards.push(model);
            }
        }
    }

    /**
     * Deletes all of the cards in the deck.
     *
     * @memberof Deck
     */
    removeAllCards() {
        while (this.cards.length > 0) this.cards.pop();
    }

    /**
     * Adds the given card to the deck.
     *
     * @param {CardModel} card to add
     * @memberof Deck
     */
    add(card) {
        this.cards.push(card);
    }

    /**
     * Shuffles the cards in the deck.
     *
     * @memberof Deck
     */
    shuffle() {
        shuffle(this.cards);
    }

    /**
     * Determines if the deck is empty.
     *
     * @returns
     * @memberof Deck
     */
    isEmpty() {
        return this.cards.length == 0;
    }

    /**
     * Removes and returns the first element in the deck.
     *
     * @returns
     * @memberof Deck
     */
    next() {
        if (this.isEmpty()) {
            throw ("Empty deck");
        }

        return this.cards.pop();
    }

}