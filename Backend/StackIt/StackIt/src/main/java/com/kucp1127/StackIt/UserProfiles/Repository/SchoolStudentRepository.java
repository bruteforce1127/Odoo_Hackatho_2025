package com.kucp1127.StackIt.UserProfiles.Repository;

import com.kucp1127.StackIt.UserProfiles.Model.SchoolStudentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolStudentRepository extends JpaRepository<SchoolStudentModel, String> {
}