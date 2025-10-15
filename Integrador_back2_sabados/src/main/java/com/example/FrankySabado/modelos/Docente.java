package com.example.FrankySabado.modelos;

import com.example.FrankySabado.ayudas.Departamentos;
import com.example.FrankySabado.ayudas.Especialidad;
import com.example.FrankySabado.ayudas.nivelAcademico;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
@Table(name = "docente")

public class Docente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "especialidad", nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private Especialidad especialidad;

    @Column(name = "nivelAcademico", nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private nivelAcademico nivelacademico;

    @Column(name = "departamentos", nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private Departamentos departamento;

    @OneToOne
    @JoinColumn(name = "fk_usuario", referencedColumnName = "id")
    @JsonManagedReference(value = "relaciondocenteousuario")
    private Usuario usuario;


    public Docente() {

    }

    public Docente(Integer id, Especialidad especialidad, nivelAcademico nivelacademico, Departamentos departamento) {
        this.id = id;
        this.especialidad = especialidad;
        this.nivelacademico = nivelacademico;
        this.departamento = departamento;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Especialidad getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(Especialidad especialidad) {
        this.especialidad = especialidad;
    }

    public nivelAcademico getNivelacademico() {
        return nivelacademico;
    }

    public void setNivelacademico(nivelAcademico nivelacademico) {
        this.nivelacademico = nivelacademico;
    }

    public Departamentos getDepartamento() {
        return departamento;
    }

    public void setDepartamento(Departamentos departamento) {
        this.departamento = departamento;
    }
}
