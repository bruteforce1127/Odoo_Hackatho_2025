package com.kucp1127.StackIt.UserQuestionsAndAnswers.Service;

import com.kucp1127.StackIt.UserQuestionsAndAnswers.Model.UserQuestionsAndAnswersModel;
import com.kucp1127.StackIt.UserQuestionsAndAnswers.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository repo;

    @Autowired
    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public UserQuestionsAndAnswersModel createUser(String username) {
        UserQuestionsAndAnswersModel user = UserQuestionsAndAnswersModel.builder()
            .username(username)
            .noOfQuestions(0)
            .noOfAnswers(0)
            .level("Beginner")
            .questionsAsked(List.of())
            .notifications(List.of())
            .reputation(0L)
            .badges(Set.of())
            .build();
        return repo.save(user);
    }

    public UserQuestionsAndAnswersModel updateUser(String username, UserQuestionsAndAnswersModel updates) {
        UserQuestionsAndAnswersModel existing = repo.findById(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));

        if (updates.getNoOfQuestions() != 0)          existing.setNoOfQuestions(updates.getNoOfQuestions());
        if (updates.getNoOfAnswers()   != 0)          existing.setNoOfAnswers(updates.getNoOfAnswers());
        if (updates.getLevel()         != null)       existing.setLevel(updates.getLevel());
        if (updates.getQuestionsAsked()!= null)       existing.setQuestionsAsked(updates.getQuestionsAsked());
        if (updates.getNotifications() != null)       existing.setNotifications(updates.getNotifications());
        if (updates.getReputation()    != 0L)         existing.setReputation(updates.getReputation());
        if (updates.getBadges()        != null)       existing.setBadges(updates.getBadges());

        return repo.save(existing);
    }


    public UserQuestionsAndAnswersModel getUser(String username) {
        return repo.findById(username)
            .orElseThrow(() -> new IllegalArgumentException("User not found: " + username));
    }

    public List<UserQuestionsAndAnswersModel> getAllUsers() {
        return repo.findAll();
    }

    public void deleteUser(String username) {
        if (!repo.existsById(username)) {
            throw new IllegalArgumentException("User not found: " + username);
        }
        repo.deleteById(username);
    }
}
