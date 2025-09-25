package io.tactico.searchservice.controller;

import io.tactico.searchservice.document.PlayerDocument;
import io.tactico.searchservice.repository.PlayerSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/search")
public class SearchController {

    @Autowired
    private PlayerSearchRepository playerSearchRepository;

    @GetMapping("/players")
    public ResponseEntity<List<PlayerDocument>> searchPlayers(@RequestParam("q") String query) {
        List<PlayerDocument> players = playerSearchRepository.findByFullNameContainingIgnoreCase(query);
        return ResponseEntity.ok(players);
    }
}