import AbstractPlayer from "./abstract_player";
import Deck from "../deck";


export default class Dealer extends AbstractPlayer {

    constructor(index) {
        super(index);
        this.deck = new Deck();
    }

    deal(player) {
        try {
            let card = this.deck.next();

            player.add(card);
        } catch(e) {
            console.log(e);
        }
        
        return card;
    }

    draw() {
        this.deal(this);
    }

}