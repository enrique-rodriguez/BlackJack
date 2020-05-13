
import Boot from "./scenes/boot";
import Preloader from "./scenes/preloader";
import Menu from "./scenes/menu";
import Game from "./scenes/game";
import Betting from "./scenes/betting";
import StartRound from "./scenes/round";


const ASSETS_PATH = "./assets/";
const IMAGES_PATH = ASSETS_PATH + "images/";
const JSONS_PATH  = ASSETS_PATH + "json/";
const AUDIO_PATH  = ASSETS_PATH + "audio/";


export default {

	DEBUG: false,

	Player: {
		Money: 5000
	},

	Scenes: {
		Keys: {
			Boot: "Boot",
			Preloader: "Preloader",
			Menu: "Menu",
			Game: "Game",
			Betting: "Betting",
			Round: "StartRound"
		},
		Classes: [
			Boot, 
			Preloader, 
			Menu, 
			Game, 
			Betting, 
			StartRound
		]
	},

	Paths: {
		ASSETS: ASSETS_PATH,
		IMAGES: IMAGES_PATH,
		JSONS: JSONS_PATH,
		AUDIO: AUDIO_PATH,
	},

	Sounds: {
		CARD_FLIP: 5,
		CARD_DEAL: 5,
		POKER_CHIP: 4,
	}
}

