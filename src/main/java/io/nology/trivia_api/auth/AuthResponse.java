package io.nology.trivia_api.auth;

import lombok.Getter;
import lombok.Setter;

public class AuthResponse {

	@Getter
	@Setter
	private String token;

	public AuthResponse(){}

	public AuthResponse(String token) {
		this.token = token;
	}

}