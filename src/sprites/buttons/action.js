import Button from "./button";
import Tween from "../../animation/tween";


export default class ActionButton extends Button {

    constructor(scene, config) {

        super(scene, config);

        this.visible = false;
        this.setAlpha(0);
    }

    show(visible) {
        
        if(visible) {
            this.setVisible(true);
            Tween.fadeInOrOut("in", this.scene, this);
        }
        else {
        	Tween.fadeInOrOut("out", this.scene, this, () => {
            	this.setVisible(false);
            });
        }
    }
}