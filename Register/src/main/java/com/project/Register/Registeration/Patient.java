package com.project.Register.Registeration;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patient")
public class Patient {

    @Id
    @Column(name = "SSN")
    private int ssn;

    @Column(name = "Patient_name", nullable = false)
    private String name;

    @Column(name = "Patient_email", unique = true)
    private String email;

    @Column(name = "Patient_password", nullable = false)
    private String password;

    @Column(name = "Center")
    private String gender;

}
