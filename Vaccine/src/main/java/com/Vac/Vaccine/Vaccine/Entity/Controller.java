package com.Vac.Vaccine.Vaccine.Entity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Replace with the actual origin of your client application
@RequestMapping("/vaccine")
public class Controller {

    @Autowired
    private VaccineRepo vaccineRepo;

    @GetMapping("")
    public List<Vaccine> listVaccine() {
        return vaccineRepo.findAll();
    }

    @GetMapping("/hello")
    public String sayHello() {
        return "Hllo!";
    }

    @GetMapping("/{id}")
    public Vaccine getVaccineById(@PathVariable int id) throws ChangeSetPersister.NotFoundException {
        Vaccine existvaccine = vaccineRepo.findById(id)
                .orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        return existvaccine;
    }

    @PostMapping("/add")
    public String addVaccine(@RequestBody Vaccine vaccine) {
        Optional<Vaccine> ExistVaccine = vaccineRepo.findById(vaccine.getId());
        if (ExistVaccine.isPresent()) {
            return "Vaccine With Name" + vaccine.getName() + "Already Exist.";
        } else {
            vaccineRepo.save(vaccine);
            return "saved Successfully!";
        }
    }

    @DeleteMapping("/{id}")
    public String deleteVaccine(@PathVariable int id) throws Exception {
        try {
            vaccineRepo.deleteById(id);
            return ("deleted successfully");
        } catch (EmptyResultDataAccessException e) {
            throw new Exception("Vaccine with ID " + id + " not found");
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete vaccine with ID " + id, e);
        }
    }

}
