import AbstractPlayer from "./abstract_player";
import Deck from "../deck";


export default class Dealer extends AbstractPlayer {

    constructor() {
        super();
        this.deck = new Deck();
    }

    deal(player) {
        try {
            player.add(this.deck.next());
        } catch(e) {
            console.log(e);
        }
        
    }

    draw() {
        this.deal(this);
    }

}