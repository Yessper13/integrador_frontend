package com.example.FrankySabado.repositorios;

import com.example.FrankySabado.modelos.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUsuarioRepositorio extends JpaRepository<Usuario,Integer> {

    //Personalizando mis consultas en SQL a traves del JPA

    List<Usuario>findByNombre(String nombre);
    Optional<Usuario>findByCorreo(String correo);
    Optional<Usuario> findByNombreAndContraseña(String nombre, String contraseña);


}
