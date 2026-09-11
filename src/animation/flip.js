import Animation from "./animation";


export default class FlipAnimation extends Animation {

    constructor(scene, targets, scale) {
        super(scene, targets);
        this.scale = scale;
    }

    animate(config) {
        this.scene.tweens.chain({
            targets: this.targets,
            tweens: [
                {
                    scaleX: this.scale * 1.1,
                    scaleY: this.scale * 1.1,
                    duration: 100,
                    ease: 'Power2'
                },
                {
                    scaleX: 0,
                    duration: 100,
                    ease: 'Power2'
                },
                {
                    scaleX: 0,
                    duration: 100,
                    ease: 'Power2',
                    onComplete: config.onComplete
                },
                {
                    scaleX: this.scale,
                    scaleY: this.scale,
                    duration: 100,
                    ease: 'Power2'
                }
            ]
        });
    }
}
