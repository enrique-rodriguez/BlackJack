import CONSTANTS from "../constants";
import BaseScene from "./base";
import ProgressBar from "../utils/progress";
import Tween from "../animation/tween";

import { DPR } from "../utils/dpr";


const sounds = ['button-click', 'music', 'ambience'];
const images = ['table', 'blackjack', 'red carpet'];
const atlas  = ['chips', 'cards', 'buttons'];


export default class Preloader extends BaseScene {
    
    constructor() {
        super(CONSTANTS.Scenes.Keys.Preloader);
    }

    multiSoundPreload(sound, count) {
        for(var i = 1; i <= count; i++) {
            let fileName = sound + i;
            let path = CONSTANTS.Paths.AUDIO + fileName + ".mp3";

            this.load.audio(fileName, path);            
        }
    }

    preload() {
        
        this.grid = this.makeGrid(15, 15);
        this.progressBar = new ProgressBar(this);
        this.loadingImage = this.add.image(0, 0, "boot").setScale(0.5);

        this.grid.placeAtIndex(112, this.loadingImage);

        this.displayProgress();
        this.preloadImages();
        this.preloadSounds();
    }

    preloadImages() {
        
        atlas.forEach(ats => {
            let imagePath = CONSTANTS.Paths.IMAGES + ats + '@' + DPR + 'x.png';
            let jsonPath  = CONSTANTS.Paths.JSONS  + ats + '@' + DPR + 'x.json';

            this.load.atlas(ats, imagePath, jsonPath);
        })
        
        images.forEach( image => {
            let path = CONSTANTS.Paths.IMAGES + image + '@' + DPR + 'x.png';
            this.load.image(image, path);
        })

    }

    preloadSounds() {

        sounds.forEach( sound => {
            let path = CONSTANTS.Paths.AUDIO + sound + ".mp3";

            this.load.audio(sound, path);
        })

        this.multiSoundPreload("card_deal", CONSTANTS.Sounds.CARD_DEAL);
        this.multiSoundPreload("card_flip", CONSTANTS.Sounds.CARD_FLIP)
        this.multiSoundPreload("bet", CONSTANTS.Sounds.POKER_CHIP);
    }

    displayProgress() {

        this.load.on('progress', function(value) {
            this.progressBar.update(value);
        }, this);

        this.load.on('complete', function() {
            this.progressBar.setText("Click to Start Game");
        }, this);
    }

    create() {
        super.create( () => {
            // Make the user interact with the browser to allow autoplay.
            
            if(CONSTANTS.DEBUG) {
                this.transitionToMenuScene();
            } else {
                this.input.on('pointerdown', function(){  
                    this.transitionToMenuScene();
                }, this);
            }

        });
    }

    transitionToMenuScene() {
        this.progressBar.destroy();

        this.getMusicInstance().play();
        let ambience = this.sound.add('ambience', {mute: true, loop: true, volume: 0.1});
        ambience.play();
        Tween.fade(this, this.loadingImage, () => this.scene.start(CONSTANTS.Scenes.Keys.Menu));
    }
}