import CONSTANTS from "../constants";
import BaseScene from "./base";
import Chip from "../sprites/chips/chip";
import Text from "../text/text";
import Button from "../sprites/buttons/button";
import Pot from "../groups/pot";
import Chips from "../groups/chips";


/**
 * Scene that is responsible for allowing the player
 * to place a bet for the next blackjack hand.
 *
 * @export
 * @class Betting
 * @extends {BaseScene}
 */
export default class Betting extends BaseScene {

    /**
     * The indices of the poker chips (where to place them in the scene).
     *
     * @static
     * @memberof Betting
     */
    static chipIndices = [169, 171, 173, 175, 199, 201, 203, 205];

    /**
     * Returns the appropriate position index
     * for the given poker chip.
     *
     * @static
     * @param {Chip} chip the chip to get the index of.
     * @returns the index
     * @memberof Betting
     */
    static getChipIndex(chip) {
        let index = Chip.VALUES.indexOf(chip.getValue());
        return Betting.chipIndices[index];
    }

    /**
     *Creates an instance of Betting.
     * @memberof Betting
     */
    constructor() {
        super(CONSTANTS.Scenes.Keys.Betting);
    }

    /**
     * Stores variables from the calling scene.
     *
     * @param {*} blackjack
     * @memberof Betting
     */
    init(blackjack) {
        this.blackjack = blackjack;
    }

    /**
     * Creates the components for this scene.
     *
     * @memberof Betting
     */
    create() {
        super.create(() => {
            this.placeBetText = new Text(this, "Place your bet!");
            this.dealButton = new Button(this, "Deal", () => this.dealButtonHandler())
                .setClickSound('deal_click')
                .setAlpha(0);

            this.chips = new Chips(this);
            this.pot = new Pot(this);
            this.potText = new Text(this, `$${this.pot.amount}`).setVisible(false);

            this.placeUIComponents();

            this.placeChips();
            this.scene.launch(CONSTANTS.Scenes.Keys.Deal, this.blackjack);
        });
    }

    /**
     *
     *
     * @memberof Betting
     */
    placeUIComponents() {
        this.grid.placeAtIndex(124, this.dealButton);
        this.grid.placeAtIndex(67, this.placeBetText);
        this.grid.placeAtIndex(129, this.potText);
    }

    /**
     * Places the chips on the table depending on the
     * player's balance.
     *
     * @memberof Betting
     */
    placeChips() {
        let currentValue = 0;

        for (const index of Object.values(Betting.chipIndices)) {
            let value = Chip.VALUES[currentValue];

            if (this.blackjack.player.money < value) break;

            this.createChip(index, value);
            currentValue++;
        }
    }

    /**
     * Creates a poker chip and places on its respective
     * index.
     *
     * @param {*} index
     * @param {*} value
     * @memberof Betting
     */
    createChip(index, value) {
        let chip = new Chip(this, value);

        this.grid.placeAtIndex(index, chip);
        this.chips.add(chip);

        chip.on('pointerup', () => this.moveChip(chip.disableInteractive(), index));
    }

    /**
     *
     *
     * @param {*} chip
     * @param {*} index
     * @memberof Betting
     */
    moveChip(chip, index) {

        if (this.pot.contains(chip))
            this.removeTopChipFromPot();

        else
            this.placeChipOnPot(chip, index);

        this.children.bringToTop(chip);
        if (this.pot.amount == 0) {
            this.fadeDealButtonAndPotText("out");
        } else {
            this.fadeDealButtonAndPotText("in");
        }
        this.updateChips();
    }

    /**
     * Removes the top poker chip on the pot
     * and returns it to the player's collection of chips.
     *
     * @memberof Betting
     */
    removeTopChipFromPot() {
        let chip = this.pot.removeFromTop();
        this.updatePotText();
        let position = this.grid.getIndexPos(Betting.getChipIndex(chip));

        this.tweens.add({
            targets: chip,
            x: position.x,
            y: position.y,
            duration: 250,
            onComplete: (_, targets) => {
                this.returnChipToPlayer(chip);
                this.pot.remove(chip, true, true)
            }
        });
    }

    /**
     *
     *
     * @param {*} chip
     * @memberof Betting
     */
    returnChipToPlayer(chip) {
        this.blackjack.player.give(chip);
        this.updatePlayersBalance();
        this.updateChips();
    }

    /**
     * Put's the given poker chip on the pot.
     * Increases to pot's balance by the given chip's value.
     *
     * @param {*} chip
     * @param {*} index
     * @param {*} value
     * @memberof Betting
     */
    placeChipOnPot(chip, index) {
        this.blackjack.player.take(chip);
        this.updatePlayersBalance();
        this.chips.remove(chip);

        let position = this.pot.add(chip);

        this.tweens.add({
            targets: chip,
            duration: 250,
            ease: "Linear",
            x: position.x,
            y: position.y,
            onComplete: (_, targets) => {
                targets.forEach(c => c.setInteractive());
                this.updatePotText();
            }
        });

        if (!this.chips.exists(chip)) {
            this.createChip(index, chip.model.value);
        }
    }

    /**
     * Updates the player's balance UI text.
     *
     * @memberof Betting
     */
    updatePlayersBalance() {
        this.blackjack.balance.setText(`$${this.blackjack.player.money}`);
    }

    /**
     * Updates the text containing the pot amount using the model.
     *
     * @memberof Betting
     */
    updatePotText() {
        this.potText.setText(`$${this.pot.amount}`);
    }

    /**
     * Fades the deal button and pot text depending on the type.
     *
     * @param {"in"|"out"} type 
     * @memberof Betting
     */
    fadeDealButtonAndPotText(type) {
        this.tweens.add({
            onStart: type == "in" ?
                (_, targets) => targets.forEach(t => t.setVisible(true)) : () => this.dealButton.disableInteractive(),
            targets: [this.dealButton.setInteractive(), this.potText],
            alpha: type == "out" ? 0 : 1,
            duration: 500,
            onComplete: type == "out" ? (_, targets) => targets.forEach(t => t.setVisible(false)) : null,
        });
    }

    /**
     * Updates the poker chips using the players balance.
     *
     * @memberof Betting
     */
    updateChips() {
        this.chips.getChildren().forEach(chip => {
            if (this.blackjack.player.money < chip.getValue())
                chip.setVisible(false);
            else
                chip.setVisible(true);
        });
    }

    /**
     * Prepare for scene transition.
     *
     * @memberof Betting
     */
    dealButtonHandler() {
        this.dealButton.disableInteractive();
        this.scene.get("Deal").startDeal();
        this.fadeChips("out");
        this.hidePotTextAndDealButton();
        this.movePot(118);
        this.movePotText(148);
    }

    /**
     * Moves the poker chips out of the scene.
     *
     * @memberof Betting
     */
    fadeChips(type) {
        this.tweens.add({
            targets: this.chips.getChildren(),
            alpha: type == "out" ? 0 : 1,
            duration: 500,
            onStart: type == "in" ? () => this.updateChips() : null,
            onComplete: type == "out" ? (_, targets) => targets.forEach(t => t.setVisible(false)) : null,
        });
    }

    /**
     * Hides the deal button and the text
     * that displays how much money there is
     * on the pot.
     *
     * @memberof Betting
     */
    hidePotTextAndDealButton() {
        this.tweens.add({
            targets: [this.dealButton, this.placeBetText],
            alpha: 0,
            duration: 500,
        });
    }

    /**
     * prepares the scene for betting.
     *
     * @memberof Betting
     */
    prepareForBetting() {
        this.pot.reset();
        this.fadeInPlaceBetText();
    }

    /**
     * Fades in the 'Place your bet!' text
     *
     * @memberof Betting
     */
    fadeInPlaceBetText() {
        this.tweens.add({
            targets: this.placeBetText,
            alpha: 1,
            duration: 500
        })
    }

    /**
     * Moves the pot from the play area.
     *
     * @memberof Betting
     */
    movePot(index, onComplete = null) {
        this.pot.disableInteractive();

        let potPosition = this.grid.getIndexPos(index);

        this.tweens.add({
            targets: this.pot.getChildren(),
            duration: 300,
            x: potPosition.x,
            y: potPosition.y,
            delay: this.tweens.stagger(30),
            onUpdate: (tweens, chip) => chip.getRandomSound().play(),
            onComplete: onComplete,
            completeDelay: 1000
        });

    }

    /**
     *
     *
     * @param {*} index
     * @memberof Betting
     */
    startNewRoundAndMovePotTo(index) {
        let dealScene = this.scene.get(CONSTANTS.Scenes.Keys.Deal);
        this.pot.resetAmount();
        this.movePot(index, () => dealScene.prepareForNewRound());
        this.movePotText(this.pot.index);
        this.fadeOutPotText();
    }

    /**
     * Moves the pot text to the given index.
     *
     * @param {*} index
     * @memberof Betting
     */
    movePotText(index) {
        let textPosition = this.grid.getIndexPos(index);

        this.tweens.add({
            targets: this.potText,
            duration: 500,
            x: textPosition.x,
            y: textPosition.y
        });
    }

    /**
     * Fades out the pot text.
     *
     * @memberof Betting
     */
    fadeOutPotText() {
        this.tweens.add({
            targets: this.potText,
            duration: 500,
            alpha: 0,
            onStart: () => this.updatePotText(),
            onComplete: () => this.movePotText(129)
        });
    }

    /**
     * Pays the player the pot amount by the multiplier.
     *
     * @param {*} multiplier
     * @memberof Betting
     */
    payoutPlayer(multiplier) {
        this.blackjack.player.give(Math.floor(this.pot.amount * multiplier));
        this.updatePlayersBalance();
    }
}