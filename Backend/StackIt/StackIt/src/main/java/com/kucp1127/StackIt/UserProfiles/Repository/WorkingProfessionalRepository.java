package com.kucp1127.StackIt.UserProfiles.Repository;

import com.kucp1127.StackIt.UserProfiles.Model.WorkingProfessionalModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkingProfessionalRepository extends JpaRepository<WorkingProfessionalModel, String> {
}
