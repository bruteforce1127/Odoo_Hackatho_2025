// src/main/java/com/kucp1127/StackIt/UserQuestionsAndAnswers/Repository/UserRepository.java
package com.kucp1127.StackIt.UserQuestionsAndAnswers.Repository;

import com.kucp1127.StackIt.UserQuestionsAndAnswers.Model.UserQuestionsAndAnswersModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserQuestionsAndAnswersModel, String> {

}
