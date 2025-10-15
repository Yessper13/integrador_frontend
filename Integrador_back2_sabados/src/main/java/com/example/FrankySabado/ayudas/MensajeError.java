package com.example.FrankySabado.ayudas;

public enum MensajeError {
    USUARIO_NO_ENCONTRADO("El usuario no se encuentra en la base de datos"),
    ERROR_GENERAL_API("Upps fallamos el api tuvo un problema ")
    ;

    private final String descripcion;

    MensajeError(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
