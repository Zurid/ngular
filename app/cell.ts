export class Cell {
    value: any;
    newValue?: any;
    public isChanged(): boolean {
        return this.newValue !== undefined;
    }
    public reset(): boolean {
        return this.newValue = undefined;
    }
    public getValue(): any {
        return this.isChanged() ? this.newValue : this.value;
    }
    public setValue(value: any) {
        if (value !== this.value) {
            this.newValue = value;
        }
    }
    constructor(value: any, newValue?: any) {
        this.value = value;
        this.newValue = newValue;
    }
}
