import CONSTANTS from "../constants";


export default class Tween {

    static toIndex(scene, config) {
        let position = scene.grid.getIndexPos(config.index);

        scene.tweens.add({
            targets: config.target,
            duration: config.duration,
            onCompleteParams: scene,
            onComplete: config.onComplete,
            ease: 'Linear',
            x: position.x, 
            y: position.y,
        });
    }

    static to(scene, targets, position, duration=1000) {


        scene.tweens.add({
            targets: targets,
            duration: duration,
            ease: 'Linear',
            x: position.x, 
            y: position.y,
        });
    }

    static dim(scene, target, onComplete) {

        scene.tweens.add({
            targets: target,
            alpha: 0,
            duration: 1500,
            ease: "Linear",
            onComplete: onComplete,
            onCompleteScope: target
        })
    }

    static exitRight(scene, target, onComplete) {

        scene.tweens.add({
            targets: target,
            ease: "Linear",
            duration: 500,
            x: scene.game.config.width + target.displayHeight,
            onComplete: onComplete,
            onCompleteScope: target
        });
    }

    static fade(scene, targets, onComplete) {

        scene.tweens.add({
            targets: targets,
            alpha: 0,
            duration: 1000,
            ease: 'Linear',
            onComplete: onComplete,
            onCompleteScope: targets
        });
    }

    static fadeInOrOut(type, scene, targets, onComplete) {

        scene.tweens.add({
            targets: targets,
            alpha: type == "in" ? 1 : 0,
            duration: 500,
            ease: 'Linear',
            onComplete: onComplete,
            onCompleteScope: targets
        });
    }


    static exitDown(scene, target, onComplete) {

        scene.tweens.add({
            targets: target,
            ease: "Linear",
            duration: 500,
            y: scene.game.config.height + target.displayHeight,
            onComplete: onComplete,
            onCompleteScope: target
        })
    }
}