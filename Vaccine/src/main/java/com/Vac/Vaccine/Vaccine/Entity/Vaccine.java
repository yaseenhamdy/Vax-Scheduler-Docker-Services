package com.Vac.Vaccine.Vaccine.Entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Vaccine")
public class Vaccine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "Vaccine_Name", unique = true)
    private String name;

    @Column(name = "duration_Between_Doses", nullable = false)
    private String durationBetweenDoses;

    @Column(name = "precautions", nullable = false)
    private String precautions;
}
