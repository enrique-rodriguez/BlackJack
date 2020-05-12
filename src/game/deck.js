import shuffle from "../utils/shuffle";
import CardModel from "./card";


export default class Deck {

    constructor(empty=false){
        this.cards = [];

        if(!empty) {
            this.reset();
        }
    }

    reset() {
        this.removeAllCards();

        for(const suit of Object.values(CardModel.SUITS)) {
            for(const value of Object.values(CardModel.VALUES)){
                let model = new CardModel(suit, value);
                this.cards.push(model);
            }
        }
    }

    removeAllCards() {
        while(this.cards.length > 0) this.cards.pop();
    }

    add(card) {
        this.cards.push(card);
    }

    shuffle() {
        shuffle(this.cards);
    }

    isEmpty() {
        return this.cards.length == 0;
    }

    next() {
        if(this.isEmpty) {
            throw("Empty deck"); 
        }

        return this.cards.pop();
    }


}