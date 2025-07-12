// QuestionsService.java
package com.kucp1127.StackIt.QuestionsPackage.Service;

import com.kucp1127.StackIt.QuestionsPackage.Model.QuestionsModel;
import com.kucp1127.StackIt.QuestionsPackage.Repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionsService {
    private final QuestionsRepository repo;

    public QuestionsModel createQuestion(QuestionsModel q) {
        if (q.getAnswerIds() == null) {
            q.setAnswerIds(new ArrayList<>());
        }
        q.setUpvotes(0);
        q.setDownvotes(0);
        return repo.save(q);
    }

    public Optional<QuestionsModel> getQuestion(Long id) {
        return repo.findById(id);
    }

    @Transactional
    public Optional<QuestionsModel> updateQuestion(Long id, QuestionsModel inc) {
        return repo.findById(id)
                .map(existing -> {
                    if (inc.getTitle() != null)       existing.setTitle(inc.getTitle());
                    if (inc.getDescription() != null) existing.setDescription(inc.getDescription());
                    return existing;
                });
    }

    @Transactional
    public Optional<QuestionsModel> voteQuestion(Long id, String type) {
        return repo.findById(id)
                .map(q -> {
                    if ("down".equalsIgnoreCase(type)) {
                        q.setDownvotes(q.getDownvotes() + 1);
                    } else {
                        q.setUpvotes(q.getUpvotes() + 1);
                    }
                    return q;
                });
    }
}
