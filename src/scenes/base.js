import "phaser";
import CONSTANTS from "../constants";
import Grid from "../utils/grid";


/**
 * Abstract Scene. contains useful methods used by its subclasses.
 *
 * @export
 * @class BaseScene
 * @extends {Phaser.Scene}
 */
export default class BaseScene extends Phaser.Scene {

    /**
     * The instance for the game's music.
     *
     * @static
     * @memberof BaseScene
     */
    static music = null;

    /**
     * The instance for the game's ambience sound.
     *
     * @static
     * @memberof BaseScene
     */
    static ambience = null;

    /**
     * Creates an instance of BaseScene.
     * @param {*} id
     * @memberof BaseScene
     */
    constructor(id) {
        super(id);
    }

    /**
     * Returns the instance of the music object. Creates it if it doesn't exist.
     *
     * @returns
     * @memberof BaseScene
     */
    getMusicInstance() {
        if (BaseScene.music == null)
            BaseScene.music = this.sound.add('music', {
                mute: CONSTANTS.DEBUG,
                loop: true,
                volume: 0.2
            });
        return BaseScene.music;
    }

    /**
     * Returns the instance of the ambience object. Creates it if it doesn't exist.
     *
     * @returns
     * @memberof BaseScene
     */
    getAmbienceInstance() {
        if (BaseScene.ambience == null)
            BaseScene.ambience = this.sound.add('ambience', {
                mute: true,
                loop: true,
                volume: 0.1
            });
        return BaseScene.ambience;
    }


    /**
     * Toggle's the game's music on and off.
     *
     * @memberof BaseScene
     */
    toggleMusic() {
        let music = this.getMusicInstance();
        music.mute = !music.mute
    }

    /**
     * Returns true if the game is muted. False otherwise.
     *
     * @returns
     * @memberof BaseScene
     */
    isMusicMuted() {
        return this.getMusicInstance().mute;
    }

    /**
     * Returns the appropriate texture for the music button.
     *
     * @returns "Sound_On" | "Sound_Off"
     * @memberof BaseScene
     */
    getMusicButtonTexture() {
        return this.isMusicMuted() ? "Sound_On" : "Sound_Off";
    }

    /**
     * Creates the grid system for the scene.
     *
     * @param {number} rows Number of rows for the grid.
     * @param {number} cols Number of columns for the grid.
     * @returns Grid object.
     * @memberof BaseScene
     */
    makeGrid(rows, cols) {
        return new Grid({
            scene: this,
            cols: cols,
            rows: rows
        });
    }

    /**
     * Creates the scene. Takes a create function, ideally from its subclass.
     * In order to take advantage of the grid system, the components must be initialized
     * after the grid has been created.
     *
     * @param {function} childCreate
     * @memberof BaseScene
     */
    create(childCreate) {

        this.grid = this.makeGrid(15, 15);

        if (childCreate) childCreate();

        if (CONSTANTS.DEBUG) {
            this.grid.showNumbers();
        }

        this.landscape = this.add.image(0, 0, 'landscape').setVisible(false);
        this.grid.placeAtIndex(112, this.landscape);
        this.checkOriention(this.scale.orientation);
        this.scale.on('orientationchange', this.checkOriention, this);
    }

    /**
     * Verifies the device's orientation. Blocks the viewport if the 
     * device is in portrait mode.
     *
     * @param {*} orientation
     * @memberof BaseScene
     */
    checkOriention(orientation) {
        if (orientation === Phaser.Scale.PORTRAIT) {
            this.landscape.setVisible(true);
        } else if (orientation === Phaser.Scale.LANDSCAPE) {
            this.landscape.setVisible(false);
        }
    }
}