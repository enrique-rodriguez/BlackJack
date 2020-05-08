import CONSTANTS from "../constants";
import BaseScene from "./base";
import Chip from "../sprites/chips/chip";
import Tween from "../animation/tween";
import PlaceBetText from "../text/place_bet";
import DealButton from "../sprites/buttons/deal";
import Pot from "../groups/pot";
import Chips from "../groups/chips";


export default class Betting extends BaseScene {

    static chipIndices = [169, 171, 173, 175, 199, 201, 203 , 205 ];
    static chipValues  = [1  , 5  ,  10,  50, 100, 500, 1000, 2000];

    static getChipIndex(chip) {
        let index = Betting.chipValues.indexOf(chip.getValue());

        return Betting.chipIndices[index];
    }
    
    constructor() {
        super(CONSTANTS.Scenes.Keys.Betting);
    }

    init(data) {
        this.blackjack = data;
    }

    create() {
        super.create( ()=> {

            this.placeBetText = new PlaceBetText(this);
            this.dealButton   = new DealButton(this);

            this.chips = new Chips(this);
            this.pot   = new Pot(this);

            this.placeChips();
        });
    }

    placeChips() {

        let currentValue = 0;

        for(const index of Object.values(Betting.chipIndices)) {
            let value = Betting.chipValues[currentValue];

            if(this.blackjack.player.balance.amount < value) 
                break;

            this.createChip(index, value);
            currentValue++;
        }
    }

    createChip(index, value) {

        let chip = new Chip(this, {indexPos: index, value: value});
        this.chips.add(chip);

        chip.on('pointerup', () => {

            chip.disableInteractive();
            

            if(this.pot.contains(chip)){
                this.removeTopChipFromPot();
            }else {
                this.placeInPot(chip, index, value);
            }

            this.children.bringToTop(chip);

            this.enableButtonsCheck();
            this.updateChips();

        }, this)
    }

    removeTopChipFromPot() {
        let chip = this.pot.remove();
        this.blackjack.player.give(chip);

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

    enableButtonsCheck() {
        if(this.pot.getAmount() > 0)
            this.dealButton.show(true);
        else
            this.dealButton.show(false);
    }

    updateChips() {
        for(const chip of Object.values(this.chips.getChildren())) {

            if(this.blackjack.player.balance.amount < chip.getValue()) 
                chip.setVisible(false);
            else 
                chip.setVisible(true);
        }
    }
}