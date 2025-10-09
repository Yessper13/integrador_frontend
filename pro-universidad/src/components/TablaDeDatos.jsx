import React from 'react'

export default function TablaDeDatos() {
  return (
    <>

   <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Top 10 Mejores Estudiantes</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="tablaTopEstudiantes" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Estudiante</th>
                                                    <th>Grado</th>
                                                    <th>Promedio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                               {/* <!-- Datos se cargarán dinámicamente -->*/}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-6 col-lg-6">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">Materias con Mejor Rendimiento</h6>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="tablaTopMaterias" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>Materia</th>
                                                    <th>Promedio</th>
                                                    <th>Estudiantes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/*<!-- Datos se cargarán dinámicamente -->*/}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
           </>
  )
}
