import AbstractPlayer from "./abstract_player";
import Balance from "../../text/balance";

export default class Player extends AbstractPlayer {

    constructor(scene, money) {
        super();
        this.balance = new Balance(scene, money);
    }

    take(chip) {
        this.balance.withdraw(chip.getValue());
    }

    give(chip) {
        this.balance.deposit(chip.getValue());
    }

}