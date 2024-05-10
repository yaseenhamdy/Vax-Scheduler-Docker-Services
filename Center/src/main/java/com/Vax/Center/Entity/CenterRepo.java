package com.Vax.Center.Entity;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepo extends JpaRepository<Center, Integer> {
    Optional<Center> findByEmail(String email);

    boolean existsByEmail(String email);

}
