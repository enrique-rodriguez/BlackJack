/**
 * Model for a poker chip.
 *
 * @export
 * @class ChipModel
 */
export default class ChipModel {

    /**
     * Creates an instance of ChipModel.
     * @param {*} value the dollar amount of the poker chip.
     * @memberof ChipModel
     */
    constructor(value) {
        this.value = value;
    }
}