package com.kucp1127.StackIt.UserProfiles.Service;

import com.kucp1127.StackIt.UserProfiles.Model.WorkingProfessionalModel;
import com.kucp1127.StackIt.UserProfiles.Repository.WorkingProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WorkingProfessionalService {
    @Autowired
    private WorkingProfessionalRepository repository;

    public WorkingProfessionalModel create(WorkingProfessionalModel prof) {
        return repository.save(prof);
    }

    public List<WorkingProfessionalModel> getAll() {
        return repository.findAll();
    }

    public Optional<WorkingProfessionalModel> getByUsername(String username) {
        return repository.findById(username);
    }

    public Optional<WorkingProfessionalModel> update(String username, WorkingProfessionalModel updateData) {
        return repository.findById(username).map(existing -> {
            existing.setName(updateData.getName());
            existing.setEmail(updateData.getEmail());
            existing.setCompanyName(updateData.getCompanyName());
            existing.setYearsOfExperience(updateData.getYearsOfExperience());
            existing.setBio(updateData.getBio());
            return repository.save(existing);
        });
    }

    public void delete(String username) {
        repository.deleteById(username);
    }
}
