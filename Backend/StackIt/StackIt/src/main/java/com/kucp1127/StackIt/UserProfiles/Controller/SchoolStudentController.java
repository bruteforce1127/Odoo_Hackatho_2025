package com.kucp1127.StackIt.UserProfiles.Controller;

import com.kucp1127.StackIt.Email.Controller.EmailController;
import com.kucp1127.StackIt.UserProfiles.Model.SchoolStudentModel;
import com.kucp1127.StackIt.UserProfiles.Service.SchoolStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/school")
@CrossOrigin("*")
public class SchoolStudentController {
    @Autowired
    private SchoolStudentService service;

    @Autowired
    private EmailController emailController;

    @PostMapping("/register")
    public ResponseEntity<SchoolStudentModel> create(@RequestBody SchoolStudentModel student) {
        SchoolStudentModel created = service.create(student);
        emailController.sendEmailWhileSignup(student.getEmail() , student.getName());
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<SchoolStudentModel>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<SchoolStudentModel> getByUsername(@PathVariable String username) {
        return service.getByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{username}")
    public ResponseEntity<SchoolStudentModel> update(@PathVariable String username,
                                                      @RequestBody SchoolStudentModel updateData) {
        return service.update(username, updateData)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> delete(@PathVariable String username) {
        service.delete(username);
        return ResponseEntity.noContent().build();
    }
}
