package com.kucp1127.StackIt.UserProfiles.Repository;

import com.kucp1127.StackIt.UserProfiles.Model.CollegeStudentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollegeStudentRepository extends JpaRepository<CollegeStudentModel, String> {
    List<CollegeStudentModel> findByCollegeName(String collegeName);
}
