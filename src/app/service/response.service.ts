import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

@Injectable()
export class ResponseService {
  extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  handleError(error: any) {
    let errMsg = (error.json().message) ? error.json().message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Promise.reject(errMsg);
  }
}
