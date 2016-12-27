import {
    Component, OnChanges, SimpleChanges, Input,
    trigger, state, animate, transition, style, AnimationTransitionEvent
} from '@angular/core';

@Component({
    selector: 'my-fader',
    template: `
    <div [@visibilityChanged]="visibility"  (@visibilityChanged.done)="animationDone($event)">
      <ng-content></ng-content>    
    </div>
  `,
    animations: [
        trigger('visibilityChanged', [
            state('shown', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('* => *', animate('.5s'))
        ])
    ]
})
export class FaderComponent implements OnChanges {
    @Input() isVisible: boolean = true;
    @Input() onMyAnimationDone: Function;
    visibility = 'shown';

    ngOnChanges(changes: SimpleChanges) {
        this.visibility = this.isVisible ? 'shown' : 'hidden';
    }

    animationDone(event: AnimationTransitionEvent) {
        if ('hidden' === event.toState) {
            if (this.onMyAnimationDone) {
                this.onMyAnimationDone();
            }
        }
    }
}
