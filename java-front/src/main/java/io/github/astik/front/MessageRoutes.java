package io.github.astik.front;

import static org.springframework.web.reactive.function.server.RequestPredicates.accept;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.RouterFunctions.Builder;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class MessageRoutes {
	@Bean
	public RouterFunction<ServerResponse> messageRouter(MessageHandler handler) {
		Builder routes = RouterFunctions.route();
		routes.GET("/messages", accept(MediaType.APPLICATION_JSON), handler::getMessages);
		routes.GET("/messages", accept(MediaType.TEXT_EVENT_STREAM), handler::getLiveMessages);
		routes.POST("/messages", accept(MediaType.APPLICATION_JSON), handler::createMessage);
		return routes.build();
	}
}
