package io.tactico.searchservice.service;

import io.tactico.searchservice.document.PlayerDocument;
import io.tactico.searchservice.dto.PlayerDTO;
import io.tactico.searchservice.repository.PlayerSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class IndexingService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private PlayerSearchRepository playerSearchRepository;

    private final String PLAYER_SERVICE_URL = "http://localhost:8081/api/v1/players";

    public void reindexPlayers() {
        System.out.println("Starting player re-indexing...");


        PlayerDTO[] players = restTemplate.getForObject(PLAYER_SERVICE_URL, PlayerDTO[].class);
        if (players == null) return;


        List<PlayerDocument> playerDocuments = Arrays.stream(players).map(dto -> {
            PlayerDocument doc = new PlayerDocument();
            doc.setId(dto.getId());
            doc.setFullName(dto.getFullName());
            doc.setPosition(dto.getPosition());
            doc.setNationality(dto.getNationality());
            return doc;
        }).toList();


        playerSearchRepository.saveAll(playerDocuments);
        System.out.println("Finished player re-indexing. Indexed " + playerDocuments.size() + " players.");
    }
}