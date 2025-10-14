

export default function CampoEntrada({ etiqueta, tipo, valor, alCambiar }) {
  return (
   <>
     <div className="mb-3">
      <label className="form-label">{etiqueta}</label>
      <input
        type={tipo}
        value={valor}
        onChange={alCambiar}
        className="form-control"
      />
    </div>
   </>
  )
}
