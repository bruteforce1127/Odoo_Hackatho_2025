// QuestionsService.java
package com.kucp1127.StackIt.QuestionsPackage.Service;

import com.kucp1127.StackIt.QuestionsPackage.Model.QuestionsModel;
import com.kucp1127.StackIt.QuestionsPackage.Repository.QuestionsRepository;
import com.kucp1127.StackIt.UserQuestionsAndAnswers.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionsService {
    private final QuestionsRepository repo;

    @Autowired
    private UserRepository userRepository;

    public List<QuestionsModel> getAllQuestions() {
        return repo.findAll();
    }



    public QuestionsModel createQuestion(QuestionsModel q) {
        if (q.getAnswerIds() == null) {
            q.setAnswerIds(new ArrayList<>());
        }
        q.setUpvotes(0);
        q.setDownvotes(0);
        QuestionsModel savedQuestion = repo.save(q);
        userRepository.findById(q.getUsername()).ifPresent(user -> {
            if (user.getQuestionsIds() == null) {
                user.setQuestionsIds(new ArrayList<>());
            }
            user.getQuestionsIds().add(savedQuestion.getId());
            user.setNoOfQuestions(user.getNoOfQuestions()+1);
            userRepository.save(user);
        });

        return savedQuestion;
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
