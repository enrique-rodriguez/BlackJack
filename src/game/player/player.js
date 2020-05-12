import AbstractPlayer from "./abstract_player";

export default class Player extends AbstractPlayer {

    constructor(money) {
        super();
        this.money = money;
    }

    take(chip) {
        this.money -= chip.getValue();

        if(this.money < 0) this.money = 0;
    }

    give(chip) {
        this.money += chip.getValue();
    }

}