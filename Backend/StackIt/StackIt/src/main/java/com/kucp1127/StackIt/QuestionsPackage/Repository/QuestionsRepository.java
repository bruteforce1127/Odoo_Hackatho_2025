package com.kucp1127.StackIt.QuestionsPackage.Repository;

import com.kucp1127.StackIt.QuestionsPackage.Model.QuestionsModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionsRepository extends JpaRepository<QuestionsModel, Long> {
}
