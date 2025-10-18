package com.example.FrankySabado.controladores;


import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.servicios.AsistenciaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/asistencias")
public class AsistenciaControlador {
    @Autowired
    AsistenciaServicio servicio;

    //1. Activar API para buscar asistencia por estado
    @GetMapping("/asistenciaEstado")
    public ResponseEntity<?> activarBuscarEstado(@PathVariable String estado) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.buscarEstado(estado));
        } catch (Exception error) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    //2. Activar API para buscar buscar por fecha
    @GetMapping("/asistenciaFecha")
    public ResponseEntity<?> activarBuscarPorFecha(@RequestBody LocalDate fecha) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.buscarPorFecha(fecha));
        } catch (Exception error) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    //3. Activar API buscar por grupo
    @GetMapping("/asistenciaGrupo")
    public ResponseEntity<?> activarBuscarPorGrupo(@PathVariable Integer idGrupo) {
        try {
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.buscarPorGrupo(idGrupo));
        } catch (Exception error) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }
}
