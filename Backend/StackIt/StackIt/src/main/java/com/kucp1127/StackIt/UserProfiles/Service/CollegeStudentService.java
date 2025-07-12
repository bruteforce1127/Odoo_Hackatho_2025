package com.kucp1127.StackIt.UserProfiles.Service;

import com.kucp1127.StackIt.UserProfiles.Model.CollegeStudentModel;
import com.kucp1127.StackIt.UserProfiles.Repository.CollegeStudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CollegeStudentService {
    @Autowired
    private CollegeStudentRepository repository;

    public CollegeStudentModel create(CollegeStudentModel student) {
        return repository.save(student);
    }

    public List<CollegeStudentModel> getAll() {
        return repository.findAll();
    }

    public Optional<CollegeStudentModel> getByUsername(String username) {
        return repository.findById(username);
    }

    public Optional<CollegeStudentModel> update(String username, CollegeStudentModel updateData) {
        return repository.findById(username).map(existing -> {
            existing.setName(updateData.getName());
            existing.setEmail(updateData.getEmail());
            existing.setCollegeName(updateData.getCollegeName());
            existing.setStartYear(updateData.getStartYear());
            existing.setEndYear(updateData.getEndYear());
            existing.setCourse(updateData.getCourse());
            existing.setBio(updateData.getBio());
            return repository.save(existing);
        });
    }

    public void delete(String username) {
        repository.deleteById(username);
    }

    // Find by college name
    public List<CollegeStudentModel> findByCollegeName(String collegeName) {
        return repository.findByCollegeName(collegeName);
    }
}