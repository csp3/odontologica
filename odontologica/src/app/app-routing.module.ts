import { HomeComponent } from './components/home/home.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'reserva',
    component: ReservaComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
