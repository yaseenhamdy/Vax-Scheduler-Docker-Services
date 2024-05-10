package com.Vax.Center.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Vaccine Center")
public class Center {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Center_Name", unique = true)
    private String name;

    @Column(name = "phoneNum", nullable = false)
    private String number;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "center_Email", unique = true)
    private String email;

}
