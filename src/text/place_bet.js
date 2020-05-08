import Text from "./text";


export default class PlaceBetText extends Text {

    constructor(scene) {

        super(scene, {indexPos: 67});
        
        this.setText("Place your bet!")
    }
}