import CONSTANTS from "../constants";
import BaseScene from "./base";
import Button from "../sprites/buttons/button";
import Dealer from "../game/player/dealer";
import Player from "../game/player/player";
import Text from "../text/text";


/**
 *
 *
 * @export
 * @class GameScene
 * @extends {BaseScene}
 */
export default class GameScene extends BaseScene {

    /**
     * Creates an instance of GameScene.
     * @memberof GameScene
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.Game);
    }

    /**
     * Initialization of non scene dependant variables.
     *
     * @memberof GameScene
     */
    init() {

    }

    /**
     * Creates all of the elements fort this scene.
     *
     * @memberof GameScene
     */
    create() {
        super.create(() => {
            this.table = this.add.image(0, 0, 'table').setScale(1.65);
            this.player = new Player(CONSTANTS.Player.Money);
            this.dealer = new Dealer();
            this.balance = new Text(this, `$${this.player.money}`);

            this.game.player = this.player;

            this.grid.placeAtIndex(112, this.table);
            this.grid.placeAtIndex(181, this.balance);

            this.createButtons();

            this.scene.launch(CONSTANTS.Scenes.Keys.Betting, {
                player: this.player,
                balance: this.balance,
                dealer: this.dealer
            });

        });

    }

    /**
     * Creates the music and menu buttons.
     *
     * @memberof GameScene
     */
    createButtons() {
        this.musicButton = new Button(this, this.getMusicButtonTexture(), () => this.toggleMusic());
        this.menuButton = new Button(this, "Home", () => this.goToMenuScene());

        this.grid.placeAtIndex(208, this.menuButton);
        this.grid.placeAtIndex(209, this.musicButton);
    }

    /**
     * Toggles the music on and off.
     *
     * @memberof GameScene
     */
    toggleMusic() {
        super.toggleMusic();
        this.musicButton.setFrame(this.getMusicButtonTexture());
    }

    /**
     * Transitions to the menu scene.
     *
     * @memberof GameScene
     */
    goToMenuScene() {
        let playScene = this.scene.get(CONSTANTS.Scenes.Keys.PlayerPlay);

        playScene.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.stop(CONSTANTS.Scenes.Keys.Game);
            this.scene.stop(CONSTANTS.Scenes.Keys.Betting);
            this.scene.stop(CONSTANTS.Scenes.Keys.Deal);
            this.scene.stop(CONSTANTS.Scenes.Keys.PlayerPlay);
            this.scene.start(CONSTANTS.Scenes.Keys.Menu);
        });

        playScene.cameras.main.fadeOut(1000, 0, 0, 0);
    }
}