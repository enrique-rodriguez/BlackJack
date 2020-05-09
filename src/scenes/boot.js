import 'phaser';

import CONSTANTS from "../constants";
import BaseScene from "./base";
import { DPR } from "../utils/dpr";

export default class Boot extends BaseScene {

    constructor() {
        super(CONSTANTS.Scenes.Keys.Boot);
    }

    preload() {
        this.load.image('boot', '../assets/images/boot@' + DPR + 'x.png');
    }

    create() {
        super.create(()=>{
            this.scene.start(CONSTANTS.Scenes.Keys.Preloader);
        });
    }
}