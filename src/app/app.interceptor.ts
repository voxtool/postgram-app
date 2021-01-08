import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Provider } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.url.includes('http')) {
            req = req.clone({
                url: `${apiUrl}${req.url}`
            })
        }
        if (req.url.includes(apiUrl)) {
            req = req.clone({
                withCredentials: true,
                headers: req.headers
                .set('Cache-Control', 'no-cache')
                .set('Pragma', 'no-cache')
                .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
            })
        }
        return next.handle(req);
    }

}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
}