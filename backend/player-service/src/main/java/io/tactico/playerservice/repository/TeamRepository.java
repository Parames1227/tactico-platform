package io.tactico.playerservice.repository;

import io.tactico.playerservice.model.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}