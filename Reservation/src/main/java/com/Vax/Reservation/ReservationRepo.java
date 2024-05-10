package com.Vax.Reservation;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepo extends JpaRepository<Reservtion, Integer> {

    Optional<Reservtion> findByPidAndVame(int id, String name);

}
