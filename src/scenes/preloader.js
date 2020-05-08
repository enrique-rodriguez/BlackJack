import CONSTANTS from "../constants";
import BaseScene from "./base";
import LoadingImage from "../images/loading";
import ProgressBar from "../utils/progress";
import Tween from "../animation/tween";


const sounds = ['button-click', 'music'];
const images = ['red carpet', 'menu_title', 'table'];
const atlas  = ['cards', 'chips', 'buttons'];


export default class Preloader extends BaseScene {
    constructor() {
        super(CONSTANTS.Scenes.Keys.Preloader);
    }

    preload() {
        
        let grid = this.makeGrid(15, 15);

        this.loadingImage = new LoadingImage(grid);

        this.displayProgress();

        this.preloadImages();

        this.preloadSounds();
    }

    preloadImages() {
        
        for(const ats of Object.values(atlas)){
            let imagePath = CONSTANTS.Paths.IMAGES + ats + '.png';
            let jsonPath  = CONSTANTS.Paths.JSONS  + ats + '.json';

            this.load.atlas(ats, imagePath, jsonPath);
        }
        
        for(const image of Object.values(images)) {
            let path = CONSTANTS.Paths.IMAGES + image + '.png';

            this.load.image(image, path);
        }
    }

    preloadSounds() {

        for(const audio of Object.values(sounds)) {
            let path = CONSTANTS.Paths.AUDIO + audio + ".mp3";

            this.load.audio(audio, path);
        }

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
        let progressBar = new ProgressBar(this);

        this.load.on('progress', function(value) {
            progressBar.update(value);
        })

        this.load.on('complete', function() {
            progressBar.destroy();
        })
    }

    create() {
        super.create( () => {
            let music = this.sound.add('music', {mute: true, loop: true, volume: 0.2});

            Tween.fade(this, this.loadingImage, ()=>{
                music.play();
                this.scene.start(CONSTANTS.Scenes.Keys.Menu, {music: music});
            });

        });
    }
}