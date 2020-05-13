import "phaser";
import shuffle from "./shuffle";

/**
 * Generates the frame names for the playing cards.
 *
 * @export
 * @class PlayingCardFrameGenerator
 */
export default class PlayingCardFrameGenerator {

    /**
     * Creates an instance of FrameGenerator.
     * @param {*} scene
     * @memberof PlayingCardFrameGenerator
     */
    constructor(scene) {
        this.scene = scene;
    }

    /**
     * Generates all of the frames for the playing cards and shuffles them.
     *
     * @returns
     * @memberof PlayingCardFrameGenerator
     */
    generate() {

        let frames = [];

        this.scene.anims.generateFrameNames('cards', {
            prefix: 'spade',
            start: 1,
            end: 13,
            outputArray: frames
        });

        this.scene.anims.generateFrameNames('cards', {
            prefix: 'heart',
            start: 1,
            end: 13,
            outputArray: frames
        });

        this.scene.anims.generateFrameNames('cards', {
            prefix: 'diamond',
            start: 1,
            end: 13,
            outputArray: frames
        });

        this.scene.anims.generateFrameNames('cards', {
            prefix: 'club',
            start: 1,
            end: 13,
            outputArray: frames
        });

        shuffle(frames);

        return frames;
    }
}