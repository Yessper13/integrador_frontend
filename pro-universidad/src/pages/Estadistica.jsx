import Filtros from '../components/Filtros'
import Footer from '../components/Footer'
import Graficos from '../components/Graficos'
import Header from '../components/header'
import ResumenEstadistico from '../components/ResumenEstadistico'
import TablaDeDatos from '../components/TablaDeDatos'

export default function Estadistica() {
  return (
    <>
        <Header />
        <Filtros /> 
        <ResumenEstadistico />
        <Graficos />
        <TablaDeDatos />
        <Footer />
    </>
  )
}
