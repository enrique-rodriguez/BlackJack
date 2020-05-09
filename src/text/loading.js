import Text from "./text";


export default class LoadingText extends Text {

    constructor(scene) {

        super(scene, {indexPos: 172});
        
        this.setText("Loading...");

        this.setFontSize(15);

    }
}