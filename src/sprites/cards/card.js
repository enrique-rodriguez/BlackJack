import CONSTANTS from "../../constants";
import FlipAnimation from "../../animation/flip";

export default class Card extends Phaser.GameObjects.Sprite {

    static SCALE = 1;
    static backTexture = 'back-black';

    constructor(scene, model) {
        super(scene);
        scene.add.existing(this);
        this.model = model;
        this.flipAnimation = new FlipAnimation(scene, this, Card.SCALE);
        this.setTexture("cards");
        this.setScale(Card.SCALE);
        this.setFrame(model.toString());

        if (!model.visible) this.changeTexture();

        this.on('pointerup', this.flip, this);

    }

    getRandomFlipSound() {
        let sound = "card_flip" + (Math.floor(Math.random() * CONSTANTS.Sounds.CARD_FLIP) + 1);
        return this.scene.sound.add(sound);
    }

    getRandomDealSound() {
        let sound = "card_deal" + (Math.floor(Math.random() * CONSTANTS.Sounds.CARD_DEAL) + 1);
        return this.scene.sound.add(sound);
    }

    flip(animate = true) {
        this.getRandomFlipSound().play();

        if (animate) {
            this.flipAnimation.animate({
                onComplete: () => {
                    this.changeTexture();
                }
            });
        }
    }

    place() {
        this.getRandomDealSound().play();
    }


    changeTexture() {
        let texture;

        if (this.frame.name == Card.backTexture)
            texture = this.model.toString();
        else
            texture = Card.backTexture;

        this.setFrame(texture);
    }

}