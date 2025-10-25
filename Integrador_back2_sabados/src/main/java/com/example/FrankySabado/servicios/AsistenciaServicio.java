package com.example.FrankySabado.servicios;

import com.example.FrankySabado.ayudas.EstadosAsistencia;
import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.modelos.Estudiante;
import com.example.FrankySabado.modelos.dtos.AsistenciaDTO;
import com.example.FrankySabado.modelos.mapas.IMapaAsistencia;
import com.example.FrankySabado.repositorios.IAsistenciaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AsistenciaServicio {
    @Autowired
    private IAsistenciaRepositorio repositorio;
    @Autowired
    private IMapaAsistencia mapa;

    //BUSCAR POR ESTADO DE ASISTENCIAS
    public List<AsistenciaDTO> buscarEstado(EstadosAsistencia estado) throws Exception {
        try {
            List<Asistencia> asistencias = this.repositorio.findByEstado(estado);
            return this.mapa.convertir_lista_a_dto(asistencias);
        } catch (Exception error) {
            throw new Exception("Error: " + error.getMessage());
        }
    }

    //BUSCAR CON FILTRO DE FECHA
    public List<AsistenciaDTO> buscarPorFecha(LocalDate fecha) throws Exception {
        try {

            List<Asistencia> lista = this.repositorio.findByFecha(fecha);

            return this.mapa.convertir_lista_a_dto(lista);
        } catch (Exception error) {
            throw new Exception("Error " + error.getMessage());
        }
    }


    //BUSCAR CON FILTRO DE ID GRUPO
    public List<AsistenciaDTO> buscarPorGrupo(Integer idGrupo) throws Exception {
        try {
            List<Asistencia> lista = this.repositorio.findByIdGrupo(idGrupo);
            return this.mapa.convertir_lista_a_dto(lista);
        } catch (Exception error) {
            throw new Exception("Error: " + error.getMessage());
        }
    }

    public AsistenciaDTO guardarAsistencia(Asistencia asistencia) throws Exception {
        try {
            return this.mapa.convertirModeloADTO(this.repositorio.save(asistencia));
        } catch (Exception error) {
            throw new Exception("Error" + error.getMessage());

        }
    }


}