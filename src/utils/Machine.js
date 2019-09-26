import * as ml5 from "ml5";

export default class Machine {
    features = null;
    classifier = null;
    constructor() {
        console.log("Machine is alive");
    }

    async initialize(numClasses) {
        if (numClasses === 1) numClasses = 2;
        this.features = await ml5.featureExtractor("MobileNet", {
            numLabels: numClasses
        });
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
     * @param {array} images Data URL of the image.
     *
     * @return {Promise} A Promise that resolves when the image is predicted.
     */
    classify(images) {
        let promiseArray = [];
        images.forEach(image => {
            let img = new Image();
            img.src = image;
            promiseArray.push(this.classifier.classify(img));
        });
        return promiseArray;
    }

    /**
     * Save
     * Save the currently trained model
     */
    save() {
        this.classifier.save(() => console.log("saved!"));
    }

    /**
     * Load
     * Loads the uploaded model.
     *
     * @param {file} model A file containing the model.
     * @param {file} weights A file containing the model weight binary.
     * @param {function} callback A callback function called when the model is done loading.
     */
    async load(model, weights, callback) {
        let reader = new FileReader();
        reader.onload = async event => {
            let modelJSON = JSON.parse(event.target.result);
            let numClasses = modelJSON.ml5Specs.mapStringToIndex.length;
            console.log("found ", numClasses, "classes");
            await this.initialize(numClasses);
            console.log("loading model");
            await this.classifier.load([model, weights]);
            if (callback) callback();
        };
        reader.readAsText(model);
    }
}
