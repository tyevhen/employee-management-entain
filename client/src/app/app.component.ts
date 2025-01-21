import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { State } from './reducers';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private store = inject(Store<State>);
  private dataService = inject(DataService);

  offices$ = this.store.select((state) => state.offices);
  tags$ = this.store.select((state) => state.tags);

  ngOnInit(): void {
    this.dataService.loadOfficesAndTags();
  }
}
