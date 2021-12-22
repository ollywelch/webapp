import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
    ) {}

  currentUser?: User;
  isLoading: boolean = true;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.currentUser()
    .subscribe(user => {
      this.currentUser = user;
      this.isLoading = false;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
