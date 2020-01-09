package io.github.astik.front;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.RouterFunctions.Builder;
import org.springframework.web.reactive.function.server.ServerResponse;

@Configuration
public class AuthRoutes {
	@Bean
	public RouterFunction<ServerResponse> authRouter(AuthHandler handler) {
		Builder routes = RouterFunctions.route();
		routes.POST("/login", handler::login);
		routes.POST("/logout", handler::logout);
		return routes.build();
	}
}
