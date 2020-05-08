import CONSTANTS from "../constants";
import BaseScene from "./base";
import PlayButton from "../sprites/buttons/play";
import SoundButton from "../sprites/buttons/sound";
import MenuCard from "../sprites/cards/menu";
import Carpet from "../images/carpet";
import MenuTitle from "../images/menu_title";
import Tween from "../animation/tween";

export default class Menu extends BaseScene {
    constructor() {
        super(CONSTANTS.Scenes.Keys.Menu);
    }

    init(data) {
        this.music = data.music;
    }

    create() {
        super.create( () => {
            this.carpet = new Carpet(this);
            this.menuTitle = new MenuTitle(this);
            this.playButton = new PlayButton(this);
            this.soundButton = new SoundButton(this, 209);
            this.menuCard = new MenuCard(this);

            this.addTweens();
        });
    }

    addTweens() {
        Tween.toIndex(this, {target: this.menuCard, index: 127, duration: 1000});
        Tween.toIndex(this, {target: this.playButton, index: 202, duration: 1000});
        Tween.toIndex(this, {target: this.soundButton, index: 204, duration: 1000});
    }

    update() {
        this.menuCard.update();
    }
}