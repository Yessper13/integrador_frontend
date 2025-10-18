package com.example.FrankySabado.servicios;

import com.example.FrankySabado.modelos.Asistencia;
import org.springframework.beans.factory.annotation.Autowired;

public class AsistenciaServicio {
    @Autowired
    private IAsistenciaRepositorio repositorio;
    @Autowired
    private IMapaServicio mapa;
    private IAsistenciaRepositorio this.repo;

    //BUSCAR POR ESTADO DE ASISTENCIAS
    public AsistenciaDTO buscarEstado(String estado) throws Exception{
        try {
            return this.mapa.convertirModeloADto(this.repositorio.findByEstado(estado));
        } catch (Exception error){
            throw new Exception("Error" + error.getMessage());
        }
    }

    //BUSCAR CON FILTRO DE FECHA
    public AsistenciaDTO buscarPorFecha(String fecha) throws Exception{
        try {
            return this.mapa.convertirModeloADto(this.repositorio.findByFecha(fecha));
        } catch (Exception error){
            throw new Exception("Error" + error.getMessage());
        }
    }

    //BUSCAR CON FILTRO DE ID GRUPO
    public AsistenciaDTO buscarPorGrupo(Integer idGrupo) throws Exception{
        try {
            return this.mapa.convertirModeloADto(this.repositorio.findByGrupo(idGrupo));
        } catch (Exception error){
            throw new Exception("Error" + error.getMessage());
        }
    }

}
