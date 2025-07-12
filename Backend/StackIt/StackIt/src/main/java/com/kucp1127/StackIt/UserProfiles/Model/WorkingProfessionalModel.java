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
public class WorkingProfessionalModel {
    private String name;
    @Id
    private String username; // unique ID
    private String email;
    private String companyName;
    private int yearsOfExperience;
    private int age;
    private String password;
    private String bio;
}
