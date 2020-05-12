import CONSTANTS from "../constants";
import BaseScene from "./base";
import Button from "../sprites/buttons/button";
import Card from "../sprites/cards/card";
import CardModel from "../game/card";
import Tween from "../animation/tween";
import "phaser";


export default class Menu extends BaseScene {
    
    constructor() {
        super(CONSTANTS.Scenes.Keys.Menu);
    }

    init() {
        this.cardRotationSpeed = 1;
    }

    create() {
        super.create( () => {
            this.createComponents();
            this.placeComponents();
            this.animateToScene();
        });
    }

    createComponents() {
        this.carpet = this.add.image(0, 0, 'red carpet');
        this.banner = this.add.image(0, 0, 'blackjack');
        this.menuCard = new Card(this, new CardModel('spade', 'A'), false).setInteractive();

        this.playButton = new Button(this, "Play", () => this.playGame(), true);
        this.maximizeButton = new Button(this, "Maximize", () => this.enterFullscreen());            
        this.musicButton = new Button(this, this.getMuiscButtonTexture(), () => this.toggleMusic(), false);
    }

    enterFullscreen() {
        this.scale.toggleFullscreen();
    }

    placeComponents() {
        this.grid.placeAtIndex(112, this.carpet);
        this.grid.placeAtIndex(37 , this.banner);
        this.grid.placeAtIndex(195, this.playButton);
        this.grid.placeAtIndex(209, this.musicButton);
        this.grid.placeAtIndex(14 , this.maximizeButton);
    }

    playGame() {
        this.interactiveButtons(false);
        this.menuCard.flip();
        this.cardRotationSpeed = 10;
        setTimeout( () => this.animateToGameScene(), 200);
    }

    interactiveButtons(option) {
        this.playButton.setInteractive(option);
        this.musicButton.setInteractive(option);
        this.maximizeButton.setInteractive(option);
    }

    animateToGameScene() {
        Tween.exitRight(this, this.menuCard);
        Tween.exitDown(this, this.musicButton);
        Tween.exitDown(this, this.maximizeButton);
        Tween.exitDown(this, this.playButton);

        Tween.dim(this, this.carpet);
        Tween.dim(this, this.banner, () => this.scene.start(CONSTANTS.Scenes.Keys.Game));
    }

    toggleMusic() {
        super.toggleMusic();
        this.musicButton.setFrame(this.getMuiscButtonTexture());
    }

    animateToScene() {
        Tween.toIndex(this, {target: this.menuCard, index: 127, duration: 1000});
        Tween.toIndex(this, {target: this.playButton, index: 202, duration: 1000});
        Tween.toIndex(this, {target: this.musicButton, index: 204, duration: 1000});
        Tween.toIndex(this, {target: this.maximizeButton, index: 209, duration: 1000});
    }

    update() {
        this.menuCard.angle += this.cardRotationSpeed;
    }
}