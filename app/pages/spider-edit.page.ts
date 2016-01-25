import { NavController, NavParams, Page, ActionSheet } from 'ionic-framework/ionic';
import { Spider } from '../types';
import JpgDataUriPipe from '../pipes/jpg-data-uri.pipe';
import CameraService from '../services/camera.service';
import SpiderStorageService from '../services/spider-storage.service';
import SpeciesSelectPage from './species-select.page';

@Page({
    templateUrl: 'build/pages/spider-edit.page.html',
    pipes: [JpgDataUriPipe]
})
export default class SpiderEditPage {

    public model: Spider;

    public editmode: boolean;
    public createmode: boolean;

    constructor(
        private nav: NavController,
        private camera: CameraService,
        private storage: SpiderStorageService,
        _params: NavParams
    ) {
        console.log('SpiderEditPage constructor');
        if (_params.get('data')) {
            this.editmode = true; this.createmode = false;
            this.model = _params.get('data');
        } else {
            this.createmode = true; this.editmode = false;
            this.model = <any>{};
        }
    }

    save() {
        if (this.createmode) {
            this.nav.pop();
            return this.storage.add(this.model);
        }
        if (this.editmode) {
            console.log('TODO: add or replace');
        }
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
            sourceType,
            destinationType: Camera.DestinationType.DATA_URL,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: false,
            cameraDirection: Camera.Direction.BACK,
            targetWidth: 1334,
            targetHeight: 1334
        })
            .then((image: string) => {
                console.log('got a picture');
                this.model.img = image;
            });
    }

}
