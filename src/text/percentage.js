import Text from "./text";


export default class PercentageText extends Text {

    constructor(scene) {

        super(scene, {indexPos: 157});
        
        this.setText("0%");

        this.setFontSize(25);
    }
}