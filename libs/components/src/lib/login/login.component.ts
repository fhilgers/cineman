import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from 'stream';
import { LoginService } from '@cineman/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'cineman-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  returnUrl: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,
    private readonly loginService: LoginService,
    private readonly snackBar: MatSnackBar
  ) {}

  //@Input() error: string | null;
  //@Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    if (this.form.valid) {
      this.loginService
        .login(this.form.value.username, this.form.value.password)
        .subscribe({
          next: (user) => {
            console.log(user);
            this.router.navigateByUrl(this.returnUrl);
            this.snackBar.open('You are logged in', 'close', {
              duration: 5 * 1000,
            });
          },
          error: (err) => {
            console.log(err);
            this.form.reset();
            this.snackBar.open('Invalid username or password', 'close', {
              duration: 5 * 1000,
            });
          },
        });
    }
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }
}
