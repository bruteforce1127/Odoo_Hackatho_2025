package com.kucp1127.StackIt.UserProfiles.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CollegeStudentModel {
    private String name;
    @Id
    private String username;
    private String email;
    private String collegeName;
    private int startYear;
    private int endYear;
    private int age;
    private String password;
    private String course;
    private String bio;
}
