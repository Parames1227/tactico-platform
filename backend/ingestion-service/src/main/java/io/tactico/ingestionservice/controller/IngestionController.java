package io.tactico.ingestionservice.controller;

import io.tactico.ingestionservice.dto.PlayerDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IngestionController {

    @Autowired
    private KafkaTemplate<String, PlayerDTO> kafkaTemplate;

    private static final String TOPIC = "raw_player_data";

    @PostMapping("/ingest")
    public String ingestData(@RequestBody PlayerDTO data) {
        kafkaTemplate.send(TOPIC, data);
        return "PlayerDTO successfully sent to Kafka topic: " + TOPIC;
    }
}