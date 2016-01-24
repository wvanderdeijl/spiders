import { Platform } from 'ionic-framework/ionic';
import { BehaviorSubject } from 'rxjs/Rx';

declare let resolveLocalFileSystemURL: any;

abstract class StorageService<T> {

    private _read: Promise<T[]>;
    private _data: T[];

    constructor(private _filename: string, private _platform: Platform) {
    }

    get(): Promise<T[]> {
        if (!this._read) {
            this._read = this._findFile()
                .then((entry: any) => new Promise((resolve, reject) => entry.file(resolve, reject)))
                .then((file: any) => new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.onload = resolve;
                    reader.onerror = reject;
                    reader.readAsText(file);
                }))
                .then((event: any) => {
                    let txt = event.target.result;
                    console.log('data read from', this._filename);
                    return txt && JSON.parse(txt) || this.defaultValue().slice();
                })
                .then((data: T[]) => this._data = data)
                // TODO: better error handling
                .catch((err: any) => { console.log('promise error', err); });
        }
        return this._read;
    }

    add(element: T) {
        this._data.push(element);
        return this._persist();
    }

    remove(index: number) {
        this._data.splice(index, 1);
        return this._persist();
    }

    abstract defaultValue(): T[];

    private _persist(): Promise<void> {
        return this._findFile()
            .then((entry: any) => new Promise((resolve, reject) => entry.createWriter(resolve, reject)))
            .then((writer: any) => new Promise((resolve, reject) => {
                writer.onwrite = resolve;
                writer.onerror = reject;
                console.log('persisting data to', this._filename);
                // console.log('persisting data', JSON.stringify(this._data));
                writer.write(JSON.stringify(this._data));
            }))
            // TODO: better error handling
            .catch((err: any) => { console.log('promise error', err); });
    }

    private _findFile() {
        return this._platform.ready()
            .then(() => new Promise((resolve, reject) => { resolveLocalFileSystemURL(cordova.file.syncedDataDirectory, resolve, reject); }))
            .then((entry: any) => new Promise((resolve, reject) => entry.getFile(this._filename, { create: true }, resolve, reject)));
    }

}

export default StorageService;
