import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Calc } from 'src/modules/calc.module';
import * as CalcActions from '../../actions/calc.actions';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})

export class CalcComponent implements OnInit{
  result$: Observable<Calc>;
  method= '';
  final = '';
  calcState = false;


  constructor(private store: Store<{calc: Calc}>){
    this.result$ = store.select('calc');
  }

  ngOnInit(): void {
    this.result$.subscribe((data) => {
      this.method = data.numA + data.equation + data.numB;
      if((parseFloat(data.result) % 1) != 0){
        this.final = (parseFloat(data.result).toFixed(2)).toString();
      }else{
        this.final = data.result;
      }
    });
  } 

  keyPressed(key: string, kType: string){
    this.store.dispatch(CalcActions.keyPressed({
      key: key,
      keyType: kType
    }));
  }
}
