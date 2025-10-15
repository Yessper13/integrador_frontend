package com.example.FrankySabado.controladores;

import com.example.FrankySabado.modelos.Usuario;
import com.example.FrankySabado.servicios.UsuarioServicio;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios") //ACA BAUTIZO EL SERVICIO(API)
public class UsuarioControlador {

    //Llamar al servicio
    //Inyectar la dependencia al servicio
    @Autowired
    UsuarioServicio servicio;

    //En el controlador activo la recepcion
    //y el envio de respuestas hacia el cliente
    //por cada funcion que tenga en mi servicio

    //1.Activando el API para guardar 1 usuario
    @PostMapping
    public ResponseEntity<?>activarPeticionGuardar(@RequestBody Usuario datos){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.guardarUsuarioGenerico(datos));
        }catch (Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    @GetMapping("/login")
    public ResponseEntity<?>login(@RequestParam String nombre,@RequestParam String contraseña ){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.loginUsuarioGenerico(nombre, contraseña));
        }catch(Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?>activarPeticionBuscarTodos(){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.buscarTodosLosUsuarios());
        }catch(Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }

    //3. Activando el servicio para buscar usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> activarPeticionBuscarPorId(@PathVariable Integer id){
        try{
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(this.servicio.buscarUsuarioPorId(id));
        }catch(Exception error){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(error.getMessage());
        }
    }





}
