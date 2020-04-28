import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MfeFileResolver implements Resolve<any> {
  config = {
      home: {
          path: 'http://localhost:4201/main.js',
          id: 'homepage-bundle'
      },
      billing: {
          path: 'http://localhost:4202/main.js',
          id: 'billing-bundle'
      }
  };

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    console.log(route.routeConfig.path);
    console.log(state);
    return this.load(route.routeConfig.path);
  }

  load(route): Observable<boolean> {
    const { path, id } = this.config[route];
    let time = 0;

    if (!document.getElementById(id)) {
      const script = document.createElement('script');
      script.id = id;
      script.src = path;
      script.onerror = () => console.error(`error loading ${path}`);
      document.body.appendChild(script);
      time = 500;
    }

    return of(true).pipe(delay(time));
  }
}
