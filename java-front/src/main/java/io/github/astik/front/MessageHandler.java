package io.github.astik.front;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
public class MessageHandler {
	private static final Logger logger = LoggerFactory.getLogger(MessageHandler.class);

	private MessageService messageService;

	public MessageHandler(MessageService messageService) {
		this.messageService = messageService;
	}

	public Mono<ServerResponse> createMessage(ServerRequest serverRequest) {
		logger.debug("createMessage");
		Mono<NewMessageDto> messageMono = serverRequest.bodyToMono(NewMessageDto.class);
		List<HttpCookie> cookieList = serverRequest.cookies().get("login");
		if (cookieList.size() == 0) {
			return ServerResponse.status(HttpStatus.UNAUTHORIZED).build();
		}
		String login = cookieList.get(0).getValue();
		Mono<MessageDto> newMessageMono = messageService.create(login, messageMono);
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(newMessageMono, MessageDto.class);
	}

	public Mono<ServerResponse> getMessages(ServerRequest serverRequest) {
		logger.debug("getMessages");
		Flux<MessageDto> findLatest = messageService.findLatest();
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(findLatest, MessageDto.class);
	}

	public Mono<ServerResponse> getLiveMessages(ServerRequest serverRequest) {
		logger.debug("getLiveMessages");
		Flux<List<MessageDto>> findLatest = messageService.findLatest().buffer(Duration.ofSeconds(1));
		Flux<List<MessageDto>> changeStream = messageService.changeStream().map(message -> Arrays.asList(message));
		Flux<List<MessageDto>> allMessageStream = findLatest.mergeWith(changeStream);
		Flux<ServerSentEvent<List<MessageDto>>> serverSentEventFlux = allMessageStream
				.map(messageList -> ServerSentEvent.<List<MessageDto>>builder().data(messageList).build());
		return ServerResponse.ok().contentType(MediaType.TEXT_EVENT_STREAM)
				.body(BodyInserters.fromServerSentEvents(serverSentEventFlux));
	}
}
