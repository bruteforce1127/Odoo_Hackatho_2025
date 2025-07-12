package com.kucp1127.StackIt.UserQuestionsAndAnswers.Model;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserQuestionsAndAnswersModel {
    @Id
    private String username;
    private int noOfQuestions;
    private int noOfAnswers;
    private String level;
    @ElementCollection
    private List<Long> questionsIds;
    @ElementCollection
    private List<String> notifications;
    private long reputation;
    @ElementCollection
    private Set<String> badges;
}
