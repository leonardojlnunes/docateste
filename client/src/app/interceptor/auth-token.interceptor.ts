import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PoNotificationService } from '@po-ui/ng-components';
import { getToken } from '../utils/token';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(public notification: PoNotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = getToken() || '';
    const headers = new HttpHeaders()
      .set('Content-Type', ['application/json'])
      .set('Authorization', [`Bearer ${token}`]);
    return next.handle(request.clone({ headers })).pipe(
      map((resp) => {
        if (resp instanceof HttpResponse) {
          if (resp?.body?.message) this.notification.success(resp.body.message);
          return resp;
        }
        return resp;
      })
    );
  }
}
