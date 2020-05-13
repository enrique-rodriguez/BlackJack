


export default class CardModel {

    static SUITS   = ['club', 'heart', 'spade', 'diamond'];
    static VALUES  = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13'];

    constructor(suit, value) {

        if(!CardModel.SUITS.includes(suit))
            throw("Invalid suit");

        if(!CardModel.VALUES.includes(value))
            throw("Invalid value");

        this.suit  = suit;
        this.value = value;
    }

    getAssetName() {
        return `${this.suit}${this.value}`;
    }

    toString() {
        return `${this.suit}${this.value}`;
    }
}