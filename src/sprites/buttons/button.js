import "phaser";
import Tween from "../../animation/tween";


export default class Button extends Phaser.GameObjects.Sprite {

    static HOVER_TINT = 0xcccccc;
    static PRESS_TINT = 0x888888;

    constructor(scene, frame, callback, once = false) {
        super(scene);

        this.clickSound = this.scene.sound.add('button-click');

        scene.add.existing(this);
        this.setScale(1);
        this.setTexture("buttons");
        this.setFrame(frame)
        this.setInteractive();

        this.on('pointerdown', () => this.setTint(Button.PRESS_TINT))
            .on('pointerup', () => this.setTint(Button.HOVER_TINT))
            .on('pointerover', () => this.setTint(Button.HOVER_TINT))
            .on('pointerout', () => this.clearTint())

        if (once) this.once('pointerup', () => this.performAction(callback));
        else this.on('pointerup', () => this.performAction(callback));

    }

    setClickSound(sound) {
        this.clickSound.destroy();
        this.clickSound = this.scene.sound.add(sound);

        return this;
    }

    performAction(callback) {
        this.playPressSound();
        this.setTint(Button.HOVER_TINT);
        callback();
    }

    playPressSound() {
        this.clickSound.play();
    }

}