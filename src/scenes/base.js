import "phaser";
import CONSTANTS from "../constants";
import Grid from "../utils/grid";



export default class BaseScene extends Phaser.Scene {

    constructor(id) {
        super(id);
    }

    makeGrid(rows, cols) {

        var config = {
            scene: this,
            cols: cols,
            rows: rows
        }

        return new Grid(config);
    }

    create(childCreate) {
        this.grid = this.makeGrid(15, 15);
        
        if(childCreate) childCreate();

        if(CONSTANTS.DEBUG) {
            this.grid.showNumbers();
        } 
    }
}