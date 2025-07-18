package tn.esprit.course.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import tn.esprit.course.dto.CourseRequestDTO;
import tn.esprit.course.dto.CourseResponseDTO;
import tn.esprit.course.dto.ModuleRequestDTO;
import tn.esprit.course.entity.Course;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponseDTO toResponseDTO(Course course);
    Course toEntity(CourseRequestDTO dto);
}