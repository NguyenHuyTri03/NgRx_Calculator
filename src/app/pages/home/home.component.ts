import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Counter } from 'src/modules/counter.module';
// import * as CounterActions from '../../actions/counter.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // count$: Observable<Counter>;

  // constructor(private store: Store<{counter: Counter}>){
  //   this.count$ = store.select('counter');
  // }
}
