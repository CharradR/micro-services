package com.example.demo.dto;

import com.example.demo.entities.Indisponibilities;

import java.util.List;

public record EnseignantDto(Integer id ,
                            String fist_name ,
                            String last_name ,
                            List<Indisponibilities> indisponibilities

) {
}
