import BaseScene from "./base";
import CONSTANTS from "../constants";
import Button from "../sprites/buttons/button";
import Text from "../text/text";

const Win = {
    Tie: 1,
    Blackjack: 2.5,
    BetterHand: 2.0
}

/**
 *
 *
 * @export
 * @class PlayerPlayScene
 * @extends {BaseScene}
 */
export default class PlayerPlayScene extends BaseScene {

    /**
     *Creates an instance of PlayerPlayScene.
     * @memberof PlayerPlayScene
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.PlayerPlay);
    }

    /**
     *
     *
     * @param {*} data
     * @memberof PlayerPlayScene
     */
    init(data) {
        this.blackjack = data;
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    create() {
        super.create(() => {
            this.createSounds();
            this.createUiComponents();
            this.placeUiComponents();
        });
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    createSounds() {
        this.loseSound = this.sound.add('lose', {
            volume: 0.5
        });

        this.winBlackjackSound = this.sound.add('blackjack', {
            volume: 0.5
        });

        this.winHandSound = this.sound.add('win', {
            volume: 0.5
        });
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    createUiComponents() {
        this.blackjackText = new Text(this, "Blackjack!")
            .setVisible(false)
            .setOrigin(0.5, 0.5);

        this.hitButton = new Button(this, 'Hit', () => this.hitButtonHandler())
            .setAlpha(0)
            .disableInteractive()
            .setClickSound('hit_click');

        this.standButton = new Button(this, 'Stand', () => this.finishedHittingHandler())
            .setAlpha(0)
            .disableInteractive()
            .setClickSound('stand_click');
    }

    placeUiComponents() {
        this.grid.placeAtIndex(107, this.hitButton);
        this.grid.placeAtIndex(152, this.standButton);
        this.grid.placeAtIndex(112, this.blackjackText);
    }

    /**
     *
     *
     * @param {*} visibility
     * @memberof PlayerPlayScene
     */
    setButtonsVisibility(visibility) {
        this.hitButton.setVisible(visibility);
        this.standButton.setVisible(visibility);
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    play() {
        if (this.blackjack.player.hasBlackjack())
            this.handleBlackjack();
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    handleBlackjack() {
        this.animateBlackjackText();
        this.playerWins(Win.Blackjack, false);
        this.fadeButtons("out");
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    animateBlackjackText() {
        this.winBlackjackSound.play();
        this.children.bringToTop(this.blackjackText);

        this.tweens.add({
            targets: this.blackjackText,
            scale: 8,
            onStart: () => this.blackjackText.setVisible(true),
            onComplete: () => this.fadeOutBlackjackText()
        })
        // check if dealer also has a blackjack to handle tie.
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    fadeOutBlackjackText() {
        this.tweens.add({
            targets: this.blackjackText,
            alpha: 0,
            ease: 'Linear'
        })
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    finishedHittingHandler() {
        let dealScene = this.scene.get(CONSTANTS.Scenes.Keys.Deal);
        dealScene.flipDealersDownCard();

        this.fadeButtons("out", () => this.dealerPlay());
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    dealerPlay() {
        let dealScene = this.scene.get(CONSTANTS.Scenes.Keys.Deal);
        dealScene.updateDealerScore();

        let dealersHandTotal = this.blackjack.dealer.getHandTotal();

        if (dealersHandTotal < 17) {
            let card = dealScene.createCardObject(dealScene.dealerIndex++, true);
            this.tweens.add(dealScene.createTween(card,
                () => this.dealerPlay()))
        } else if (dealersHandTotal > 21)
            this.playerWins(Win.BetterHand);
        else if (dealersHandTotal > this.blackjack.player.getHandTotal())
            this.dealerWins();
        else if (this.blackjack.player.getHandTotal() > dealersHandTotal)
            this.playerWins(Win.BetterHand);
        else {
            this.tie();
        }
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    tie() {
        console.log("Tie");
        this.startNewRoundAndMovePotTo(211);
        this.rewardPlayer(Win.Tie)
    }

    /**
     *
     *
     * @param {*} multiplier
     * @memberof PlayerPlayScene
     */
    playerWins(multiplier, playWinSound = true) {
        console.log("Player wins");
        if (playWinSound) this.winHandSound.play();
        this.rewardPlayer(multiplier);
        this.startNewRoundAndMovePotTo(211);
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    dealerWins() {
        console.log("Dealer wins");

        this.loseSound.play();
        this.startNewRoundAndMovePotTo(7);
    }

    /**
     *
     *
     * @param {*} multiplier
     * @memberof PlayerPlayScene
     */
    rewardPlayer(multiplier) {
        let bettingScene = this.scene.get(CONSTANTS.Scenes.Keys.Betting);
        bettingScene.payoutPlayer(multiplier);
    }

    /**
     *
     *
     * @param {*} index
     * @memberof PlayerPlayScene
     */
    startNewRoundAndMovePotTo(index) {
        let bettingScene = this.scene.get(CONSTANTS.Scenes.Keys.Betting);
        bettingScene.startNewRoundAndMovePotTo(index);
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    hitButtonHandler() {
        let dealScene = this.scene.get(CONSTANTS.Scenes.Keys.Deal);
        let card = dealScene.createCardObject(dealScene.playerIndex++, false, this.blackjack.player);
        let tween = dealScene.createTween(card, () => this.cardDealtHandler(dealScene));

        this.hitButton.disableInteractive();
        this.tweens.add(tween);
    }

    /**
     *
     *
     * @param {*} dealScene
     * @memberof PlayerPlayScene
     */
    cardDealtHandler(dealScene) {
        dealScene.updatePlayerScore();
        this.hitButton.setInteractive();

        if (this.blackjack.player.isBusted()) {
            this.loseSound.play();
            this.hitButton.disableInteractive();
            this.startNewRoundAndMovePotTo(7);
            this.fadeButtons("out");
        } else if (this.blackjack.player.getHandTotal() == 21) {
            this.finishedHittingHandler();
        }
    }

    /**
     *
     *
     * @memberof PlayerPlayScene
     */
    fadeButtons(type, onComplete) {
        this.tweens.add({
            targets: [this.hitButton, this.standButton],
            ease: "Linear",
            alpha: type == "out" ? 0 : 1,
            onStart: type == "out" ? (_, targets) => targets.forEach(t => t.disableInteractive(false)) : null,
            onComplete: onComplete
        });
    }
}