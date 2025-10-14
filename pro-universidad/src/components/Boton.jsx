export default function Boton({ texto, alClic, deshabilitado }) {
  return (
   <>
    <button
      onClick={alClic}
      disabled={deshabilitado}
      className={`btn btn-primary w-100 ${deshabilitado ? "disabled" : ""}`}
    >
      {texto}
    </button>
   </>
  )
}
