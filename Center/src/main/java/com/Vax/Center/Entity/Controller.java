package com.Vax.Center.Entity;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Replace with the actual origin of your client application
@RequestMapping("Center")
public class Controller {

    @Autowired
    private CenterRepo centerRepo;

    @GetMapping("/")
    public List<Center> listCenter() {
        return centerRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Center> getCenterById(@PathVariable int id) {
        Optional<Center> centerOptional = centerRepo.findById(id);
        return centerOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public Center addCenter(@RequestBody Center center) {

        if (centerRepo.findByEmail(center.getName()).isPresent()) {
            throw new RuntimeException("Already Exist");
        }
        return centerRepo.save(center);
    }

    @DeleteMapping("/{id}")
    public String deleteCenter(@PathVariable int id) throws Exception {
        try {
            centerRepo.deleteById(id);
            return ("deleted successfully");
        } catch (EmptyResultDataAccessException e) {
            throw new Exception("Center with ID " + id + " not found");
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete center with ID " + id, e);
        }
    }

}
