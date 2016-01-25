import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({ name: 'jpgDataUri' })
export default class JpgDataUriPipe implements PipeTransform {
    transform(base64: string): string {
        return base64 && `data:image/jpeg;base64,${base64}`;
    }
}
