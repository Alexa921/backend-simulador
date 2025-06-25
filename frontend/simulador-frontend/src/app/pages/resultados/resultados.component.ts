import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent {

  resultado: any = {};

  constructor(private router: Router) {
    // Aquí estaba el problema: declaramos la variable correctamente
    const datosGuardados = localStorage.getItem('resultadoSimulacion');

    if (datosGuardados) {
      this.resultado = JSON.parse(datosGuardados);
    } else {
      // Redirigir si no hay datos guardados
      this.router.navigate(['/simulador/formulario']);
    }
  }

  simularOtro() {
  this.router.navigate(['/simulador/formulario']);
}

}
