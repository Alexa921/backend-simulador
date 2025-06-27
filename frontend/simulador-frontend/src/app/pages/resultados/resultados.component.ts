import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-resultados-simulacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosSimulacionComponent {

  resultado: any;

  constructor(private router: Router) {
    const datosGuardados = localStorage.getItem('resultadoSimulacion');
    if (datosGuardados) {
      this.resultado = JSON.parse(datosGuardados);
      setTimeout(() => this.generarGrafico(), 0);
    } else {
      this.router.navigate(['/simulador/formulario']);
    }
  }

 generarGrafico() {
  const tasaImpuestos = this.resultado.tasa;  

  const ctx = document.getElementById('graficoImpuestos') as HTMLCanvasElement;

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Impuestos', 'Resto del crédito'],
      datasets: [{
        data: [tasaImpuestos, 100 - tasaImpuestos],
        backgroundColor: ['#21b9d9', '#041361']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}


  simularOtro() {
    this.router.navigate(['/simulador/formulario']);
  }
}
