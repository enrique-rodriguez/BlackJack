import CONSTANTS from "../constants";
import BaseScene from "./base";
import LoadingImage from "../images/loading";
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

    preload() {
        
        this.grid = this.makeGrid(15, 15);
        this.progressBar = new ProgressBar(this);
        this.loadingImage = new LoadingImage(this.grid);

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

        for(var i = 1; i <= CONSTANTS.Sounds.CARD_FLIP; i++) {
            let sound = 'card_flip' + i;
            let path = CONSTANTS.Paths.AUDIO + sound + ".mp3";

            this.load.audio(sound, path);            
        }

        for(var i = 1; i <= CONSTANTS.Sounds.POKER_CHIP; i++) {
            let sound = 'bet' + i;
            let path = CONSTANTS.Paths.AUDIO + sound + ".mp3";

            this.load.audio(sound, path);            
        }
    }

    displayProgress() {

        this.load.on('progress', function(value) {
            this.progressBar.update(value);
        }, this);

        this.load.on('complete', function() {
            this.progressBar.setText("Click to start");
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

        let music = this.sound.add('music', {mute: false, loop: true, volume: 0.2});
        let ambience = this.sound.add('ambience', {mute: false, loop: true, volume: 0.1});

        Tween.fade(this, this.loadingImage, ()=>{
            music.play();
            ambience.play();
            this.scene.start(CONSTANTS.Scenes.Keys.Menu, {music: music, ambience: ambience });
        });
    }
}