package io.tactico.searchservice.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlayerDTO {
    private Long id;
    private String fullName;
    private String position;
    private String nationality;

    @Override
    public String toString() {
        return "PlayerDTO{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", position='" + position + '\'' +
                ", nationality='" + nationality + '\'' +
                '}';
    }
}
