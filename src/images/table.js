import Image from "./image";


export default class Table extends Image {

	static SCALE = 1.2;

    constructor(scene) {
        super(scene, {texture: "table", indexPos: 112});
        this.setScale(Table.SCALE);
    }
    
}