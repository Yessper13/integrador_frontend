import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import TablaResumenAsistencia from './GResumenAsistenciaGrupo.jsx'

export default function GDistribucionNotas({ groupId, asistencias, loading, error }) {
  const chartRef = useRef(null);

  // Efecto para crear/actualizar el gráfico cuando cambian los datos
  useEffect(() => {
    if (!asistencias || !asistencias.length || loading) return;

    // Procesar datos para el gráfico
    const distribucionEstados = asistencias.reduce((acc, asistencia) => {
      const estado = asistencia.estado || 'Sin estado';
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(distribucionEstados);
    const data = Object.values(distribucionEstados);

    // Colores para diferentes estados
    const colores = {
      'Asistió': '#4e73df',
      'Asistio': '#4e73df',
      'No asistió': '#e74a3b',
      'No_asistio': '#e74a3b'
    };

    const backgroundColors = labels.map(label => 
      colores[label] || `#${Math.floor(Math.random()*16777215).toString(16)}`
    );

    // Destruir gráfico anterior si existe
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Crear nuevo gráfico
    const ctx = document.getElementById('graficoDistribucionNotas');
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Cantidad de Estudiantes',
              data: data,
              backgroundColor: backgroundColors,
              borderColor: backgroundColors.map(color => color.replace('0.2', '1')),
              borderWidth: 1
              
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: `Distribución de Asistencia - Grupo ${groupId}`
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad de Estudiantes'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Estado de Asistencia'
              }
            }
          }
        }
      });
    }
    // Limpiar al desmontar el componente
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [asistencias, loading, groupId]);

  return (
    <>
      <div className="card shadow mb-2 p-2"> 
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Grafico de Asistencia - Grupo {groupId}
          </h6>
        </div> 

          {!loading && !error && asistencias && asistencias.length > 0 && (
            <TablaResumenAsistencia asistencias={asistencias} />
          )}
        <div className="card-body">
          {loading && (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Cargando datos...</span>
              </div>
              <p className="mt-2">Cargando datos...</p>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger" role="alert">
              Error: {error}
            </div>
          )}

          {/* Gráfico */}
          <div className="chart-bar " style={{ position: 'absolute', height: '400px' }}>
            <canvas id="graficoDistribucionNotas"></canvas>
          </div>


        </div>
      </div>
    </>
  )
}