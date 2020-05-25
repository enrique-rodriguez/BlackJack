import BaseScene from "./base";
import CONSTANTS from "../constants";
import Card from "../sprites/cards/card";

import Text from "../text/text";


/**
 * Scene that is responsible for dealing the cards to the player and dealer.
 *
 * @export
 * @class DealScene
 * @extends {BaseScene}
 */
export default class DealScene extends BaseScene {

    /**
     *Creates an instance of DealScene.
     * @memberof DealScene
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.Deal);
    }

    /**
     * Initializatin data.
     *
     * @param {*} data
     * @memberof DealScene
     */
    init(data) {
        this.blackjack = data;
    }

    /**
     * creates a card object.
     *
     * @param {*} index
     * @param {boolean} [flipped=false]
     * @param {*} [player=null]
     * @returns
     * @memberof DealScene
     */
    createCardObject(index, flipped = false, player = null) {
        let model = this.getCardModel(player, flipped);

        let pos = this.grid.getIndexPos(7);
        let cardSprite = new Card(this, model).setPosition(pos.x, pos.y);
        this.cardsOnTable.add(cardSprite);

        return {
            card: cardSprite.setVisible(false),
            position: this.grid.getIndexPos(index)
        }
    }


    /**
     * gets a card model using the dealers deck and returns it.
     *
     * @param {*} player
     * @param {*} flipped
     * @returns
     * @memberof DealScene
     */
    getCardModel(player, flipped) {

        try {
            if (player)
                return this.blackjack.dealer.deal(player);
            else
                return this.blackjack.dealer.draw(flipped);
        } catch (e) {
            console.log(e);
            switch (e) {
                case "Empty deck":
                    this.reshuffleSound.play();
                    this.fadeReshufflingText("in", () => this.fadeReshufflingText("out"));
                    this.blackjack.dealer.reshuffle();
                    return this.getCardModel(player, flipped);
                default:
                    throw (e);
            }

        }

    }

    /**
     * Create a tween for the given card.
     *
     * @param {*} card
     * @param {*} onComplete
     * @returns
     * @memberof DealScene
     */
    createTween(card, onComplete) {
        return {
            targets: card.card,
            ease: 'Cubic',
            duration: 300,
            x: card.position.x,
            y: card.position.y,
            onComplete: onComplete,
            onStart: () => {
                card.card.setVisible(true);
                card.card.place();
            },
        };
    }

    /**
     * Create components in the scene.
     *
     * @memberof DealScene
     */
    create() {
        super.create(() => {
            this.clearCardsSound = this.sound.add('clear_cards');
            this.reshuffleSound = this.sound.add('shuffling');
            this.cardsOnTable = this.add.group('cardsOnTable');
            this.createTextComponents();
            this.scene.launch(CONSTANTS.Scenes.Keys.PlayerPlay, this.blackjack);
        });
    }

    /**
     * Creates all of the text components.
     *
     * @memberof DealScene
     */
    createTextComponents() {
        this.playerScore = new Text(this, "0").setVisible(false);
        this.dealerScore = new Text(this, "0").setVisible(false);
        this.reshufflingText = new Text(this, "Reshuffling...").setVisible(false).setAlpha(0);

        this.grid.placeAtIndex(184, this.playerScore);
        this.grid.placeAtIndex(79, this.dealerScore);
        this.grid.placeAtIndex(22, this.reshufflingText);
    }

    /**
     * Flips the dealer's down card and updates its score.
     *
     * @memberof DealScene
     */
    flipDealersDownCard() {
        this.blackjack.dealer.flipDownCard();
        this.blackjack.dealer.setDirty(true);

        this.dealersDownCard.card.flip();
        this.updateDealerScore();
    }

    /**
     * Fades's the reshuffling text.
     *
     * @param {*} type
     * @param {*} onComplete
     * @memberof DealScene
     */
    fadeReshufflingText(type, onComplete) {
        this.tweens.add({
            targets: this.reshufflingText,
            duration: 500,
            alpha: type == "out" ? 0 : 1,
            onStart: type == "in" ? () => this.reshufflingText.setVisible(true) : null,
            yoyo: true,
            repeat: 1,
        })
    }

    /**
     * Creats the first 4 cards dealt at the beginning of the round.
     *
     * @memberof DealScene
     */
    createInitialCards() {
        this.playerIndex = 186;
        this.dealerIndex = 81;

        this.playersFirstCard = this.createCardObject(this.playerIndex++, false, this.blackjack.player);
        this.dealersUpCard = this.createCardObject(this.dealerIndex++, true);
        this.playersSecondCard = this.createCardObject(this.playerIndex++, false, this.blackjack.player);
        this.dealersDownCard = this.createCardObject(this.dealerIndex++, false);
    }

    /**
     * Starts the dealing of the cards.
     *
     * @memberof DealScene
     */
    startDeal() {
        this.createInitialCards();
        this.fadeScoreText("in");
        this.animateCardsToTable();
    }

    /**
     * Animates the initial cards to the table.
     *
     * @memberof DealScene
     */
    animateCardsToTable() {
        this.tweens.timeline({
            tweens: [
                this.createTween(this.playersFirstCard,
                    () => this.updatePlayerScore()),
                this.createTween(this.dealersUpCard,
                    () => this.updateDealerScore()),
                this.createTween(this.playersSecondCard,
                    () => this.updatePlayerScore()),
                this.createTween(this.dealersDownCard,
                    () => this.updateDealerScore())
            ],
            onStart: () => this.setScoreVisibility(true),
            onComplete: () => this.handleCardsDealt()
        });
    }

    /**
     * Sets the player and dealer's score text visibility.
     *
     * @param {*} visibility
     * @memberof DealScene
     */
    setScoreVisibility(visibility) {
        this.playerScore.setVisible(visibility);
        this.dealerScore.setVisible(visibility);
    }

    /**
     * Prepares the scene for a new round.
     *
     * @param {*} onComplete
     * @memberof DealScene
     */
    prepareForNewRound() {

        let position = this.grid.getIndexPos(7);
        let bettingScene = this.scene.get(CONSTANTS.Scenes.Keys.Betting);

        this.tweens.add({
            targets: this.cardsOnTable.getChildren(),
            x: position.x,
            y: position.y - this.game.config.height / 2,
            duration: 500,
            delay: this.tweens.stagger(50),

            onStart: (_, cards) => {
                cards.forEach(card => {
                    if (card.model.visible) card.flip();
                });
                this.clearCardsSound.play();
                this.fadeScoreText("out");
                this.blackjack.dealer.resetHand();
                this.blackjack.player.resetHand();
            },

            onComplete: (_, cardsOnTable) => {
                cardsOnTable.forEach(card => this.cardsOnTable.remove(card, true, true));
                bettingScene.fadeChips("in");
                this.tweens.add({
                    targets: bettingScene.pot.getChildren(),
                    duration: 500,
                    alpha: 0,
                    onComplete: () => {
                        if (this.blackjack.player.money > 0) {
                            bettingScene.prepareForBetting()
                        } else {
                            let gameScene = this.scene.get(CONSTANTS.Scenes.Keys.Game);
                            setTimeout(() => gameScene.goToMenuScene(), 1000);
                        }
                    }
                });
            }
        });
    }


    /**
     *
     *
     * @param {*} type
     * @memberof DealScene
     */
    fadeScoreText(type) {
        this.tweens.add({
            onStart: type == "in" ? () => this.setScoreVisibility(true) : null,
            targets: [
                this.playerScore, this.dealerScore
            ],
            duration: 1000,
            alpha: type == "out" ? 0 : 1,
            ease: "Linear",
            onComplete: type == "out" ? () => this.setScoreVisibility(false) : null
        });
    }

    /**
     * Callback function for when the cards are finished being laid down.
     *
     * @memberof DealScene
     */
    handleCardsDealt() {
        let playScene = this.scene.get(CONSTANTS.Scenes.Keys.PlayerPlay);

        this.tweens.add({
            targets: [
                playScene.hitButton.setInteractive(true),
                playScene.standButton.setInteractive(true)
            ],
            onStart: () => playScene.play(),
            alpha: 1,
            ease: 'Cubic'
        })
    }

    /**
     * Updates the player's score text.
     *
     * @memberof DealScene
     */
    updatePlayerScore() {
        this.playerScore.setText(this.blackjack.player.hand.getTotal());
    }

    /**
     * Update's the dealer's score text.
     *
     * @memberof DealScene
     */
    updateDealerScore() {
        this.dealerScore.setText(this.blackjack.dealer.hand.getTotal());
    }
}