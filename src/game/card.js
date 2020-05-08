


export default class CardModel {

    static SUITS   = ['club', 'heart', 'spade', 'diamond'];
    static VALUES  = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    constructor(suit, value) {

        if(!CardModel.SUITS.includes(suit))
            throw("Invalid suit");

        if(!CardModel.VALUES.includes(value))
            throw("Invalid value");

        this.suit  = suit;
        this.value = value;
    }

    toString() {
        return `${this.suit}${this.value}`;
    }
}