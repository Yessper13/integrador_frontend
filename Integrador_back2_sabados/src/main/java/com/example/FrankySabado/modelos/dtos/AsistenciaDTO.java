package com.example.FrankySabado.modelos.dtos;

import com.example.FrankySabado.ayudas.EstadosAsistencia;
import com.example.FrankySabado.modelos.Estudiante;

import java.time.LocalDate;

public class AsistenciaDTO {

    private Estudiante estudiante;
    private EstadosAsistencia estado;
    private String observacion;
    private LocalDate fecha;
    private Integer idGrupo;

    public AsistenciaDTO() {
    }

    public AsistenciaDTO(Estudiante estudiante, EstadosAsistencia estado, String observacion, LocalDate fecha, Integer idGrupo) {
        this.estudiante = estudiante;
        this.estado = estado;
        this.observacion = observacion;
        this.fecha = fecha;
        this.idGrupo = idGrupo;
    }

    public Estudiante getEstudiante() {
        return estudiante;
    }

    public void setEstudiante(Estudiante estudiante) {
        this.estudiante = estudiante;
    }

    public EstadosAsistencia getEstado() {
        return estado;
    }

    public void setEstado(EstadosAsistencia estado) {
        this.estado = estado;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(Integer idGrupo) {
        this.idGrupo = idGrupo;
    }
}
