import "phaser";
import Tween from "../../animation/tween";


export default class Button extends Phaser.GameObjects.Sprite {

    static HOVER_TINT = 0xcccccc;
    static PRESS_TINT = 0x888888;

    constructor(scene, frame, callback, once=false) {
        super(scene);

        scene.add.existing(this);
        this.setScale(0.9);
        this.setTexture("buttons");
        this.setFrame(frame)
        this.setInteractive();

        this.on('pointerdown', () => this.setTint(Button.PRESS_TINT) )
            .on('pointerup', () => this.setTint(Button.HOVER_TINT) )
            .on('pointerover', () => this.setTint(Button.HOVER_TINT) )
            .on('pointerout',  () => this.clearTint() )
        
        if(once) this.once('pointerup', () => this.performAction(callback) );
        else this.on('pointerup', () => this.performAction(callback) );

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

    performAction(callback) {
        this.playPressSound();
        this.setTint(Button.HOVER_TINT);
        callback();
    }

    playPressSound() {
        let clickSound = this.scene.sound.add('button-click');
        clickSound.play();
    }

}