package com.kucp1127.StackIt.QuestionsPackage.Controller;

import com.kucp1127.StackIt.Email.DTO.AnswerDto;
import com.kucp1127.StackIt.Email.Service.EmailService;
import com.kucp1127.StackIt.QuestionsPackage.Model.QuestionsModel;
import com.kucp1127.StackIt.QuestionsPackage.Model.AnswerModel;
import com.kucp1127.StackIt.QuestionsPackage.Service.QuestionsService;
import com.kucp1127.StackIt.QuestionsPackage.Service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class QAController {

    @Autowired
    private  QuestionsService qService;
    @Autowired
    private  AnswerService aService;

    @Autowired
    private EmailService emailService;

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

    @GetMapping("/questions")
    public ResponseEntity<List<QuestionsModel>> getAllQuestions() {
        return ResponseEntity.ok(qService.getAllQuestions());
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


    @PostMapping("/gotReply")
    public void sendEmailAfterAnswer(@RequestBody AnswerDto answerDto) {
        emailService.sendSimpleEmail(
                answerDto.getToEmail(),
                "Someone replied to your question on ScapIT!",
                "Hi " + answerDto.getName1() + ",\n" +
                        "\n" +
                        answerDto.getName2() + " has replied to your question on ScapIT! 🎉\n" +
                        "\n" +
                        "You can now:\n" +
                        "✅ View the new answer under your question.\n" +
                        "✅ Continue the discussion and ask follow-up questions.\n" +
                        "✅ Earn reputation and engage with your peers.\n" +
                        "\n" +
                        "We’re excited to see your learning journey continue!\n" +
                        "\n" +
                        "If you have any questions or need assistance, feel free to reply to this email.\n" +
                        "\n" +
                        "Happy learning and sharing!\n" +
                        "\n" +
                        "Best regards,\n" +
                        "The ScapIT Team\n"
        );
    }
}
