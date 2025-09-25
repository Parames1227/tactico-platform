package io.tactico.searchservice.repository;

import io.tactico.searchservice.document.PlayerDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface PlayerSearchRepository extends ElasticsearchRepository<PlayerDocument, Long> {
    List<PlayerDocument> findByFullNameContainingIgnoreCase(String name);
}