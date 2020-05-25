import CONSTANTS from "../constants";
import BaseScene from "./base";
import ProgressBar from "../utils/progress";
import Tween from "../animation/tween";

import {
    DPR
} from "../utils/dpr";

// Assets to be loaded

const sounds = [
    'button-click', 'music', 'ambience', 'hit_click', 'shuffling',
    'stand_click', 'deal_click', 'win', 'lose', 'blackjack', 'clear_cards'
];

const images = ['table', 'blackjack', 'red carpet', 'landscape'];
const atlas = ['chips', 'cards', 'buttons'];


/**
 * Scene responsible for loading all of the necessary assets in the game.
 *
 * @export
 * @class Preloader
 * @extends {BaseScene}
 */
export default class Preloader extends BaseScene {

    /**
     *Creates an instance of Preloader.
     * @memberof Preloader
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.Preloader);
    }

    /**
     * For loading sounds that have multiple audio files.
     *
     * @param {String} sound
     * @param {number} count
     * @memberof Preloader
     */
    multiSoundPreload(sound, count) {
        for (var i = 1; i <= count; i++) {
            let fileName = sound + i;
            let path = CONSTANTS.Paths.AUDIO + fileName + ".mp3";

            this.load.audio(fileName, path);
        }
    }

    /**
     * Preload entry point.
     *
     * @memberof Preloader
     */
    preload() {
        this.grid = this.makeGrid(15, 15);
        this.progressBar = new ProgressBar(this);
        this.loadingImage = this.add.image(0, 0, "boot").setScale(0.5);

        this.grid.placeAtIndex(112, this.loadingImage);

        this.displayProgress();
        this.preloadImages();
        this.preloadSounds();
    }

    /**
     * Loads all of the images in the game.
     *
     * @memberof Preloader
     */
    preloadImages() {
        atlas.forEach(ats => {
            let imagePath = CONSTANTS.Paths.IMAGES + ats + '@' + DPR + 'x.png';
            let jsonPath = CONSTANTS.Paths.JSONS + ats + '@' + DPR + 'x.json';
            this.load.atlas(ats, imagePath, jsonPath);
        });

        images.forEach(image => {
            let path = CONSTANTS.Paths.IMAGES + image + '@' + DPR + 'x.png';
            this.load.image(image, path);
        });

    }

    /**
     * Loads all of the sounds in the game.
     *
     * @memberof Preloader
     */
    preloadSounds() {
        sounds.forEach(sound => {
            let path = CONSTANTS.Paths.AUDIO + sound + ".mp3";
            this.load.audio(sound, path);
        })

        this.multiSoundPreload("card_deal", CONSTANTS.Sounds.CARD_DEAL);
        this.multiSoundPreload("card_flip", CONSTANTS.Sounds.CARD_FLIP)
        this.multiSoundPreload("bet", CONSTANTS.Sounds.POKER_CHIP);
    }

    /**
     * Displays the loading progress of the assets.
     *
     * @memberof Preloader
     */
    displayProgress() {
        this.load.on('progress', function (value) {
            this.progressBar.update(value);
        }, this);

        this.load.on('complete', function () {
            this.progressBar.setText("Click to Start Game");
        }, this);
    }

    /**
     * Setup for the scene.
     *
     * @memberof Preloader
     */
    create() {
        super.create(() => {
            // Make the user interact with the browser to allow autoplay.

            if (CONSTANTS.DEBUG) {
                this.scene.start('Game');
            } else {
                this.input.on('pointerdown', () => this.transitionToMenuScene());
            }

        });
    }

    /**
     * Transitions to the menu scene once all of the assets have been loaded into memory.
     *
     * @memberof Preloader
     */
    transitionToMenuScene() {
        this.progressBar.destroy();

        this.getMusicInstance().play();
        this.getAmbienceInstance().play();

        Tween.fade(this, this.loadingImage, () => this.scene.start(CONSTANTS.Scenes.Keys.Menu));
    }
}