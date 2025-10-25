package com.example.FrankySabado.controladores;


import com.example.FrankySabado.ayudas.EstadosAsistencia;
import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.modelos.Estudiante;
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
    @GetMapping("/{estado}")
    public ResponseEntity<?> activarBuscarEstado(@PathVariable EstadosAsistencia estado) {
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
    public ResponseEntity<?> buscarPorFecha(@RequestParam LocalDate fecha) {
        try {
            return ResponseEntity.ok(this.servicio.buscarPorFecha(fecha));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //3. Activar API buscar por grupo
    @GetMapping("/asistenciaGrupo")
    public ResponseEntity<?> buscarPorGrupo(@RequestParam Integer idGrupo) {
        try {
            return ResponseEntity.ok(this.servicio.buscarPorGrupo(idGrupo));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?>activarGuardadoAsistencia(@RequestBody Asistencia asistencia){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.guardarAsistencia(asistencia));
        }catch(Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }


}