import CONSTANTS from "../constants";
import BaseScene from "./base";
import Chip from "../sprites/chips/chip";
import Tween from "../animation/tween";
import Text from "../text/text";
import Button from "../sprites/buttons/button";
import Pot from "../groups/pot";
import Chips from "../groups/chips";


export default class Betting extends BaseScene {

    static chipIndices = [169, 171, 173, 175, 199, 201, 203 , 205 ];

    static getChipIndex(chip) {
        let index = Chip.VALUES.indexOf(chip.getValue());
        return Betting.chipIndices[index];
    }
    
    constructor() {
        super(CONSTANTS.Scenes.Keys.Betting);
    }

    init(blackjack) {
        this.blackjack = blackjack;
    }

    create() {
        super.create( ()=> {

            this.placeBetText = new Text(this, "Place your bet!");

            this.dealButton   = new Button(this, "Deal", () => this.transitionToDealScene());
            this.dealButton.setAlpha(0).setScale(0.7);

            this.chips = new Chips(this);
            this.pot = new Pot(this);

            this.grid.placeAtIndex(124, this.dealButton);
            this.grid.placeAtIndex(67, this.placeBetText);
            this.grid.placeAtIndex(129, this.pot.text);


            this.placeChips();
        });
    }

    placeChips() {

        let currentValue = 0;

        for(const index of Object.values(Betting.chipIndices)) {
            let value = Chip.VALUES[currentValue];

            if(this.blackjack.player.money < value) 
                break;

            this.createChip(index, value);
            currentValue++;
        }
    }

    createChip(index, value) {

        let chip = new Chip(this, value);

        this.grid.placeAtIndex(index, chip);
        this.chips.add(chip);

        chip.on('pointerup', () => {

            chip.disableInteractive();

            if(this.pot.contains(chip))
                this.removeTopChipFromPot();
            else
                this.placeInPot(chip, index, value);

            this.children.bringToTop(chip);

            this.enableButtonsCheck();
            this.updateChips();

        }, this)
    }

    removeTopChipFromPot() {
        let chip = this.pot.remove();
        this.blackjack.player.give(chip);
        this.updatePlayersBalance();

        let index = Betting.getChipIndex(chip);

        Tween.toIndex(this, {
            target: chip, 
            index: index, 
            duration: 250, 
            onComplete: () => chip.destroy()
        });
    }

    placeInPot(chip, index, value) {
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
            onComplete: () => chip.setInteractive()
        });

        if(!this.chips.exists(chip)) {
            this.createChip(index, value);
        }
    }

    updatePlayersBalance() {
        this.blackjack.balance.setText(`$${this.blackjack.player.money}`);
    }

    enableButtonsCheck() {
        if(this.pot.amount > 0)
            this.dealButton.show(true);
        else
            this.dealButton.show(false);
    }

    updateChips() {
        for(const chip of Object.values(this.chips.getChildren())) {

            if(this.blackjack.player.money < chip.getValue()) 
                chip.setVisible(false);
            else 
                chip.setVisible(true);
        }
    }

    transitionToDealScene() {
        this.hidePokerChips();
        this.hidePotTextAndDealButton();
        this.movePot();
    }

    hidePokerChips() {
        this.tweens.add({
            targets: this.chips.getChildren(),
            y: this.game.config.height * 1.5,
            duration: 1000
        });
    }

    hidePotTextAndDealButton() {
        this.tweens.add({
            targets: [this.dealButton, this.placeBetText],
            alpha: 0,
            duration: 500,
            onComplete: () => {
                this.dealButton.destroy();
                this.placeBetText.destroy();
            }
        });
    }

    movePot() {

        this.pot.disableInteractive();

        let potPosition  = this.grid.getIndexPos(118);
        let textPosition = this.grid.getIndexPos(148);

        this.tweens.add({
            targets: this.pot.getChildren(),
            duration: 500,
            x: potPosition.x,
            y: potPosition.y,
            onCompleteScope: this,
            onComplete: (tween, targets) => {
                this.scene.launch(CONSTANTS.Scenes.Keys.Round, this.blackjack);
            }});

        this.tweens.add({
            targets: this.pot.text,
            duration: 500,
            x: textPosition.x,
            y: textPosition.y
        });
    }
}