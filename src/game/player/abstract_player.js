import Hand from "../hand";


export default class Player {

    constructor() {
        this.hand = new Hand();
    }

    setBet(bet) {
        this.hand = new Hand(bet);
    }

    add(card) {
        this.hand.add(card);
    }
}