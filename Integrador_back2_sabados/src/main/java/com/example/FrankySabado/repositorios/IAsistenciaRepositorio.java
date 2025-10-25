package com.example.FrankySabado.repositorios;

import com.example.FrankySabado.ayudas.EstadosAsistencia;
import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.modelos.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IAsistenciaRepositorio extends JpaRepository<Asistencia, Integer> {

    List<Asistencia> findByEstado(EstadosAsistencia estado);
    @Query("SELECT a FROM Asistencia a WHERE a.fecha = :fecha")
    List<Asistencia> findByFecha(@Param("fecha") LocalDate fecha);


    //Consulta para IdAsistencia
    List<Asistencia>findByIdGrupo(Integer idGrupo);



}