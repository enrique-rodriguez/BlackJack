

export default class Hand {

    constructor(bet) {
        this.cards = [];
        this.bet = bet;
    }

    add(card) {
        this.cards.push(card);
    }

    getTotal() {
        return [1];
    }
}