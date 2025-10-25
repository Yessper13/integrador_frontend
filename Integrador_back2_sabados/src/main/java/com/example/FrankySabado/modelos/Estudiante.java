package com.example.FrankySabado.modelos;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "promedio", nullable = false)
    private Double promedio;

    @Column(name = "fechaNacimiento", nullable = false)
    private LocalDate fechaNacimiento;

    // Relación con Usuario
    @OneToOne
    @JoinColumn(name = "fk_usuario", referencedColumnName = "id")
    @JsonManagedReference(value = "relacionestudianteusuario")
    private Usuario usuario;

    // Relación con Asistencia
    @OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "relacionestudianteasistencia")
    private List<Asistencia> asistencias = new ArrayList<>();

    // Relación con Nota
    @OneToMany(mappedBy = "estudiante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "relacionestudiantenota")
    private List<Nota> notas = new ArrayList<>();

    public Estudiante() {
    }

    public Estudiante(Integer id, Double promedio, LocalDate fechaNacimiento, Usuario usuario) {
        this.id = id;
        this.promedio = promedio;
        this.fechaNacimiento = fechaNacimiento;
        this.usuario = usuario;
    }

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getPromedio() {
        return promedio;
    }

    public void setPromedio(Double promedio) {
        this.promedio = promedio;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public List<Asistencia> getAsistencias() {
        return asistencias;
    }

    public void setAsistencias(List<Asistencia> asistencias) {
        this.asistencias = asistencias;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }
}