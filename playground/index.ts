import { fromEvent, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { fromBlob, fromWorker, online$ } from '../dist';
import { select } from '../dist/operators';

const isPrimeNumber = require('prime-number');
const primeNumberList = require('prime-number/list');
const source$ = of(1, 2, 2, 1).pipe(select(value => value * 2));

const workerButton = document.querySelector('#worker');
const mainButton: HTMLButtonElement = document.querySelector('#main');
// source$.subscribe(console.log);

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

const fileInput: HTMLInputElement = document.querySelector('#file');

fromEvent(fileInput, 'change')
    .pipe(
        map((event: HTMLInputEvent) => event.target.files[0]),
        switchMap((file: File) => fromBlob(file, 'array'))
        // switchMap(buffer => {
        //     console.log(buffer.byteLength);
        //     const source$ = fromWorker(
        //         new Worker('./worker.js', { type: 'module' }),
        //         buffer,
        //         [buffer]
        //     );
        //     console.log(buffer.byteLength);
        //     return source$;
        // })
    )
    .subscribe(buffer => {
        console.log(buffer.byteLength);
        const worker = new Worker('./worker.js', { type: 'module' });
        worker.onmessage = e => console.log(e);
        worker.postMessage(0, [buffer]);
        console.log(buffer.byteLength);
    });

// online$.subscribe(console.log);

// fromEvent(mainButton, 'click')
//     .pipe(map(() => primeNumberList.map(value => isPrimeNumber(value))))
//     .subscribe(console.log);
