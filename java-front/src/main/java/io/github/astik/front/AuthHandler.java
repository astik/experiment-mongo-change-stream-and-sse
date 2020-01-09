package io.github.astik.front;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Mono;

@Component
public class AuthHandler {
	private static final Logger logger = LoggerFactory.getLogger(AuthHandler.class);

	public Mono<ServerResponse> login(ServerRequest serverRequest) {
		logger.debug("login");
		Mono<AuthRequestDto> authRequestMono = serverRequest.bodyToMono(AuthRequestDto.class);
		return authRequestMono.flatMap(authRequestDao -> {
			String login = authRequestDao.getLogin();
			if (StringUtils.isEmpty(login)) {
				return ServerResponse.badRequest().build();
			}
			ResponseCookie cookie = ResponseCookie.from("login", login).httpOnly(true).secure(false).path("/")
					.maxAge(24 * 60 * 60 * 1000).build();
			Mono<AuthOperationSuccessDto> newMessageMono = Mono.just(new AuthOperationSuccessDto());
			return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).cookie(cookie).body(newMessageMono,
					MessageDto.class);
		});
	}

	public Mono<ServerResponse> logout(ServerRequest serverRequest) {
		logger.debug("logout");
		ResponseCookie cookie = ResponseCookie.from("login", "").httpOnly(true).secure(false).path("/").maxAge(-1)
				.build();
		Mono<AuthOperationSuccessDto> newMessageMono = Mono.just(new AuthOperationSuccessDto());
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).cookie(cookie).body(newMessageMono,
				MessageDto.class);
	}
}
