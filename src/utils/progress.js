import Text from "../text/text";


export default class ProgressBar {


    constructor(scene) {
        this.scene = scene;
        this.create();
    }


    create() {
        this.loadingText = new Text(this.scene, "Loading...").setFontSize(15);
        this.percentText = new Text(this.scene, "0%").setFontSize(25);

        this.scene.grid.placeAtIndex(157, this.percentText);
        this.scene.grid.placeAtIndex(172, this.loadingText);
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