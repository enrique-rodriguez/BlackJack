import LoadingText from "../text/loading";
import PercentageText from "../text/percentage";


export default class ProgressBar {


    constructor(scene) {
        this.scene = scene;
        this.create();
    }


    create() {
        this.loadingText = new LoadingText(this.scene);
        this.percentText = new PercentageText(this.scene);
    }

    update(value) {
        this.percentText.setText(parseInt(value * 100) + '%');
    }

    setText(text) {
        this.loadingText.setText(text);
    }

    destroy() {
        this.loadingText.destroy();
        this.percentText.destroy();
    }
}