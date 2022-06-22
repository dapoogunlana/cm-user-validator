import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AuthStorageService } from 'src/app/app-support/services/authorization/auth-storage.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private authStorage: AuthStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const currentUserToken = this.authStorage.getString('token');

      if (currentUserToken && request.url.startsWith(environment.baseUrl)) {
        request = request.clone({
            setHeaders : {
                Authorization : `Bearer ${currentUserToken}`
            }
          });
      }
      return next.handle(request);

    }
}
