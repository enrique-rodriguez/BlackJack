import Card from "./card";

export default class MenuCard extends Card {

    constructor(scene, config) {

        let _config = {
            frame: "spadeA", 
            interactive: true, 
            indexPos: 0
        }

        if(config) {
            _config = Object.assign(_config, config);
        }

        super(scene, _config);

        this.setRotationSpeed(1);
        
    }

    create() {
        super.create();
        this.on('pointerup', this.flip, this);
    }

    setRotationSpeed(speed) {
        this.rotationSpeed = speed;
    }

    update() {
        this.angle += this.rotationSpeed;
    }
}