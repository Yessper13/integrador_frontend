import React from 'react'

export default function ResumenEstadistico() {
  return (
   <>
    <div className="row mb-4">
                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-primary shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total Estudiantes</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800" id="total-estudiantes">0</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-users fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-success shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Promedio General</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800" id="promedio-general">0%</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-chart-line fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-info shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                Asistencia Promedio</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800" id="asistencia-promedio">0%</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-calendar-check fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-md-6 mb-4">
                            <div className="card border-left-warning shadow h-100 py-2">
                                <div className="card-body">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Casos de Bienestar</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800" id="casos-bienestar">0</div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fas fa-heartbeat fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
   </>
  )
}
