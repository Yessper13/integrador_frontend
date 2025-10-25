package com.example.FrankySabado.modelos.mapas;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.example.FrankySabado.modelos.Asistencia;
import com.example.FrankySabado.modelos.dtos.AsistenciaDTO;




import java.util.List;

@Mapper(componentModel = "spring")
public interface IMapaAsistencia {



    @Mapping(source = "estudiante.id", target = "estudiante")
    @Mapping(source = "estado", target = "estado")
    @Mapping(source = "observacion", target = "observacion")
    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source = "idGrupo", target = "idGrupo")
    @Mapping(source = "estudiante.usuario.nombre", target = "estudianteNombre")
    AsistenciaDTO convertirModeloADTO(Asistencia asistencia);

    List<AsistenciaDTO> convertir_lista_a_dto(List<Asistencia> lista);


}