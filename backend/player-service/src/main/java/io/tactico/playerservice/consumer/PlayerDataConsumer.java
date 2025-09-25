package io.tactico.playerservice.consumer;

import io.tactico.playerservice.dto.PlayerDTO;
import io.tactico.playerservice.model.Player;
import io.tactico.playerservice.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PlayerDataConsumer {

    @Autowired
    private PlayerRepository playerRepository;

    @KafkaListener(topics = "raw_player_data", groupId = "player-group")
    public void consume(PlayerDTO message) {
        System.out.println("Consumed JSON message from Kafka -> " + message);

        // Map the data from the DTO to our Player entity
        Player newPlayer = new Player();
        newPlayer.setFullName(message.getFullName());
        newPlayer.setPosition(message.getPosition());
        newPlayer.setNationality(message.getNationality());

        playerRepository.save(newPlayer);
        System.out.println("Saved new player from Kafka JSON message.");
    }
}