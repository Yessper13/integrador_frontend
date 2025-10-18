package com.example.FrankySabado.servicios;

import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.modelos.dtos.AsistenciaDTO;
import com.example.FrankySabado.modelos.mapas.IMapaAsistencia;
import com.example.FrankySabado.repositorios.IAsistenciaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
@Service
public class AsistenciaServicio {
    @Autowired
    private IAsistenciaRepositorio repositorio;
    @Autowired
    private IMapaAsistencia mapa;

    //BUSCAR POR ESTADO DE ASISTENCIAS
    public AsistenciaDTO buscarEstado(String estado) throws Exception{
        try {
            return this.mapa.convertirModeloADTO((Asistencia) this.repositorio.findByEstado(estado));
        } catch (Exception error){
            throw new Exception("Error" + error.getMessage());
        }
    }

    //BUSCAR CON FILTRO DE FECHA
    public AsistenciaDTO buscarPorFecha(LocalDate fecha) throws Exception{
        try {
            return this.mapa.convertirModeloADTO((Asistencia) this.repositorio.findByFecha(fecha));
        } catch (Exception error){
            throw new Exception("Error" + error.getMessage());
        }
    }

    //BUSCAR CON FILTRO DE ID GRUPO
    public AsistenciaDTO buscarPorGrupo(Integer idGrupo) throws Exception{
        try {
            return this.mapa.convertirModeloADTO((Asistencia) this.repositorio.findByIdGrupo(idGrupo));
        } catch (Exception error){
            throw new Exception("Error" + error.getMessage());
        }
    }

}
