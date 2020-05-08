import CONSTANTS from "../../constants";
import Sprite from "../sprite";
import FlipAnimation from "../../animation/flip";

export default class Card extends Sprite {

    static backTexture = {
        red: 'back-red',
        blue: 'back-blue',
        black: 'back-black'
    };

    constructor(scene, config) {

        let _config = {
            texture: "cards",
            backTexture: Card.backTexture.black
        }
        
        _config = Object.assign(config, _config);

        super(scene, config);

        if(config.flipped) 
            this.changeTexture();

        this.flipAnimation = new FlipAnimation(scene, this, 1);
    }

    getRandomSound() {
        let sound = "card_flip" + (Math.floor(Math.random() * CONSTANTS.Sounds.CARD_FLIP) + 1);
        return this.scene.sound.add(sound);
    }

    flip() {
        this.getRandomSound().play();

        this.flipAnimation.animate({
            onComplete: ()=>{
                this.changeTexture();
            }
        });
    }



    changeTexture() {
        let texture;

        if(this.frame.name == this.config.backTexture) 
            texture = this.config.frame;
        else
            texture = this.config.backTexture;

        this.setFrame(texture);
    }
    
}