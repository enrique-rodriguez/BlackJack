import 'phaser';

import CONSTANTS from "./constants";

let clientWidth = document.documentElement.clientWidth
let clientHeight = document.documentElement.clientHeight

const PIXEL_RATIO = (function() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,

        // The backing store size in relation to the canvas element
        bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1

    return dpr / bsr
})();

export default {
    type: Phaser.AUTO,
    parent: "blackjack", 
    scale: {
    	mode: Phaser.Scale.FIT,
    	autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: CONSTANTS.Scenes.Classes,
    audio: {
        disableWebAudio: true
    }
}