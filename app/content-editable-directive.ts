import { Directive, EventEmitter, ElementRef, Input, Output } from '@angular/core';
import { OnChanges } from '@angular/core';
import { Cell } from './cell';

@Directive({
    selector: '[editable-directive]',
    host: {
        '(blur)': 'onBlur()'
    }
})

export class ContenteditableDirective implements OnChanges {
    @Input('editable-directive') model: any;
    @Output('editable-directiveChange') update = new EventEmitter();

//    private lastViewModel: any;

    constructor(private elRef: ElementRef) {
        console.log('constructor: ' + JSON.stringify(elRef));
    }

    ngOnChanges(changes: any) {
//        this.lastViewModel = this.model;
        this.refreshView();
    }

    onBlur() {
        let value = this.elRef.nativeElement.innerText;
        if (this.model instanceof Cell) {
            (this.model as Cell).setValue(value);
        }

        this.update.emit(this.model);
    }

    private refreshView() {
        this.elRef.nativeElement.innerText = this.model;
    }
}
