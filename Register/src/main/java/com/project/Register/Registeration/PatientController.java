package com.project.Register.Registeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Replace with the actual origin of your client application
@RequestMapping("/patients")
@Validated
public class PatientController {

    @Autowired
    private PatientRepo patientrepo;

    @PostMapping("/register")
    public ResponseEntity<?> addPatient(@RequestBody Patient patient) {
        if (patientrepo.existsById(patient.getSsn())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Patient with SSN " + patient.getSsn() + " already exists");
        }
        Patient newPatient = patientrepo.save(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(newPatient);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        Optional<Patient> patient = patientrepo.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword());
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    @DeleteMapping("/{ssn}")
    public ResponseEntity<?> deletePatient(@PathVariable int ssn) {
        if (patientrepo.existsById(ssn)) {
            patientrepo.deleteById(ssn);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>("Patient not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("")
    public List<Patient> listPatients() {
        return patientrepo.findAll();
    }
}