import AbstractPlayer from "./abstract_player";
import Deck from "../deck";


/**
 * Dealer is responsible for dealing the cards to the player and itself.
 *
 * @export
 * @class Dealer
 * @extends {AbstractPlayer}
 */
export default class Dealer extends AbstractPlayer {

    /**
     * Creates an instance of Dealer.
     * @param {*} index where on the grid to place the cards when its time to deal them.
     * @memberof Dealer
     */
    constructor(index) {
        super(index);
        this.deck = new Deck(true);
        this.downCard; // A reference to the face down card.
    }

    /**
     * Deals a card to the given player.
     *
     * @param {*} player
     * @returns
     * @memberof Dealer
     */
    deal(player) {
        let card = this.deck.next();
        player.add(card);
        return card;
    }

    /**
     * Resets the deck and shuffles the cards.
     *
     * @memberof Dealer
     */
    reshuffle() {
        this.deck.reset();
        this.deck.shuffle();
    }

    /**
     * Draws a card to the dealer's hand.
     *
     * @param {boolean} used for updating the score. If it's not visible, don't calculate
     * the value [visible=false]
     * @returns
     * @memberof Dealer
     */
    draw(visible = false) {
        let card = this.deal(this);
        card.visible = visible;

        if (!visible) this.downCard = card;
        return card;
    }

    /**
     * Set's the visibility of the dealers down card to visible.
     *
     * @memberof Dealer
     */
    flipDownCard() {
        this.downCard.visible = true;
    }

}