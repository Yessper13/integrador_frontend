package com.example.FrankySabado.modelos.dtos;

import com.example.FrankySabado.ayudas.Roles;

import java.time.LocalDate;

public class EstudianteDTO {

    private String nombre;
    private Roles rol;
    private Double promedio;
    private LocalDate fechaNacimiento;

    public EstudianteDTO() {
    }

    public EstudianteDTO(String nombre, Roles rol, Double promedio, LocalDate fechaNacimiento) {
        this.nombre = nombre;
        this.rol = rol;
        this.promedio = promedio;
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Roles getRol() {
        return rol;
    }

    public void setRol(Roles rol) {
        this.rol = rol;
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
}
