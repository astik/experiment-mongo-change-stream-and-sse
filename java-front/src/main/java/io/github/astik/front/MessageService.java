package io.github.astik.front;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ChangeStreamEvent;
import org.springframework.stereotype.Service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MessageService {
	private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

	private MessageRepository messageRepository;

	public MessageService(MessageRepository messageRepository) {
		this.messageRepository = messageRepository;
	}

	public Flux<MessageDto> changeStream() {
		logger.debug("changeStream");
		return messageRepository.changeStream().map(ChangeStreamEvent::getBody);
	}

	public Flux<MessageDto> findLatest() {
		logger.debug("findLatest");
		Sort sort = Sort.by("date").descending();
		Pageable pageable = PageRequest.of(0, 10, sort);
		return messageRepository.findAllBy(pageable);
	}

	public Mono<MessageDto> create(String userName, Mono<NewMessageDto> newMessageWrapper) {
		logger.debug("create message", newMessageWrapper);
		return newMessageWrapper.flatMap(newMessageDto -> {
			MessageDto messageDto = new MessageDto();
			messageDto.setMessage(newMessageDto.getNewMessage());
			messageDto.setDate(new Date());
			messageDto.setUser(userName);
			return messageRepository.save(messageDto);
		});
	}
}
