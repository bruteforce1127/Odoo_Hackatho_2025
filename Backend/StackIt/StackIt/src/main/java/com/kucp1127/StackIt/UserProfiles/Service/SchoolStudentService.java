package com.kucp1127.StackIt.UserProfiles.Service;

import com.kucp1127.StackIt.UserProfiles.Model.SchoolStudentModel;
import com.kucp1127.StackIt.UserProfiles.Repository.SchoolStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SchoolStudentService {
    @Autowired
    private SchoolStudentRepository repository;

    public SchoolStudentModel create(SchoolStudentModel student) {
        return repository.save(student);
    }

    public List<SchoolStudentModel> getAll() {
        return repository.findAll();
    }

    public Optional<SchoolStudentModel> getByUsername(String username) {
        return repository.findById(username);
    }

    public Optional<SchoolStudentModel> update(String username, SchoolStudentModel updateData) {
        return repository.findById(username).map(existing -> {
            existing.setName(updateData.getName());
            existing.setEmail(updateData.getEmail());
            existing.setSchoolName(updateData.getSchoolName());
            existing.setStudentClass(updateData.getStudentClass());
            existing.setBio(updateData.getBio());
            return repository.save(existing);
        });
    }

    public void delete(String username) {
        repository.deleteById(username);
    }
}