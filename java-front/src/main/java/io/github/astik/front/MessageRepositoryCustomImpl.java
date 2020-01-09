package io.github.astik.front;

import org.springframework.data.mongodb.core.ChangeStreamEvent;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;

import reactor.core.publisher.Flux;

public class MessageRepositoryCustomImpl implements MessageRepositoryCustom {
	private ReactiveMongoTemplate reactiveMongoTemplate;

	MessageRepositoryCustomImpl(ReactiveMongoTemplate reactiveMongoTemplate) {
		this.reactiveMongoTemplate = reactiveMongoTemplate;
	}

	@Override
	public Flux<ChangeStreamEvent<MessageDto>> changeStream() {
		return reactiveMongoTemplate.changeStream(MessageDto.class).watchCollection("myData").listen();
	}
}
