import React from 'react'

export default function Graficos() {
  return (
    <>
     <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Distribución de Notas</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-bar">
                                        <canvas id="graficoNotas" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Asistencia por Grado</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-bar">
                                        <canvas id="graficoAsistencia" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Casos de Bienestar por Tipo</h6>
                                </div>
                                <div className="card-body">
                                    <div className="chart-pie pt-4 pb-2">
                                        <canvas id="graficoBienestar" width="400" height="200"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6">
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
                        </div>
                    </div>

    </>
  )
}
