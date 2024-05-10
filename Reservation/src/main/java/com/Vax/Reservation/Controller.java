package com.Vax.Reservation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Replace with the actual origin of your client application
@RequestMapping("/Reservation")
public class Controller {

    @Autowired
    private ReservationRepo reservationRepo;

    @GetMapping("/")
    public List<Reservtion> listAll() {
        return reservationRepo.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<?> add(@RequestBody Reservtion reservation) {
        Optional<Reservtion> existingReservationOpt = reservationRepo.findByPidAndVame(reservation.getPid(),
                reservation.getVame());
        if (existingReservationOpt.isPresent()) {
            Reservtion existingReservation = existingReservationOpt.get();
            int currentDoses = existingReservation.getDoses();
            if (currentDoses + 1 > 3) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Patient can't take the vaccine " + reservation.getVame() + " more than 3 times.");
            }
            existingReservation.setDoses(currentDoses + 1);
            reservationRepo.save(existingReservation);
            return ResponseEntity.ok("Dose updated successfully.");
        } else {
            reservation.setDoses(1);
            reservationRepo.save(reservation);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("First dose taken successfully.");
        }
    }
}
