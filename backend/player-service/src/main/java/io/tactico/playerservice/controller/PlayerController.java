package io.tactico.playerservice.controller;

import io.tactico.playerservice.model.Player;
import io.tactico.playerservice.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/players")
public class PlayerController {
    @Autowired
    private PlayerRepository playerRepository;


    @PostMapping
    public ResponseEntity<Player> createPlayer(@RequestBody Player player) {
        Player savedPlayer = playerRepository.save(player);// nothing complex, we've created a variable name.  that's it
        return ResponseEntity.ok(savedPlayer);
        /*
        it can be done like this too.
        return ResponseEntity.ok(playerRepository.save(player));

         */
    }
    @GetMapping
    public ResponseEntity<List<Player>> getAllPlayers() {
        List<Player> players = playerRepository.findAll();

        return ResponseEntity.ok(players);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Player> getPlayersById(@PathVariable Long id) {
        Optional<Player> playerOptional = playerRepository.findById(id);
        // why this? If a player is not found, then the test response could be an error (not 200)
        return playerOptional.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
