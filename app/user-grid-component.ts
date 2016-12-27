import { Component } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Cell } from './cell';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'my-grid',
    template: `
    <button (click)="load()">Load</button>
    <button (click)="save()">Save</button>
    <button (click)="deleteRow()">Delete Row</button>

    <my-fader [isVisible]="errorMessageVisible" [onMyAnimationDone]="myAnimationDone">
        <span class="errorMessageStyle" *ngIf="errorMessage">{{errorMessage}}</span>
    </my-fader>    
    
    <table>
        <tr>
            <th>#</th>
            <th>id</th>
            <th>Name</th>
        </tr>

        <tr *ngFor="let m of rows; let i = index;" (click)="selectRow(i)" [ngClass]="{selected:i==selectedRowIndex}">
            <td>{{i + 1}} {{m.name.isChanged() ? "* &nbsp;" : ""}}</td>
            <td>{{m.customerId}}</td>
            <td [ngClass]="{edited:m.name.isChanged()}"><div contenteditable="true" [(editable-directive)]="m.name">{{m.name.getValue()}}</div></td>
        </tr>
        <button (click)="addRow()">Add</button>
    </table>
    `
})
export class UserGridComponent {
    private rows: User[] = [new User(7, new Cell('Bond')), new User(1, new Cell('One'))];
    private deletedUsers: User[] = [];
    private selectedRowIndex: number;
    private errorMessage: string;
    private errorMessageVisible: boolean;
    private errorMessageSubscription: Subscription;
    private num: number = 3;

    constructor(private userService: UserService) {
    }
    addRow() {
        let user: User = new User(undefined, new Cell(undefined, 'New User ' + this.num++));
        user.updateStatus = 'new';
        this.selectedRowIndex = this.rows.push(user) - 1;
    }

    load() {
        this.userService.getUsers().then(rows => {
            let newRows: User[] = [];
            for (let r of rows) {
                let user: User = new User(r.customerId, new Cell(r.name));
                user.addressline1 = r.addressline1;
                user.addressline2 = r.addressline2;
                user.city = r.city;
                user.creditLimit = r.creditLimit;
                user.discountCode = r.discountCode;
                user.email = r.email;
                user.fax = r.fax;
                user.phone = r.phone;
                user.state = r.state;
                user.zip = r.zip;

                newRows.push(user);
            }
            this.rows = newRows;
        });
        this.selectedRowIndex = -1;
    }

    save() {
        let changedUsers: User[] = [];
        for (let user of this.rows) {
            if (user.isChanged()) {
                changedUsers.push(user);
                if (!user.updateStatus) {
                    user.updateStatus = 'modified';
                }
            }
        }
        for (let user of this.deletedUsers) {
            changedUsers.push(user);
        }

        if (changedUsers.length > 0) {
            this.userService.saveUsers(changedUsers); // .then(rows => this.rows = rows);
        } else {
            this.showError('No changes to save');
        }
    }

    selectRow(index: number) {
        this.selectedRowIndex = index;
        console.log('selected: ' + index);
    }

    deleteRow() {
        if (this.selectedRowIndex >= 0 && this.selectedRowIndex < this.rows.length) {
            let deletedUser: User = this.rows[this.selectedRowIndex];
            this.deletedUsers.push(deletedUser);
            this.rows.splice(this.selectedRowIndex, 1);
            this.selectedRowIndex = -1;
            deletedUser.reset();
            deletedUser.updateStatus = 'deleted';
        } else {
            this.showError('Please select a Row first');
        }
    }

    showError(messageText: string) {
        this.errorMessage = messageText;
        this.errorMessageVisible = true;
        let timer = Observable.timer(5000);
        if (this.errorMessageSubscription) {
            this.errorMessageSubscription.unsubscribe();
            this.errorMessageSubscription = undefined;
        }
        this.errorMessageSubscription = timer.subscribe(t => {
            this.errorMessageVisible = false;
        });
    }

    myAnimationDone() {
        this.errorMessage = undefined;
    }
}
