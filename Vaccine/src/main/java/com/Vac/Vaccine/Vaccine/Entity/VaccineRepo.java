package com.Vac.Vaccine.Vaccine.Entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VaccineRepo extends JpaRepository<Vaccine,Integer> {
    Optional<Vaccine> findByName(String name);


}
