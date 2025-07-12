package com.kucp1127.StackIt.QuestionsPackage.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "answers")
public class AnswerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(length = 2000)
    private String ans;
    @CreationTimestamp
    private LocalDateTime createdAt;
    private int upvotes;
    private int downvotes;
    private Long questionId;
}