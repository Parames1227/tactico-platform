package io.tactico.playerservice.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name= "players") // name of the table
public class Player {
    @Id //Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // other columns need not be a primary key (Doesn't have to be Unique)
    private String fullName;
    private String position;
    private String nationality;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;
}
