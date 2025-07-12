package com.kucp1127.StackIt.UserProfiles.Controller;

import com.kucp1127.StackIt.UserProfiles.DTO.LoginDTO;
import com.kucp1127.StackIt.UserProfiles.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public Object login(@RequestBody LoginDTO loginDto) {
        return authService.login(loginDto);
    }
}




