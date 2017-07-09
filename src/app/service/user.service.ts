import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from './app.config';
import { ResponseService } from './response.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  constructor(
    private appConfig: AppConfig,
    private responseService: ResponseService,
    private http: Http) { }

  getAvatarUrl = this.appConfig.baseUrl + '/user/avatar';
  getFriendsUrl = this.appConfig.baseUrl + '/user/friends';

  defaultHeaders = new Headers({ 'Content-Type': 'application/json' });

  getAvatar(): Promise<any> {
    let options = new RequestOptions({ headers: this.defaultHeaders });

    return this.http
      .get(this.getAvatarUrl, options)
      .toPromise()
      .then(this.responseService.extractData)
      .catch(this.responseService.handleError);
  }

  storeAvatar(avatar: any) {
    avatar.profileImage = this.appConfig.baseUrl + avatar.profileImage;
    localStorage.setItem('avatar', JSON.stringify(avatar));
  }

  getAvatarFromLocalStorage() {
    var avatar = localStorage.getItem('avatar');
    return avatar ? JSON.parse(avatar) : {};
  }

  getFriendsList(search: string): Observable<any> {
    let options = new RequestOptions({ headers: this.defaultHeaders });
    let url = this.getFriendsUrl;

    if (search) {
      url += `?search=${search}`;
    }

    return this.http
      .get(url, options)
      .map(function(res) {
        return res.json().data;
      });
  }
}
