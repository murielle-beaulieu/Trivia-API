package io.nology.trivia_api.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.nology.trivia_api.User.User;
import io.nology.trivia_api.User.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private AuthService authService;

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<AuthResponse> register(
			@Valid @RequestBody AuthRegisterDTO data
	) {
		AuthResponse res = this.authService.register(data);
		return new ResponseEntity<AuthResponse>(res, HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public ResponseEntity<AuthResponse> login(@RequestBody AuthLoginDTO data) throws NotFoundException {
		System.out.println(data.getEmail() + " email");
		System.out.println(data.getPassword() + " password");
		return new ResponseEntity<>(authService.login(data), HttpStatus.OK);
	}

	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile (@RequestBody AuthLoginDTO data ) throws NotFoundException {
		User found = this.userService.getByEmail(data.getEmail());
		return new ResponseEntity<>(found, HttpStatus.OK);
	}
	
}