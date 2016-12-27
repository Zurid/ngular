import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { User } from './user';

@Injectable()
export class UserService {
    private usersUrl = 'api/users';  // URL to web api
    constructor(private http: Http) { }
    public getUsers(): Promise<User[]> {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(response => response.json().data as User[])
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    public saveUsers(changedUsers: User[]): Promise<User[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data: string = JSON.stringify(changedUsers);
        console.log('posting data: ');
        console.log(data);

        return this.http.post(this.usersUrl, data, options).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
