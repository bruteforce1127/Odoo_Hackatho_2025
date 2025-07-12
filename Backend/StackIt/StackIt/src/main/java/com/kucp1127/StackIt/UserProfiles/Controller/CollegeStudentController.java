package com.kucp1127.StackIt.UserProfiles.Controller;

import com.kucp1127.StackIt.UserProfiles.Model.CollegeStudentModel;
import com.kucp1127.StackIt.UserProfiles.Service.CollegeStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/college")
@CrossOrigin("*")
public class CollegeStudentController {
    @Autowired
    private CollegeStudentService service;

    @PostMapping("/register")
    public ResponseEntity<CollegeStudentModel> create(@RequestBody CollegeStudentModel student) {
        return ResponseEntity.ok(service.create(student));
    }

    @GetMapping
    public ResponseEntity<List<CollegeStudentModel>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{username}")
    public ResponseEntity<CollegeStudentModel> getByUsername(@PathVariable String username) {
        return service.getByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/college/{collegeName}")
    public ResponseEntity<List<CollegeStudentModel>> getByCollege(@PathVariable String collegeName) {
        return ResponseEntity.ok(service.findByCollegeName(collegeName));
    }

    @PutMapping("/{username}")
    public ResponseEntity<CollegeStudentModel> update(@PathVariable String username,
                                                       @RequestBody CollegeStudentModel updateData) {
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
