import "phaser";

import { DPR } from "../utils/dpr";


export default class Text extends Phaser.GameObjects.Text {

	static FONT_SIZE = 35;

	constructor(scene, config) {
		super(scene);
		scene.add.existing(this);
		scene.grid.placeAtIndex(config.indexPos, this);
		
		this.setOrigin(0.5);
        this.setStroke(0x000000, 10);
        this.setFontSize(Text.FONT_SIZE);
	}

	setFontSize(fontSize) {
		super.setFontSize(fontSize * DPR);
	}

}