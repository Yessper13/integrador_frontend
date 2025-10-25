import React from 'react'

export default function GRendimientoMaterias() {
  return (
    <>
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Rendimiento por Materia</h6>
            </div>
            <div className="card-body">
                <div className="chart-bar">
                    <canvas id="graficoMaterias" width="400" height="200"></canvas>
                </div>
            </div>
        </div>
    </>
  )
}