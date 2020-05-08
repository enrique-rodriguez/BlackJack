import CONSTANTS from "../constants";
import BaseScene from "./base";


export default class StartRound extends BaseScene {

	constructor() {
		super(CONSTANTS.Scenes.Keys.Round);
	}

	init(data) {
		this.blackjack = data;

		console.log(data)
	}

	create() {
		super.create( () => {

		})
	}
}