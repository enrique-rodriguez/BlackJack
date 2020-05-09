import CONSTANTS from "../../constants";
import Button from "./button";
import Tween from "../../animation/tween";

export default class PlayButton extends Button {

    constructor(scene) {
        let config = {frame: 'Play', indexPos: 195};

        super(scene, config);
    }

    create() {
        super.create();

        this.once('pointerup', ()=>{
            this.scene.menuCard.flip();
            this.scene.menuCard.setRotationSpeed(10);

            setTimeout( () =>{
                Tween.exitRight(this.scene, this.scene.menuCard);
                Tween.exitDown(this.scene, this.scene.soundButton);
                Tween.exitDown(this.scene, this.scene.fullScreenButton);
                Tween.dim(this.scene, this.scene.carpet);
                Tween.exitDown(this.scene, this);
                
                Tween.dim(this.scene, this.scene.menuTitle, () => {
                    this.scene.scene.start(CONSTANTS.Scenes.Keys.Game, {
                        music: this.scene.music
                    });
                });
                
            }, 200);

        }, this);

    }


}