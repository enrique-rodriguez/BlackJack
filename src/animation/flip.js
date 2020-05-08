import Animation from "./animation";


export default class FlipAnimation extends Animation {

    constructor(scene, targets, scale) {
        super(scene, targets);
        this.scale = scale;
    }

    animate(config) {
        this.scene.tweens.timeline({
            targets: this.targets,
            duration: 100,
            ease: 'Power2',
            tweens: [
                {scaleX: this.scale * 1.1, scaleY: this.scale * 1.1},
                {scaleX: 0},
                {onComplete: config.onComplete},
                {scaleX: this.scale, scaleY: this.scale}
            ],
        }, this);
    }
}