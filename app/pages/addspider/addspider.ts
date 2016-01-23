import { NavController, Page, ActionSheet } from 'ionic-framework/ionic';
import CameraService from '../../services/CameraService';
import SpiderStorageService, { Spider } from '../../services/SpiderStorageService';

@Page({
    templateUrl: 'build/pages/addspider/addspider.html'
})
export default class AddSpiderPage {

    public model = new Spider();

    constructor(
        private nav: NavController,
        private camera: CameraService,
        private storage: SpiderStorageService
    ) {
        console.log('AddSpiderPage constructor');
    }

    save() {
        this.storage.add(this.model);
        this.nav.pop();
    }

    takePicture() {
        let actionSheet = ActionSheet.create({
            buttons: [
                { text: 'Take Photo...', handler: () => this.getPicture(Camera.PictureSourceType.CAMERA) },
                { text: 'Choose from Library...', handler: () => this.getPicture(Camera.PictureSourceType.PHOTOLIBRARY) },
                { text: 'Cancel', style: 'cancel' }]
        });
        this.nav.present(actionSheet);
    }

    private getPicture(sourceType: number) {
        return this.camera.getPicture({
            sourceType, destinationType: Camera.DestinationType.DATA_URL, targetWidth: 1334, targetHeight: 1334
        })
            .then((image: string) => {
                console.log('got a picture');
                this.model.img = image;
            });
    }

    public get imgurl() {
        return this.model.img && `data:image/jpeg;base64,${this.model.img}`
    }

}
