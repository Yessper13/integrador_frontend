package com.example.FrankySabado.controladores;

import com.example.FrankySabado.modelos.Estudiante;
import com.example.FrankySabado.servicios.EstudianteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/estudiantes")
public class EstudianteControlador {
    @Autowired
    EstudianteServicio servicio;

    //1. Activando las peticion de guardar estudiante
    @PostMapping
    public ResponseEntity<?>activarGuardadoEstudiante(@RequestBody Estudiante datos){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.guardarEstudiante(datos));
        }catch(Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?>activarBuscarTodosEstudiantes(){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.buscarTodosLosEstudiantes());
        }catch(Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }



}
