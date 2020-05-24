import "phaser";

import {
	DPR
} from "../utils/dpr";


/**
 * Helper class for Higher Resolution Text Labels.
 *
 * @export
 * @class Text
 * @extends {Phaser.GameObjects.Text}
 */
export default class Text extends Phaser.GameObjects.Text {

	/**
	 * The size of the font for all text objects.
	 *
	 * @static
	 * @memberof Text
	 */
	static FONT_SIZE = 35;

	/**
	 * Creates an instance of Text.
	 * @param {*} scene
	 * @param {*} text
	 * @memberof Text
	 */
	constructor(scene, text) {
		super(scene, 0, 0, text);
		scene.add.existing(this);

		this.setOrigin(0.5);
		this.setStroke(0x000000, 10);
		this.setFontSize(Text.FONT_SIZE);
	}

	/**
	 * Sets the font size by the given value.
	 *
	 * @param {*} fontSize
	 * @returns
	 * @memberof Text
	 */
	setFontSize(fontSize) {
		return super.setFontSize(fontSize * DPR);
	}

}