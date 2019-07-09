# RxJS Augment

RxJS operators and Browser API wrappers.

### Installation

To install the latest version of rxjs-augment, simply run:

```
npm install --save rxjs-augment@latest
```

Of course it depends on rxjs, so install it if you haven't already:

```
npm install --save rxjs
```

## API

-   [Operators](#operators)
    -   [mapUntilChanged](#mapuntilchanged)
    -   [mapToUntilChanged](#maptountilchanged)
-   [Creation operators](#creation-operators)
    -   [fromBlob](#fromblob)
    -   [fromWorker](#fromworker)
-   [Observables](#observables)
    -   [online](#online)

## Usage

### Operators

These are pipeable rxjs operators

#### mapUntilChanged

This operator wraps the distinctUntilChanged and map operators, since it's quite common to use them together.

##### Example

```javascript
import { of } from 'rxjs';
import { mapUntilChanged } from 'rxjs-augment/operators';

const source$ = of(1, 2, 2, 1).pipe(mapUntilChanged(value => value * 2));

source$.subscribe(console.log); //2, 4, 1
```

#### mapToUntilChanged

Same as mapUntilChanged, except it wraps the mapTo operator.

##### Example

```javascript
import { of } from 'rxjs';
import { mapToUntilChanged } from 'rxjs-augment/operators';

const source$ = of(1, 2, 2, 2, 1).pipe(mapToUntilChanged('value'));

source$.subscribe(console.log); //'value', 'value', 'value'
```

### Creation operators

These operators will let you create Observables from Browser APIs.

---

#### fromBlob

Internally this operator uses the `FileReader` API. Pass it a `File` or a `Blob` and the `readAs` method you desire (default will be `readAsArrayBuffer`)

##### Example

```javascript
import { fromEvent } from 'rxjs';
import { fromBlob } from 'rxjs-augment';

//For Typescript
interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
}

const fileInput: HTMLInputElement = document.querySelector('#file');

fromEvent(fileInput, 'change')
    .pipe(
        map((event: HTMLInputEvent) => event.target.files[0]),
        switchMap((file: File) => fromBlob(file, 'array'))
    )
    .subscribe(console.log);
```

---

#### fromWorker

Pass it an instance of Worker and internally it'll setup the listeners and post the initial message. Upon receiving the first message from the worker, it'll complete.

##### Example

```javascript
//app.ts
import { fromEvent, of } from  'rxjs';
const  button:  HTMLButtonElement  =  document.querySelector('#run-worker');

fromEvent(button, 'click').pipe(
	switchMap(() => {
		if  (typeof  Worker  !==  'undefined')  {
			//If you're using Typescript, you can correctly type the Observable:
			return fromWorker<string>(
				new  Worker('./worker.ts', { type: 'module' }),
				'data for the worker'
			);
		}
		// Web Workers are not supported in this environment.
		// You should add fallback so that your program still executes correctly.
		const whateverYouHadToDoInTheWorker = 'the response';
		return of(whateverYouHadToDoInTheWorker);
	}).subscribe(console.log); // 'the response'

//worker.ts
addEventListener('message', ({ data }) => {
	console.log(data); //'data for the worker'
	postMessage('the response');
});
```

### Observables

These are Observable wrappers for Browser APIs.

#### online

Observable of the browser's ability to connect to the network.

##### Example

```javascript
import { online$ } from 'rxjs-augment';

//Try connecting and disconnecting
online$.subscribe(console.log); //true or false
```
