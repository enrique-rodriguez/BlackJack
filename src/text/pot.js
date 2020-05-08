import Text from "./text";


export default class PotText extends Text {

	constructor(scene) {
		super(scene, {indexPos: 129});

		this.amount = 0;
		
        this.setVisible(false);
	}

	getAmount() {
		return this.amount;
	}


	setAmount(amount) {
        this.amount = amount;

        if(this.amount == 0)
            this.setVisible(false);
        else 
            this.setVisible(true);

        this.setText("$"+amount);
    }

}