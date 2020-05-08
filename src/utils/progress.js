

export default class ProgressBar {

    static width = 0;
    static height = 0;

    constructor(scene) {
        this.scene = scene;
        ProgressBar.setWidth(scene.cameras.main.width);
        ProgressBar.setHeight(scene.cameras.main.height);
        this.create();
    }

    static setWidth(width) {
        ProgressBar.width = width;
    }

    static setHeight(height) {
        ProgressBar.height = height;
    }

    static makeLoadingText(scene) {

        return scene.make.text({
            x: ProgressBar.width * 0.5,
            y: ProgressBar.height + 200,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
    }

    static makePercentText(scene) {

        return scene.make.text({
            x: ProgressBar.width * 0.5,
            y: ProgressBar.height * 0.5 + 138,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
    }

    create() {
        this.progressBar = this.scene.add.graphics();
        this.progressBox = this.scene.add.graphics();

        this.progressBox.fillStyle(0x222222, 0.8);
        this.progressBox.fillRect(240, 410, 320, 50);

        this.loadingText = ProgressBar.makeLoadingText(this.scene);
        this.percentText = ProgressBar.makePercentText(this.scene);

        this.loadingText.setOrigin(0.5, 0.6); 
        this.percentText.setOrigin(0.5, 0.6);
    }

    update(value) {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xffffff, 1);
        this.progressBar.fillRect(250, 420, 300 * value, 30);
        this.percentText.setText(parseInt(value * 100) + '%');
    }

    destroy() {
        this.progressBar.destroy();
        this.progressBox.destroy();
        this.loadingText.destroy();
        this.percentText.destroy();
    }
}