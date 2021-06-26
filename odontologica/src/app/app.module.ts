import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MicalendarioComponent } from './components/micalendario/micalendario.component';
import { MihorarioComponent } from './components/mihorario/mihorario.component';
import { MiconsultaComponent } from './components/miconsulta/miconsulta.component';
import { LogeoComponent } from './components/logeo/logeo.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MicalendarioComponent,
    MihorarioComponent,
    MiconsultaComponent,
    LogeoComponent,
    ReservaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
