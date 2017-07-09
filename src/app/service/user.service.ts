import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConfig } from './app.config';
import { ResponseService } from './response.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  constructor(
    private appConfig: AppConfig,
    private responseService: ResponseService,
    private http: Http) { }

  getAvatarUrl = this.appConfig.baseUrl + '/user/avatar';

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
}
