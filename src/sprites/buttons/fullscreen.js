import CONSTANTS from "../../constants";
import Button from "./button";
import Tween from "../../animation/tween";

export default class FullScreenButton extends Button {

    constructor(scene) {
        let config = {frame: 'Maximize', indexPos: 209};

        super(scene, config);
    }

    create() {
        super.create();

        this.on('pointerup', () => {
        	this.scene.scale.toggleFullscreen();
        });

    }


}