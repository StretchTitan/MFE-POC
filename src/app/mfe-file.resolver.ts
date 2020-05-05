import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MfeFileResolver implements Resolve<any> {
  config = {
    home: {
      path: 'http://localhost:4201/main.js',
      id: 'homepage-bundle',
    },
    billing: {
      path: 'http://localhost:4202/main.js',
      id: 'billing-bundle',
    },
  };

  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this.load(route.routeConfig.path);
  }

  load(route): Promise<any> {
    const { path, id } = this.config[route];

    return new Promise((resolve, reject) => {
      if (!document.getElementById(id)) {
        const script = document.createElement('script');
        script.id = id;
        script.src = path;
        script.onerror = () => reject(`error loading ${path}`);
        document.body.appendChild(script);
        script.onload = () => resolve(`${path} loaded successfuly`);
      } else {
        resolve(true);
      }
    }).catch(error => console.error(error));
  }
}
