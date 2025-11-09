import React, { useEffect, useState } from 'react'
import GDistribucionNotas from './GDistribucionNotas'

export default function GAsistenciaGrado() {
  const [asistencias, setAsistencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupId, setGroupId] = useState(101);
  const [inputGrupo, setInputGrupo] = useState(String(101));

  // Función de fetch reutilizable
  const fetchAsistencias = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://nondeducible-unnotched-ari.ngrok-free.dev/asistencias/asistenciaGrupo?idGrupo=${id}`);
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(`HTTP ${response.status} - ${txt.slice(0,200)}`);
      }
      const data = await response.json();
      setAsistencias(Array.isArray(data) ? data : []);
    } catch (err) {
      setAsistencias([]);
      setError(String(err.message ?? err));
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar y cuando cambie groupId
  useEffect(() => {
    fetchAsistencias(groupId);
  }, [groupId]);

  // Manejo del submit del form (botón / Enter)
  const handleSubmit = (e) => {
    e?.preventDefault();
    const parsed = parseInt(inputGrupo, 10);
    if (Number.isNaN(parsed)) {
      setError('Ingrese un número de grupo válido');
      return;
    }
    setError(null);
    setGroupId(parsed);
  };

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="d-flex align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">Asistencia por Grado</h6>

            <form className="d-flex" onSubmit={handleSubmit}>
              <input
                type="number"
                min="1"
                className="form-control form-control-sm me-2"
                style={{ width: 100 }}
                value={inputGrupo}
                onChange={(e) => setInputGrupo(e.target.value)}
                aria-label="Id Grupo"
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Cargar
              </button>
            </form>
          </div>
        </div>

        <div className="card-body">
          {loading && <p>Cargando datos...</p>}
          {error && <p className="text-danger">Error: {error}</p>}
          
          {!loading && !error && (
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered">
                <thead style={{ 
                  position: 'sticky', 
                  top: 0, 
                  backgroundColor: '#4e73df',
                  color: 'white',
                  zIndex: 1
                }}>
                  <tr>
                    <th>Estudiante</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Observación</th>
                  </tr>
                </thead>
                <tbody>
                  {asistencias.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">No hay registros</td>
                    </tr>
                  ) : (
                    asistencias.map((asistencia, index) => (
                      <tr key={index}>
                        <td>{asistencia.estudianteNombre}</td>
                        <td>{asistencia.estado}</td>
                        <td>{asistencia.fecha}</td>
                        <td>{asistencia.observacion}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Pasa el grupo y los datos al componente de gráfico */}
      <GDistribucionNotas 
        groupId={groupId}
        asistencias={asistencias}
        loading={loading}
        error={error}
      />
    </>
  )
}