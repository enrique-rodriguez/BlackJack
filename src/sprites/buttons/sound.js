import Button from "./button";


export default class SoundButton extends Button {

    constructor(scene, index) {

        let config = {
            frame: scene.music.mute ? 'sound-on' : 'sound-off',
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

        let frame = this.scene.music.mute ? 'sound-on' : 'sound-off';
        
        this.setFrame(frame);
    }
}