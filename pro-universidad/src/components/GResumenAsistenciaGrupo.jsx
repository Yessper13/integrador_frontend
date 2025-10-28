import React from 'react'

export default function TablaResumenAsistencia({ asistencias }) {
  if (!asistencias || !asistencias.length) return null;

  // Calcular distribución de estados
  const distribucionEstados = asistencias.reduce((acc, asistencia) => {
    const estado = asistencia.estado || 'Sin estado';
    acc[estado] = (acc[estado] || 0) + 1;
    return acc;
  }, {});

  const totalAsistencias = asistencias.length;

  return (
    <div className="mt-4 max-h-300 overflow-y-auto">
      <h6 className="font-weight-bold">Resumen de Datos</h6>
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <thead>
            <tr>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(distribucionEstados).map(([estado, cantidad]) => (
              <tr key={estado}>
                <td>{estado}</td>
                <td>{cantidad}</td>
                <td>{((cantidad / totalAsistencias) * 100).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}