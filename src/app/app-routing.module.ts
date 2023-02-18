import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) }, 
  { path: 'calc', loadChildren: () => import('./pages/calc/calc.module').then(m => m.CalcModule) },
  { path: '', redirectTo: '/calc', pathMatch: 'full'},
  { path: '**', redirectTo: '/calc', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
