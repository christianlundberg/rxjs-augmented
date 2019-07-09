import { Observable } from 'rxjs';

export function fromWorker<T = any>(
    worker: Worker,
    message: any
): Observable<T> {
    return new Observable(observer => {
        if (!(worker instanceof Worker)) {
            observer.error(
                new Error('"worker" must be an instance of Worker.')
            );
            return;
        }

        const errorListener = (event: ErrorEvent) => observer.error(event);

        const messageListener = ({ data }: MessageEvent) => {
            observer.next(data);
            observer.complete();
        };

        worker.addEventListener('error', errorListener);
        worker.addEventListener('message', messageListener);

        worker.postMessage(message);

        return () => {
            worker.removeEventListener('error', errorListener);
            worker.removeEventListener('message', messageListener);
        };
    });
}
