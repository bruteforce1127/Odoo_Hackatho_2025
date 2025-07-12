// src/main/java/com/kucp1127/StackIt/UserQuestionsAndAnswers/Controller/UserController.java
package com.kucp1127.StackIt.UserQuestionsAndAnswers.Controller;

import com.kucp1127.StackIt.UserQuestionsAndAnswers.Model.UserQuestionsAndAnswersModel;
import com.kucp1127.StackIt.UserQuestionsAndAnswers.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService svc;

    @PostMapping("profile/{username}")
    public ResponseEntity<UserQuestionsAndAnswersModel> initUser(@PathVariable String username) {
        UserQuestionsAndAnswersModel created = svc.createUser(username);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{username}")
    public ResponseEntity<UserQuestionsAndAnswersModel> updateUser(
            @PathVariable String username,
            @RequestBody UserQuestionsAndAnswersModel updates) {

        UserQuestionsAndAnswersModel updated = svc.updateUser(username, updates);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{username}")
    public ResponseEntity<UserQuestionsAndAnswersModel> getUser(@PathVariable String username) {
        return ResponseEntity.ok(svc.getUser(username));
    }

    @GetMapping
    public ResponseEntity<List<UserQuestionsAndAnswersModel>> getAllUsers() {
        return ResponseEntity.ok(svc.getAllUsers());
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        svc.deleteUser(username);
        return ResponseEntity.noContent().build();
    }
}
