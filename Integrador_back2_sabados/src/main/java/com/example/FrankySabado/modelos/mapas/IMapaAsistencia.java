package com.example.FrankySabado.modelos.mapas;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.modelos.dtos.AsistenciaDTO;

import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapaAsistencia {



    @Mapping(source = "estudiante", target = "estudiante")
    @Mapping(source = "asistencia", target = "asistencia")
    @Mapping(source = "observacion", target = "observacion")
    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source = "idGrupo", target = "idGrupo")
    AsistenciaDTO convertirModeloADTO(Asistencia asistencia);

    List<AsistenciaDTO> convertir_lista_a_dto(List<Asistencia> lista);


}
