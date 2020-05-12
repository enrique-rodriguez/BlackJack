import "phaser";
import CONSTANTS from "../constants";
import Grid from "../utils/grid";



export default class BaseScene extends Phaser.Scene {

    static music = null;

    constructor(id) {
        super(id);
    }

    getMusicInstance() {
        if(BaseScene.music == null)
            BaseScene.music = this.sound.add('music', {mute: CONSTANTS.DEBUG, loop: true, volume: 0.2});
        return BaseScene.music;
    }

    toggleMusic() {
        let music = this.getMusicInstance();
        music.mute = !music.mute
        return music.mute;
    }

    isMusicMuted() {
        return this.getMusicInstance().mute;
    }

    getMuiscButtonTexture() {
        return this.isMusicMuted() ? "Sound_On" : "Sound_Off";
    }

    makeGrid(rows, cols) {

        var config = {
            scene: this,
            cols: cols,
            rows: rows
        }

        return new Grid(config);
    }

    create(childCreate) {
        this.grid = this.makeGrid(15, 15);
        
        if(childCreate) childCreate();

        if(CONSTANTS.DEBUG) {
            this.grid.showNumbers();
        } 
    }
}