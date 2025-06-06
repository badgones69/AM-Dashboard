import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from './shared/services/user.service';
import { User } from './shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
import { NoopScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../styles.scss'],
})
export class AppComponent implements OnInit {
  public authenticatedUser!: User | null;

  public menuOpened: boolean = false;
  public airlineMenuExpanded: boolean = false;
  public hubMenuExpanded: boolean = false;
  public aircraftMenuExpanded: boolean = false;
  public routeMenuExpanded: boolean = false;
  public helpMenuExpanded: boolean = false;

  constructor(
    readonly userService: UserService,
    readonly router: Router,
    readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.authenticatedUser = JSON.parse(user.toString());
      } else {
        this.authenticatedUser = null;
      }
    });
  }

  menuToggle(): void {
    this.menuOpened = !this.menuOpened;

    if (!this.menuOpened) {
      this.airlineMenuExpanded = false;
      this.hubMenuExpanded = false;
      this.aircraftMenuExpanded = false;
      this.routeMenuExpanded = false;
      this.helpMenuExpanded = false;
    }
  }

  airlineMenuToggle(): void {
    this.airlineMenuExpanded = !this.airlineMenuExpanded;
  }

  hubMenuToggle(): void {
    this.hubMenuExpanded = !this.hubMenuExpanded;
  }

  aircraftMenuToggle(): void {
    this.aircraftMenuExpanded = !this.aircraftMenuExpanded;
  }

  routeMenuToggle(): void {
    this.routeMenuExpanded = !this.routeMenuExpanded;
  }

  openAboutDialog(): void {
    this.dialog.open(AboutComponent, {
      disableClose: false,
      autoFocus: true,
      scrollStrategy: new NoopScrollStrategy(),
    });
  }

  logout(): void {
    // Session closing
    this.userService.disconnectUser();
    // Redirection to authentication page
    this.router.navigate(['authentication']);
  }
}
