import { Platform } from 'ionic-framework/ionic';
import { BehaviorSubject } from 'rxjs/Rx';

declare let resolveLocalFileSystemURL: any;

abstract class StorageService<T> {

    public data$ = new BehaviorSubject<T[]>([]);

    constructor(private filename: string, private platform: Platform) {
        this._read();
    }

    add(element: T) {
        let _data = this.data$.getValue();
        _data.push(element);
        this.data$.next(_data);
        this._persist();
    }

    remove(index: number) {
        let _data = this.data$.getValue();
        _data.splice(index, 1);
        this.data$.next(_data);
        this._persist();
    }

    abstract defaultValue(): T[];

    private _read() {
        this._findFile()
            .then((entry: any) => new Promise((resolve, reject) => entry.file(resolve, reject)))
            .then((file: any) => new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = resolve;
                reader.onerror = reject;
                reader.readAsText(file);
            }))
            .then((event: any) => {
                let txt = event.target.result;
                console.log('data read from', this.filename);
                this.data$.next(txt && JSON.parse(txt) || this.defaultValue().slice());
            })
            // TODO: better error handling
            .catch((err: any) => { console.log('promise error', err); });
    }

    private _persist() {
        this._findFile()
            .then((entry: any) => new Promise((resolve, reject) => entry.createWriter(resolve, reject)))
            .then((writer: any) => new Promise((resolve, reject) => {
                writer.onwrite = resolve;
                writer.onerror = reject;
                console.log('persisting data to', this.filename);
                // console.log('persisting data', JSON.stringify(this.data$.getValue()));
                writer.write(JSON.stringify(this.data$.getValue()));
            }))
            // TODO: better error handling
            .catch((err: any) => { console.log('promise error', err); });
    }

    private _findFile() {
        return this.platform.ready()
            .then(() => new Promise((resolve, reject) => { resolveLocalFileSystemURL(cordova.file.syncedDataDirectory, resolve, reject); }))
            .then((entry: any) => new Promise((resolve, reject) => entry.getFile(this.filename, { create: true }, resolve, reject)));
    }

}

export default StorageService;
