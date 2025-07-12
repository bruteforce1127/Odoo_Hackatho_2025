package com.kucp1127.StackIt.UserProfiles.Service;

import com.kucp1127.StackIt.UserProfiles.DTO.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private SchoolStudentService schoolService;
    @Autowired
    private CollegeStudentService collegeService;
    @Autowired
    private WorkingProfessionalService professionalService;

    public Object login(LoginDTO loginDto) {
        String username = loginDto.getUsername();
        String password = loginDto.getPassword();

        // 1) School Student
        if (schoolService.getByUsername(username).isPresent()) {
            var user = schoolService.getByUsername(username).get();
            if (user.getPassword().equals(password)) {
                System.out.println("Login Successful");
                return user;
            } else {
                return "wrong credentials";
            }
        }

        // 2) College Student
        if (collegeService.getByUsername(username).isPresent()) {
            var user = collegeService.getByUsername(username).get();
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                return "wrong credentials";
            }
        }

        // 3) Working Professional
        if (professionalService.getByUsername(username).isPresent()) {
            var user = professionalService.getByUsername(username).get();
            if (user.getPassword().equals(password)) {
                return user;
            } else {
                return "wrong credentials";
            }
        }

        // No user found
        return "username does not exist";
    }
}
