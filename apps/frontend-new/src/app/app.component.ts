import {
  AfterContentChecked,
  ChangeDetectorRef,
  AfterContentInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Event, Router, RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Movie } from '@prisma/client';

import { MediaMatcher } from '@angular/cdk/layout';
import { LoginService } from '@cineman/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'cineman-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit, OnDestroy {
  title = 'frontend-new';

  breakpoint: number;

  colsMap = new Map([
    [Breakpoints.XSmall, 1],
    [Breakpoints.Small, 3],
  ]);

  mobileQuery: MediaQueryList;

  isLoggedIn = false;
  username: string;

  private _mobileQueryListener: () => void;

  constructor(
    private readonly router: Router,
    private readonly breakpointObserver: BreakpointObserver,
    readonly loginService: LoginService,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterContentInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.breakpoint = this.colsMap.get(query) ?? 4;
          }
        }
      });
  }

  ngOnInit(): void {

    this.loginService.isLoggedIn().subscribe((b) => (this.isLoggedIn = b));
    this.loginService.getUsername().subscribe((u) => (this.username = u));

    this.breakpoint = window.innerWidth <= 400 ? 1 : 6;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  login(): void {
    console.log(this.router.url);
    this.router.navigate(['login'], {
      queryParams: { returnUrl: this.router.url },
    });
  }

  logout(): void {
    this.loginService.logout();

    this.snackBar.open('You are logged out', 'close', {
      duration: 2 * 1000,
    });
  }
}
