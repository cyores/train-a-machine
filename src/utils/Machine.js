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
     *
     * @return {Promise} A promise that resolves once the classifier is done training.
     */
    train(labeledImages) {
        console.log("training", labeledImages);
        // labeledImages.forEach((imageSet, i) => {
        //     imageSet.images.forEach(image => {
        //         this.classifier.addImage(image, imageSet.label);
        //     });
        // });

        let promiseArray = [];
        // labeledImages.forEach((imageSet, i) => {
        //     imageSet.images.forEach(image => {
        //         let reader = new FileReader();
        //         reader.onloadend = () => {
        //             this.classifier.addImage(reader.result, imageSet.label);
        //         };
        //         promiseArray.push(reader.readAsDataURL(image));
        //     });
        // });

        labeledImages.forEach((imageSet, i) => {
            imageSet.images.forEach(image => {
                let img = new Image();
                img.src = image;
                promiseArray.push(this.classifier.addImage(img, imageSet.label));
            });
        });
        Promise.all(promiseArray, () => {
            return this.classifier.train();
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
