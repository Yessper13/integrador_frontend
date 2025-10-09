import React from 'react'

export default function Filtros() {
  return (
  <>
           <div className="row mb-4">
                        <div className="col-md-3">
                            <label className="form-label">Año Académico</label>
                            <select id="filtro-anio" className="form-control">
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Grado</label>
                            <select id="filtro-grado" className="form-control">
                                <option value="">Todos los grados</option>
                                <option value="10">10°</option>
                                <option value="11">11°</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Período</label>
                            <select id="filtro-periodo" className="form-control">
                                <option value="">Todo el año</option>
                                <option value="1">Primer Trimestre</option>
                                <option value="2">Segundo Trimestre</option>
                                <option value="3">Tercer Trimestre</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">&nbsp;</label>
                            <button className="btn btn-primary w-100" onclick="estadisticas.generarReporte()">
                                <i className="fas fa-chart-bar"></i> Generar Reporte
                            </button>
                        </div>
                    </div>
  </>
  )
}
