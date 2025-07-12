package com.kucp1127.StackIt.UserProfiles.Controller;

import com.kucp1127.StackIt.Email.Controller.EmailController;
import com.kucp1127.StackIt.UserProfiles.Model.WorkingProfessionalModel;
import com.kucp1127.StackIt.UserProfiles.Service.WorkingProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class WorkingProfessionalController {
    @Autowired
    private WorkingProfessionalService service;

    @Autowired
    private EmailController emailController;

    @PostMapping("/register")
    public ResponseEntity<WorkingProfessionalModel> create(@RequestBody WorkingProfessionalModel prof) {
        emailController.sendEmailWhileSignup(prof.getEmail() , prof.getName());
        return ResponseEntity.ok(service.create(prof));
    }

    @GetMapping
    public ResponseEntity<List<WorkingProfessionalModel>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<WorkingProfessionalModel> getByUsername(@PathVariable String username) {
        return service.getByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{username}")
    public ResponseEntity<WorkingProfessionalModel> update(@PathVariable String username,
                                                           @RequestBody WorkingProfessionalModel updateData) {
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
