package io.nology.trivia_api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.nology.trivia_api.User.User;
import io.nology.trivia_api.User.UserRepository;
import io.nology.trivia_api.config.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private final PasswordEncoder passwordEncoder;

	@Autowired
	private final JwtService jwtService;

	@Autowired
	private final AuthenticationManager authManager;

	public AuthResponse register(AuthRegisterDTO data) {
		User user = new User(data.getFirstName(),
				data.getLastName(),
				data.getEmail(),
				passwordEncoder.encode(data.getPassword()));

		userRepository.save(user);
		String token = jwtService.generateToken(user);
		return new AuthResponse(token);

	}
	
	public AuthResponse login(AuthLoginDTO data) throws NotFoundException {

		UsernamePasswordAuthenticationToken token =  new UsernamePasswordAuthenticationToken(
	            data.getEmail(),
	            data.getPassword()
	        );

		authManager.authenticate(token);

		User user = userRepository.findByEmail(data.getEmail()).orElseThrow(
				() -> new NotFoundException());
		String jwtToken = jwtService.generateToken(user);
		return new AuthResponse(jwtToken);
	}
}