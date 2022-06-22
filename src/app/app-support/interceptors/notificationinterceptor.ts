import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    constructor( private toastr: ToastrService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 0) {
            this.toastr.warning('Unable to connect to server', 'Connection Error', { timeOut : 8000 });
          } else if (error.status === 400) {
            this.toastr.error(error.error.message, 'Error', { timeOut : 8000 });
          } else {
            if (error.error && error.error.message) {
              this.toastr.error(error.error.message, 'Error', { timeOut : 8000 });
            } else if (error.statusText) {
              this.toastr.error(error.statusText, 'Error', { timeOut : 8000 });
            } else {
              this.toastr.error('Server error', 'Error', { timeOut : 8000 });
            }
          }
        //  this.headerinfo.pageLoadingError();
          return throwError(error.error);
        })
      );

    }
}
