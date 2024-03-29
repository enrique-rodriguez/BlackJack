import 'phaser';

import CONSTANTS from "./constants";
import {
    DPR
} from "./utils/dpr";

const width = 1200;
const height = 800;


export default {
    type: Phaser.AUTO,

    parent: "blackjack",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        zoom: 1 / DPR,
        width: width * DPR,
        height: height * DPR,
    },

    antialias: true,

    pixelArt: false,

    scene: CONSTANTS.Scenes.Classes,

    audio: {
        disableWebAudio: true
    },
}