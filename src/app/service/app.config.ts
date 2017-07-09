import { Injectable } from '@angular/core';

@Injectable()
export class AppConfig {
  baseUrl: string = ' http://localhost:8001';
  socketUrl: string = 'localhost:8001';
}
