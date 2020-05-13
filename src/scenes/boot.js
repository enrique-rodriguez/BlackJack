import 'phaser';

import CONSTANTS from "../constants";
import BaseScene from "./base";
import {
    DPR
} from "../utils/dpr";

/**
 * First scene that is runned. Only used for preloading basic assets.
 *
 * @export
 * @class Boot
 * @extends {BaseScene}
 */
export default class Boot extends BaseScene {

    /**
     *Creates an instance of Boot.
     * @memberof Boot
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.Boot);
    }

    /**
     * Preloads the boot image that will be used by the preloader.
     *
     * @memberof Boot
     */
    preload() {
        this.load.image('boot', '../assets/images/boot@' + DPR + 'x.png');
    }

    /**
     * Creates the scene (Transitions to the Preloader Scene).
     *
     * @memberof Boot
     */
    create() {
        super.create(() => {
            this.scene.start(CONSTANTS.Scenes.Keys.Preloader);
        });
    }
}