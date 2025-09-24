package io.tactico.playerservice.controller;

import io.tactico.playerservice.model.Team;
import io.tactico.playerservice.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1/teams")
public class TeamController {

    @Autowired
    private TeamRepository teamRepository;

    @PostMapping
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        Team savedTeam = teamRepository.save(team);
        return ResponseEntity.ok(savedTeam);
    }

    @GetMapping
    public ResponseEntity<List<Team>> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        return ResponseEntity.ok(teams);
    }
}