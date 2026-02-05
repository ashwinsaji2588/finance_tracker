To complete the **Identity Module** at a professional level, you need to move beyond simple data entry and implement a robust authentication flow. This is the "gatekeeper" of your application.

Here is the detailed breakdown to finalize this module.

---

## 1. Transition to JWT (Stateless Authentication)

Currently, you have User Ingestion. Now you need a way for them to "stay logged in" without sending passwords every time.

### The Flow:

1. **Login Request:** User sends `email` and `password` to `/api/auth/login`.
2. **Validation:** `UserService` checks the DB, and `PasswordEncoder` matches the raw password with the hashed one.
3. **Token Generation:** If valid, the server generates a **JWT** (signed with a secret key) and returns it in the response.
4. **Subsequent Requests:** The client includes this token in the `Authorization: Bearer <token>` header.

### Components to Build:

* **`JwtUtils`:** A utility class to generate, parse, and validate tokens (using the `io.jsonwebtoken` library).
* **`JwtAuthenticationFilter`:** A custom filter that extends `OncePerRequestFilter`. It intercepts every request, extracts the token, validates it, and sets the user in the `SecurityContext`.

---

## 2. Secure Session Management

Since you are using Docker and potentially scaling, you should avoid "Server-side Sessions" (HttpSession). Stick to **Stateless Sessions**.

* **Token Expiration:** Set a reasonable expiration (e.g., 1 hour).
* **Security Context:** Once the Filter validates a token, it populates `UsernamePasswordAuthenticationToken`. This allows you to use `@AuthenticationPrincipal` in your controllers to get the logged-in user's ID instantly.

---

## 3. Enhanced Security Configuration

Update your `SecurityConfig.java` to handle the new JWT filter and tighten the hatches.

```java
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // Disabled for stateless APIs
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll() // Login & Register
            .anyRequest().authenticated()
        );
    
    // Add your JWT filter before the standard UsernamePassword filter
    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    
    return http.build();
}

```

---

## 4. Global Exception Handling (The "FinTech" Touch)

Professional apps don't return 500 Internal Server Errors. They return meaningful JSON. Use a `@RestControllerAdvice` to catch:

* `BadCredentialsException` -> Return 401 Unauthorized ("Invalid email or password").
* `UserAlreadyExistsException` -> Return 409 Conflict.
* `MethodArgumentNotValidException` -> Return 400 Bad Request with a list of validation errors.

---

## 5. Implementation Checklist

* [ ] **Add Dependency:** Add `jjwt-api`, `jjwt-impl`, and `jjwt-jackson` to your `pom.xml`.
* [ ] **Create Login DTOs:** Create `LoginRequest` (email/password) and `AuthResponse` (the actual JWT string).
* [ ] **Build `AuthService`:** This service should handle the authentication logic and return the token.
* [ ] **Test via Postman:**
1. Register a user.
2. Login to receive a token.
3. Use that token to try and access a protected `/api/transactions` endpoint (which should be empty for now).



**Would you like me to provide a production-ready `JwtUtils` class code, or would you prefer the logic for the `JwtAuthenticationFilter` first?**