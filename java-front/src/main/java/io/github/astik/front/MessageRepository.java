package io.github.astik.front;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

import reactor.core.publisher.Flux;

@Repository
public interface MessageRepository extends ReactiveMongoRepository<MessageDto, String>, MessageRepositoryCustom {
	Flux<MessageDto> findAllBy(Pageable pageable);
}
