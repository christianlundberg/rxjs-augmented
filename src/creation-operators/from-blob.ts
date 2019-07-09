import { Observable } from 'rxjs';

export function fromBlob(blob: Blob): Observable<ArrayBuffer>;
export function fromBlob(
    blob: Blob,
    readAs: 'text' | 'binary' | 'data'
): Observable<string>;
export function fromBlob(blob: Blob, readAs: 'array'): Observable<ArrayBuffer>;
export function fromBlob(
    blob: Blob,
    readAs?: 'array' | 'text' | 'data' | 'binary'
): Observable<string | ArrayBuffer | null> {
    return new Observable(obs => {
        if (!(blob instanceof Blob)) {
            obs.error(new Error('"blob" must be an instance of File or Blob.'));
            return;
        }

        const reader = new FileReader();

        reader.onerror = err => obs.error(err);
        reader.onabort = err => obs.error(err);
        reader.onload = () => obs.next(reader.result);
        reader.onloadend = () => obs.complete();

        if (readAs == 'binary') reader.readAsBinaryString(blob);
        else if (readAs == 'data') reader.readAsDataURL(blob);
        else if (readAs == 'text') reader.readAsText(blob);
        else reader.readAsArrayBuffer(blob);

        // return () => reader.abort();
    });
}
