package com.example.FrankySabado.modelos;


import com.example.FrankySabado.ayudas.Parentescos;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name="familiar")

public class Familiar {

    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    @Column(name = "parentesco", nullable = false, unique = false)
    @Enumerated(EnumType.STRING)
    private Parentescos parentesco;

    @Column(name="telefono", nullable = false, unique = false)
    private Integer telefono;

    @Column(name="direccion", nullable = false, unique = false)
    private String direccion;


    @OneToOne
    @JoinColumn(name = "fk_usuario",referencedColumnName = "id")
    @JsonBackReference(value = "relacionfamiliarusuario")
    private Usuario usuario;

    public Familiar() {
    }

    public Familiar(Integer id, Parentescos parentesco, Integer telefono, String direccion) {
        Id = id;
        this.parentesco = parentesco;
        this.telefono = telefono;
        this.direccion = direccion;
    }

    public Integer getId() {
        return Id;
    }

    public void setId(Integer id) {
        Id = id;
    }

    public Parentescos getParentesco() {
        return parentesco;
    }

    public void setParentesco(Parentescos parentesco) {
        this.parentesco = parentesco;
    }

    public Integer getTelefono() {
        return telefono;
    }

    public void setTelefono(Integer telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}

