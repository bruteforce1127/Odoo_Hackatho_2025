package com.kucp1127.StackIt.QuestionsPackage.Controller;

import com.kucp1127.StackIt.QuestionsPackage.Model.QuestionsModel;
import com.kucp1127.StackIt.QuestionsPackage.Model.AnswerModel;
import com.kucp1127.StackIt.QuestionsPackage.Service.QuestionsService;
import com.kucp1127.StackIt.QuestionsPackage.Service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class QAController {

    @Autowired
    private  QuestionsService qService;
    @Autowired
    private  AnswerService aService;


    @PostMapping("/questions")
    public ResponseEntity<QuestionsModel> createQuestion(@RequestBody QuestionsModel q) {
        return ResponseEntity.ok(qService.createQuestion(q));
    }

    @GetMapping("/questions/{id}")
    public ResponseEntity<QuestionsModel> getQuestion(@PathVariable Long id) {
        return qService.getQuestion(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<QuestionsModel> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuestionsModel incoming
    ) {
        return qService.updateQuestion(id, incoming)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/questions/{id}/votes")
    public ResponseEntity<QuestionsModel> voteQuestion(
            @PathVariable Long id,
            @RequestParam(defaultValue = "up") String type
    ) {
        return qService.voteQuestion(id, type)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PostMapping("/answers")
    public ResponseEntity<AnswerModel> createAnswer(@RequestBody AnswerModel a) {
        return ResponseEntity.ok(aService.createAnswer(a));
    }

    @GetMapping("/answers/{id}")
    public ResponseEntity<AnswerModel> getAnswer(@PathVariable Long id) {
        return aService.getAnswer(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/answers/{id}")
    public ResponseEntity<AnswerModel> updateAnswer(
            @PathVariable Long id,
            @RequestBody AnswerModel incoming
    ) {
        return aService.updateAnswer(id, incoming)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/answers/{id}/votes")
    public ResponseEntity<AnswerModel> voteAnswer(
            @PathVariable Long id,
            @RequestParam(defaultValue = "up") String type
    ) {
        return aService.voteAnswer(id, type)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
