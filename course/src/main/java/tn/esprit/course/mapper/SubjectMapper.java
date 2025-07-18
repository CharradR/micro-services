package tn.esprit.course.mapper;

import org.mapstruct.Mapper;
import tn.esprit.course.dto.SubjectRequestDTO;
import tn.esprit.course.dto.SubjectResponseDTO;
import tn.esprit.course.entity.Subject;

@Mapper(componentModel = "spring")
public interface SubjectMapper {
/*
    Subject toEntity(SubjectRequestDTO dto);
    SubjectResponseDTO toDto(Subject subject);*/
}

