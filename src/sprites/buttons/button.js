import Sprite from "../sprite";

export default class Button extends Sprite {

    static HOVER_TINT = 0xcccccc;
    static PRESS_TINT = 0x888888;

    constructor(scene, config) {
        config.scale = 0.45;
        config.texture = "buttons";
        config.interactive = true;

        super(scene, config);
    }

    create() {
        this.clickSound = this.scene.sound.add('button-click');

        this.on('pointerdown', () => {
            this.setTint(Button.PRESS_TINT);
        }, this);

        this.on('pointerup', () => {
            this.clickSound.play();
            this.setTint(Button.HOVER_TINT);
        }, this);

        this.on('pointerover', () => {
            this.setTint(Button.HOVER_TINT);
        });

        this.on('pointerout', () => {
            this.clearTint();
        })

    }
}