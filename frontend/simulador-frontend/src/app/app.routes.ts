import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormularioInicioComponent } from './pages/formulario-inicio/formulario-inicio.component';
import { FormularioSimulacionComponent } from './pages/formulario-simulacion/formulario-simulacion.component';
import { ResultadosSimulacionComponent } from './pages/resultados/resultados.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'simulador', component: FormularioInicioComponent },
  { path: 'simulador/formulario', component: FormularioSimulacionComponent },
  { path: 'simulador/resultados', component: ResultadosSimulacionComponent },
  { path: '**', redirectTo: '' } 
];
