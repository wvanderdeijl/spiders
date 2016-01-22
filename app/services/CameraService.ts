import {Injectable} from 'angular2/core';

@Injectable()
export class CameraService {

    constructor() { }
    getPicture(options: CameraOptions) {
        return new Promise((resolve, reject) => {
            navigator.camera.getPicture(resolve, reject, options);
        });
    }

}
