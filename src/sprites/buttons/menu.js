import CONSTANTS from "../../constants";
import Button from "./button";



export default class MenuButton extends Button {

    constructor(scene) {
        
        let config = {
            frame: "menu",
            indexPos: 208
        }

        super(scene, config)
    }

    create() {
        super.create();

        this.on("pointerup", () => {
            this.scene.scene.stop(CONSTANTS.Scenes.Keys.Game);
            this.scene.scene.stop(CONSTANTS.Scenes.Keys.Betting);
            this.scene.scene.start(CONSTANTS.Scenes.Keys.Menu, {music: this.scene.music});
        })
    }

}