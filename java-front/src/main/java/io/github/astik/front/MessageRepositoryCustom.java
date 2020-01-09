package io.github.astik.front;

import org.springframework.data.mongodb.core.ChangeStreamEvent;

import reactor.core.publisher.Flux;

public interface MessageRepositoryCustom {
	Flux<ChangeStreamEvent<MessageDto>> changeStream();
}
