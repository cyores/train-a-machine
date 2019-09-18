import * as ml5 from "ml5";

export default class Machine {
    features = null;
    classifier = null;
    constructor() {
        console.log("Machine is alive");
    }

    async initialize() {
        this.features = await ml5.featureExtractor("MobileNet");
        this.classifier = await this.features.classification();
    }

    /**
     * Train.
     *
     * @param {array} labeledImages Array of labledImages objects.
     * @param {function} callback  A function to be called to follow the progress of the training.
     *
     * @return {Promise} A promise that resolves once the classifier is done training.
     */
    train(labeledImages, callback) {
        console.log("adding images", labeledImages);

        let promiseArray = [];

        labeledImages.forEach((imageSet, i) => {
            imageSet.images.forEach(image => {
                let img = new Image();
                img.src = image;
                promiseArray.push(
                    this.classifier.addImage(img, imageSet.label)
                );
            });
        });
        console.log("starting training");
        Promise.all(promiseArray).then(() => {
            this.classifier.train(callback);
        });
    }

    /**
     * Predict.
     *
     * @param {string} image Data URL of the image.
     *
     * @return {Promise} A Promise that resolves when the image is predicted.
     */
    predict(image) {
        return this.classifier.classify(image);
    }
}
