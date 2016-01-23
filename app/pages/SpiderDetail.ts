import { NavController, NavParams, Page, ActionSheet } from 'ionic-framework/ionic';
import { Spider } from '../types';
import CameraService from '../services/CameraService';
import SpiderStorageService from '../services/SpiderStorageService';
import SpeciesSelectPage from './SpeciesSelect';

@Page({
    templateUrl: 'build/pages/SpiderDetail.html'
})
export default class SpiderDetailPage {

    public model: Spider = <any>{};

    public editmode: boolean;
    public createmode: boolean;
    public viewmode: boolean;

    constructor(
        private nav: NavController,
        private camera: CameraService,
        private storage: SpiderStorageService,
        _params: NavParams
    ) {
        console.log('SpiderDetailPage constructor');
        this.editmode = _params.get('mode') === 'edit';
        this.createmode = _params.get('mode') === 'create';
        this.viewmode = _params.get('mode') === 'view';
        if (this.viewmode) {
            this.model = _params.get('data');
        }
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
