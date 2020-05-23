import 'phaser';
import config from "./config";
import CONSTANTS from "./constants";


/**
 * Main controller for the entire Phaser game. It is responsible
 * for handling the boot process, parsing the configuration values, creating the renderer,
 * and setting-up all of the global Phaser systems, such as sound and input. *
 
 * @export
 * @class BlackJack
 * @extends {Phaser.Game}
 */
export default class BlackJack extends Phaser.Game {

    /**
     * Creates an instance of BlackJack.
     * @memberof BlackJack
     */
    constructor() {
        super(config);
    }

}