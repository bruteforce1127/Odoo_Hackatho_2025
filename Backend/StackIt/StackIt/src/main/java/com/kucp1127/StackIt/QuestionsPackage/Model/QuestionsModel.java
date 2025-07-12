package com.kucp1127.StackIt.QuestionsPackage.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "questions")
public class QuestionsModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String title;
    @Column(length = 2000)
    private String description;
    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    private int upvotes;
    private int downvotes;
    @ElementCollection
    @CollectionTable(name = "question_answer_ids", joinColumns = @JoinColumn(name = "question_id"))
    @Column(name = "answer_id")
    private List<Long> answerIds;
}
