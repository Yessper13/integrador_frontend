import React from "react";
import GDistribucionNotas from "./GDistribucionNotas.jsx";
import GAsistenciaGrado from "./GAsistenciaGrado.jsx";
import GBienestarTipo from "./GBienestarTipo.jsx";
import GRendimientoMaterias from "./GRendimientoMaterias.jsx";

export default function Graficos() {
  return (
    <div className="container-fluid px-4">
      {/* Primera fila */}
      <div className="row gx-4">
        <div className="col-12 col-xl-6">
          <GDistribucionNotas />
        </div>
        <div className="col-12 col-xl-6">
          <GAsistenciaGrado />
        </div>
      </div>

      {/* Segunda fila */}
      <div className="row gx-4 mt-4">
        <div className="col-12 col-xl-6">
          <GBienestarTipo />
        </div>
        <div className="col-12 col-xl-6">
          <GRendimientoMaterias />
        </div>
      </div>
    </div>
  );
}