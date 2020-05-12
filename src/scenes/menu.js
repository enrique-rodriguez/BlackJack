import CONSTANTS from "../constants";
import BaseScene from "./base";
import Button from "../sprites/buttons/button";
import Card from "../sprites/cards/card";
import CardModel from "../game/card";
import Tween from "../animation/tween";
import "phaser";


/**
 * Scene for displaying the menu screen of the game.
 *
 * @export
 * @class Menu
 * @extends {BaseScene}
 */
export default class Menu extends BaseScene {
    
    /**
     *Creates an instance of Menu.
     * @memberof Menu
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.Menu);
    }

    /**
     * Initialization of none scene dependant variables.
     *
     * @memberof Menu
     */
    init() {
        this.cardRotationSpeed = 1;
    }

    /**
     * Setup for the scene.
     *
     * @memberof Menu
     */
    create() {
        super.create( () => {
            this.createComponents();
            this.placeComponents();
            this.animateToScene();
        });
    }

    /**
     * Creates the components for the scene, like buttons, 
     * images and sprites.
     *
     * @memberof Menu
     */
    createComponents() {
        this.carpet = this.add.image(0, 0, 'red carpet');
        this.banner = this.add.image(0, 0, 'blackjack');
        this.menuCard = new Card(this, new CardModel('spade', 'A'), false).setInteractive();

        this.playButton = new Button(this, "Play", () => this.playGame(), true);
        this.maximizeButton = new Button(this, "Maximize", () => this.scale.toggleFullscreen());            
        this.musicButton = new Button(this, this.getMusicButtonTexture(), () => this.toggleMusic(), false);
    }

    /**
     * Places all of the components in the scene using grid indices.
     *
     * @memberof Menu
     */
    placeComponents() {
        this.grid.placeAtIndex(112, this.carpet);
        this.grid.placeAtIndex(37 , this.banner);
        this.grid.placeAtIndex(195, this.playButton);
        this.grid.placeAtIndex(209, this.musicButton);
        this.grid.placeAtIndex(14 , this.maximizeButton);
    }

    /**
     * Callback function for when the play button is pressed.
     *
     * @memberof Menu
     */
    playGame() {
        this.interactiveButtons(false);
        this.menuCard.flip();
        this.cardRotationSpeed = 10;
        setTimeout( () => this.animateToGameScene(), 200);
    }

    /**
     * Helper method that enables/disables the buttons in the scene.
     *
     * @param {boolean} option
     * @memberof Menu
     */
    interactiveButtons(option) {
        this.playButton.setInteractive(option);
        this.musicButton.setInteractive(option);
        this.maximizeButton.setInteractive(option);
    }

    /**
     * Adds the animation for transitioning into the game scene.
     *
     * @memberof Menu
     */
    animateToGameScene() {
        Tween.exitRight(this, this.menuCard);
        Tween.exitDown(this, this.musicButton);
        Tween.exitDown(this, this.maximizeButton);
        Tween.exitDown(this, this.playButton);

        Tween.dim(this, this.carpet);
        Tween.dim(this, this.banner, () => this.scene.start(CONSTANTS.Scenes.Keys.Game));
    }

    /**
     * Toggles the music on/off and changes the texture of the button accordingly.
     *
     * @memberof Menu
     */
    toggleMusic() {
        super.toggleMusic();
        this.musicButton.setFrame(this.getMuiscButtonTexture());
    }

    /**
     * Adds the animation for entering the scene.
     *
     * @memberof Menu
     */
    animateToScene() {
        Tween.toIndex(this, {target: this.menuCard, index: 127, duration: 1000});
        Tween.toIndex(this, {target: this.playButton, index: 202, duration: 1000});
        Tween.toIndex(this, {target: this.musicButton, index: 204, duration: 1000});
        Tween.toIndex(this, {target: this.maximizeButton, index: 209, duration: 1000});
    }

    /**
     * Method that gets called after each frame. Updates the menu card's rotation.
     *
     * @memberof Menu
     */
    update() {
        this.menuCard.angle += this.cardRotationSpeed;
    }
}