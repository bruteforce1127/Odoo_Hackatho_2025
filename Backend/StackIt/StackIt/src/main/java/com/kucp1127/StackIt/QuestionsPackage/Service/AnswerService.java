
package com.kucp1127.StackIt.QuestionsPackage.Service;

import com.kucp1127.StackIt.QuestionsPackage.Model.AnswerModel;
import com.kucp1127.StackIt.QuestionsPackage.Model.QuestionsModel;
import com.kucp1127.StackIt.QuestionsPackage.Repository.AnswerRepository;
import com.kucp1127.StackIt.QuestionsPackage.Repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepo;
    private final QuestionsRepository questionsRepo;

    @Transactional
    public AnswerModel createAnswer(AnswerModel a) {
        a.setUpvotes(0);
        a.setDownvotes(0);
        // save answer
        AnswerModel saved = answerRepo.save(a);
        // update parent question’s answerIds list
        questionsRepo.findById(a.getQuestionId())
                .ifPresent(q -> {
                    q.getAnswerIds().add(saved.getId());
                    questionsRepo.save(q);
                });
        return saved;
    }

    public Optional<AnswerModel> getAnswer(Long id) {
        return answerRepo.findById(id);
    }

    @Transactional
    public Optional<AnswerModel> updateAnswer(Long id, AnswerModel inc) {
        return answerRepo.findById(id)
                .map(existing -> {
                    if (inc.getAns() != null) existing.setAns(inc.getAns());
                    return existing;
                });
    }

    @Transactional
    public Optional<AnswerModel> voteAnswer(Long id, String type) {
        return answerRepo.findById(id)
                .map(a -> {
                    if ("down".equalsIgnoreCase(type)) {
                        a.setDownvotes(a.getDownvotes() + 1);
                    } else {
                        a.setUpvotes(a.getUpvotes() + 1);
                    }
                    return a;
                });
    }
}
