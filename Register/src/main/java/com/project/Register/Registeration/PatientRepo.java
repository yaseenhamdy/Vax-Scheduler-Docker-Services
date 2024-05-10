package com.project.Register.Registeration;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepo extends JpaRepository<Patient, Integer> {
    Optional<Patient> findByEmailAndPassword(String email, String password);

}
