import { NavController, Page, ActionSheet } from 'ionic-framework/ionic';
import { Spider } from '../types';
import CameraService from '../services/CameraService';
import SpiderStorageService from '../services/SpiderStorageService';
import SpeciesSelectPage from './SpeciesSelect';

@Page({
    templateUrl: 'build/pages/SpiderAdd.html'
})
export default class AddSpiderPage {

    public model: Spider = <any>{};

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

    selectSpecies() {
        this.nav.push(SpeciesSelectPage, { spider: this.model }, {}, undefined);
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
