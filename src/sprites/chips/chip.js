import Sprite from "../sprite";
import ChipModel from "../../game/chip";
import CONSTANTS from "../../constants";

export default class Chip extends Sprite {

    constructor(scene, config) {
        config.texture = "chips";
        config.frame = "$" + config.value;
        config.interactive = true;

        super(scene, config);

        this.model = new ChipModel(config.value);

    }

    getValue() {
        return this.model.value;
    }

    getRandomSound() {
        let sound = "bet" + (Math.floor(Math.random() * CONSTANTS.Sounds.POKER_CHIP) + 1);
        return this.scene.sound.add(sound);
    }

    create() {
        super.create();

        this.on("pointerup", ()=>{
            this.getRandomSound().play();
        })
    }
}