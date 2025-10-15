package com.example.FrankySabado.servicios;

import com.example.FrankySabado.ayudas.MensajeError;
import com.example.FrankySabado.modelos.Usuario;
import com.example.FrankySabado.modelos.dtos.UsuarioGenericoDTO;
import com.example.FrankySabado.modelos.mapas.IMapaUsuario;
import com.example.FrankySabado.repositorios.IUsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {

    //Lo primero que hace el servicio es llamar al repositorio
    //Inyectar la dependencia del repositorio
    @Autowired
    private IUsuarioRepositorio repositorio;

    @Autowired
    private IMapaUsuario mapa;

    //PROGRAMAR CADA UNA DE LAS FUNCIONES PARA ACTIVAR LAS CONSULTAS DEL API

    //1. Servicio para guardar un usuario
    public UsuarioGenericoDTO guardarUsuarioGenerico(Usuario datosUsuario)throws Exception{
        try{
            //Quiero intentar guardar el usuario
            return this.mapa.convertir_a_dto(this.repositorio.save(datosUsuario));
        }catch(Exception error){
            throw new Exception(MensajeError.ERROR_GENERAL_API.getDescripcion() +error.getMessage());
        }
    }

    //2. Servicio para buscar un usuario por ID
    public UsuarioGenericoDTO buscarUsuarioPorId(Integer idUsuarioABuscar)throws Exception{
        try{
            Optional<Usuario> usuarioEncontrado=this.repositorio.findById(idUsuarioABuscar);
            if(usuarioEncontrado.isPresent()){ //Lo encontre
                return this.mapa.convertir_a_dto(usuarioEncontrado.get());
            }else{ //No lo encontre
                throw new Exception(MensajeError.USUARIO_NO_ENCONTRADO.getDescripcion());
            }
        }catch(Exception error){
            throw new Exception(MensajeError.ERROR_GENERAL_API.getDescripcion()+error.getMessage());
        }
    }

    //3. Servicio para buscar un usuario por correo
    public UsuarioGenericoDTO buscarUsuarioPorCorreo(String correoABuscar)throws Exception{
        try{
            Optional<Usuario> usuarioEncontrado=this.repositorio.findByCorreo(correoABuscar);
            if(usuarioEncontrado.isPresent()){ //Lo encontre
                return this.mapa.convertir_a_dto(usuarioEncontrado.get());
            }else{ //No lo encontre
                throw new Exception(MensajeError.USUARIO_NO_ENCONTRADO.getDescripcion());
            }
        }catch(Exception error){
            throw new Exception(MensajeError.ERROR_GENERAL_API.getDescripcion()+error.getMessage());
        }
    }

    //4. Servicio para buscar Todos los registros de la tabla
    public List<UsuarioGenericoDTO> buscarTodosLosUsuarios()throws Exception{
        try{
            return this.mapa.convertir_lista_a_dto(this.repositorio.findAll());
        }catch(Exception error){
            throw new Exception(MensajeError.ERROR_GENERAL_API.getDescripcion()+error.getMessage());
        }
    }

    //5. Servicio para buscar todos los usuarios que tengan un nombre especifico
    public List<UsuarioGenericoDTO> buscarUsuariosPorNombre(String nombre)throws Exception{
        try{
            return this.mapa.convertir_lista_a_dto(this.repositorio.findByNombre(nombre));
        }catch(Exception error){
            throw new Exception(MensajeError.ERROR_GENERAL_API.getDescripcion()+error.getMessage());
        }
    }



    public UsuarioGenericoDTO loginUsuarioGenerico(String nombre, String contraseña)throws  Exception{
        try{
            Optional<Usuario> loginEncontrado=this.repositorio.findByNombreAndContraseña(nombre,contraseña);
            if(loginEncontrado.isPresent()){ //Lo encontre
                return this.mapa.convertir_a_dto(loginEncontrado.get());
            }else{ //No lo encontre
                throw new Exception(MensajeError.USUARIO_NO_ENCONTRADO.getDescripcion());
            }
        }catch(Exception error){
            throw new Exception(MensajeError.ERROR_GENERAL_API.getDescripcion()+error.getMessage());
        }
    }


}
