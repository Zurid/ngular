import { Cell } from './cell';

export class User {
    public updateStatus: string;
    public addressline1: string;
    public addressline2: string;
    public city: string;
    public creditLimit: number;
    public discountCode: string;
    public email: string;
    public fax: string;
    public phone: string;
    public state: string;
    public zip: number;

    constructor(public customerId: number, public name: Cell) {
    }

    public isChanged(): boolean {
        return this.name.isChanged();
    }

    public reset() {
        return this.name.reset();
    }
}
