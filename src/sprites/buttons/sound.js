import Button from "./button";


export default class SoundButton extends Button {

    static ON  = "Sound_On";
    static OFF = "Sound_Off";

    constructor(scene, index) {

        let config = {
            frame: scene.music.mute ? SoundButton.ON : SoundButton.OFF,
            indexPos: index
        }

        super(scene, config);
    }

    create() {
        super.create();
        this.on('pointerup', this.toggle, this);
    }

    toggle() {

        this.scene.music.mute = !this.scene.music.mute

        let frame = this.scene.music.mute ? SoundButton.ON : SoundButton.OFF;
        
        this.setFrame(frame);
    }
}