import CONSTANTS from "../../constants";
import ActionButton from "./action";
import Tween from "../../animation/tween";

export default class DealButton extends ActionButton {

    static position = 124

    constructor(scene) {
        let config = {
            frame: 'Deal', 
            indexPos: DealButton.position
        };
        
        super(scene, config);
    }

    create() {
        super.create();

        this.once('pointerup', () => {
            this.hidePokerChips();
            this.hidePotText();
            this.movePot();
        })
    }

    hidePokerChips() {
        this.scene.tweens.add({
            targets: this.scene.chips.getChildren(),
            y: this.scene.game.config.height * 1.5,
            duration: 1000
        });
    }

    hidePotText() {
        this.scene.tweens.add({
            targets: [this, this.scene.placeBetText],
            alpha: 0,
            duration: 1000
        });
    }

    movePot() {

        this.scene.pot.disableInteractive();

        let potPosition  = this.scene.grid.getIndexPos(118);
        let textPosition = this.scene.grid.getIndexPos(148);

        this.scene.tweens.add({
            targets: this.scene.pot.getChildren(),
            duration: 500,
            x: potPosition.x,
            y: potPosition.y,
            onCompleteParams: this.scene,
            onComplete: (tween, targets, scene) => {
                scene.scene.launch(CONSTANTS.Scenes.Keys.Round, scene.blackjack);
            }});

        this.scene.tweens.add({
            targets: this.scene.pot.getText(),
            duration: 500,
            x: textPosition.x,
            y: textPosition.y
        });
    }
}