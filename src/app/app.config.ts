import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';
import { Http } from '@angular/http';

/*
@Injectable()
export class AppConfig {

    static settings: any;
    constructor(private http: HttpClient) {}
    load() {

        const jsonFile = `assets/config/config.dev.json`;

        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).toPromise().then((response: any) => {
               AppConfig.settings = response;
               resolve();
            }).catch((response: any) => {
               reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}
*/

@Injectable()
export class AppConfig {
    static settings: any;
    constructor(private http: Http) { }
    load() {
        return this.http.get('assets/config/config.dev.json').pipe(tap(resp => {
            AppConfig.settings = resp.json();
            return resp;
        })).toPromise();
    }
}