import "phaser";

import { DPR } from "../utils/dpr";


export default class Text extends Phaser.GameObjects.Text {

	static FONT_SIZE = 35;

	constructor(scene, text) {
		super(scene, 0, 0, text);
		scene.add.existing(this);
		
		this.setOrigin(0.5);
        this.setStroke(0x000000, 10);
        this.setFontSize(Text.FONT_SIZE);
	}

	setFontSize(fontSize) {
		return super.setFontSize(fontSize * DPR);
	}

}