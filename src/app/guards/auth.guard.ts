import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let stream$;
        if (this.userService.currentUser === undefined) {
            stream$ = this.userService.profile();
        } else {
            stream$ = of(this.userService.currentUser);
        }

        return stream$.pipe(
            map(user => {
                const authRequered = route.data?.authRequiered;
                const home = route.data.thisIsHome;
                if (!!authRequered === !!user) {
                    return true;
                } else if (home) {
                    return true
                } else {
                    const url = this.router.url;
                    this.router.navigateByUrl(url);
                    return false
                }
            }),
            catchError((err) => {
                const url = this.router.url;
                this.router.navigateByUrl(url);
                return of(false);
            })
        );
    }

}