import CONSTANTS from "../constants";
import BaseScene from "./base";
import Table from "../images/table";
import MenuButton from "../sprites/buttons/menu";
import SoundButton from "../sprites/buttons/sound";
import Dealer from "../game/player/dealer";
import Player from "../game/player/player";


export default class GameScene extends BaseScene {
    constructor() {
        super(CONSTANTS.Scenes.Keys.Game);
    }

    init(data) {
        this.music = data.music;
    }

    create() {
        super.create( ()=> {
            this.table = new Table(this);
            this.player = new Player(this, 5000);
            this.dealer = new Dealer();

            this.soundButton = new SoundButton(this, 209);
            this.menuButton = new MenuButton(this);

            this.scene.launch(CONSTANTS.Scenes.Keys.Betting, {
                player: this.player,
                dealer: this.dealer
            });
        });



    }
}