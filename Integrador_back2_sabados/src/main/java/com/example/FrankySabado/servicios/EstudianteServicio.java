package com.example.FrankySabado.servicios;

import com.example.FrankySabado.modelos.Estudiante;
import com.example.FrankySabado.modelos.dtos.EstudianteDTO;
import com.example.FrankySabado.modelos.mapas.IMapaEstudiante;
import com.example.FrankySabado.repositorios.IEstudianteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstudianteServicio {
    @Autowired
    private IEstudianteRepositorio repositorio;
    @Autowired
    private IMapaEstudiante mapa;
    //guardar

    public EstudianteDTO guardarEstudiante(Estudiante datosEstudiante) throws Exception {
        try {
            return this.mapa.convertirModeloADto(this.repositorio.save(datosEstudiante));
        } catch (Exception error) {
            throw new Exception("Error" + error.getMessage());

        }
    }
    //buscar por id


    public EstudianteDTO buscarEstudiantePorId(Integer idEstudianteABuscar) throws Exception {
        try {
            Optional<Estudiante> estudianteEncontrado = this.repositorio.findById(idEstudianteABuscar);
            if (estudianteEncontrado.isPresent()) {
                return this.mapa.convertirModeloADto(estudianteEncontrado.get());
            } else {
                throw new Exception("No Encontrado");
            }

        } catch (Exception error) {
            throw new Exception("Error" + error.getMessage());
        }

    }

    //buscarlos todos

    public List<EstudianteDTO> buscarTodosLosEstudiantes() throws Exception {
        try {
            return this.mapa.convertirListaADto(this.repositorio.findAll());
        } catch (Exception error) {
            throw new Exception("Error" + error.getMessage());
        }
    }

    //buscarlos por promedio

    public List<EstudianteDTO> buscarEstudiantesPorPromedio(double promedio) throws Exception {
        try {
            return this.mapa.convertirListaADto(this.repositorio.findByPromedio(promedio));
        } catch (Exception error) {
            throw new Exception("Error" + error.getMessage());
        }

    }
}




