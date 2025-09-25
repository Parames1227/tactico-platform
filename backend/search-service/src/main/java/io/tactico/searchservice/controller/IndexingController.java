package io.tactico.searchservice.controller;

import io.tactico.searchservice.service.IndexingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/index")
public class IndexingController {

    @Autowired
    private IndexingService indexingService;

    @PostMapping("/reindex")
    public ResponseEntity<String> reindex() {
        indexingService.reindexPlayers();
        return ResponseEntity.ok("Re-indexing process started.");
    }
}