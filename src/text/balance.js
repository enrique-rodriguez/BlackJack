import Text from "./text";


export default class Balance extends Text {
	
    constructor(scene, amount) {
        super(scene, {indexPos: 181});

        this.setBalance(amount);
    }

    setBalance(amount) {
        this.amount = amount;
        this.setText("$"+amount);
    }

    withdraw(amountToWithdraw) {
        let amount = this.amount - amountToWithdraw;

        if(amount < 0) amount = 0;

        this.setBalance(amount);
    }

    deposit(amount) {
        this.setBalance(this.amount + amount);
    }
}