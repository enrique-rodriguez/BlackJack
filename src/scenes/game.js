import CONSTANTS from "../constants";
import BaseScene from "./base";
import Button from "../sprites/buttons/button";
import Dealer from "../game/player/dealer";
import Player from "../game/player/player";
import Text from "../text/text";


export default class GameScene extends BaseScene {

    constructor() {
        super(CONSTANTS.Scenes.Keys.Game);
    }

    create() {
        super.create(() => {
            this.table = this.add.image(0, 0, 'table').setScale(1.65);
            this.player = new Player(CONSTANTS.Player.Money);
            this.dealer = new Dealer();
            this.balance = new Text(this, `$${this.player.money}`);

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

    createButtons() {
        this.musicButton = new Button(this, this.getMusicButtonTexture(), () => this.toggleMusic());
        this.menuButton = new Button(this, "Home", () => this.goToMenuScene());

        this.grid.placeAtIndex(208, this.menuButton);
        this.grid.placeAtIndex(209, this.musicButton);
    }

    toggleMusic() {
        super.toggleMusic();
        this.musicButton.setFrame(this.getMuiscButtonTexture());
    }

    goToMenuScene() {
        this.scene.stop(CONSTANTS.Scenes.Keys.Game);
        this.scene.stop(CONSTANTS.Scenes.Keys.Betting);
        this.scene.start(CONSTANTS.Scenes.Keys.Menu);
    }
}