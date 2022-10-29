package tn.ipsas.clientservice.web;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import tn.ipsas.clientservice.domain.Customer;
import tn.ipsas.clientservice.service.CustomerRepository;

import java.io.IOException;
import java.util.Objects;

@Controller
@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class CustomerController {

    private CustomerRepository customerRepository;
    private final String[] PROFILES = {"default-profile2.jpg","default-profile1.png","default-profile3.jpg","default-profile4.jpg","default-profile5.png"};

    @GetMapping("/customers")
    public Iterable<Customer> findAll(){
        return customerRepository.findAll();
    }

    @GetMapping(value = "customers/{id}/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) throws IOException {

        Customer customer = customerRepository.getById((long) id);
        String imgPath = customer.getProfileUrl() != null ? customer.getProfileUrl() : "images/default/" + PROFILES[getRandomNumber(0,4)];
        ClassPathResource resource = new ClassPathResource(imgPath);
        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }

    private int getRandomNumber(int min, int max) {
        return (int) ((Math.random() * (max - min)) + min);
    }

    @PostMapping("customers")
    public Customer saveCustomer(@RequestBody Customer customer){
        return customerRepository.save(customer);
    }

    @PutMapping("customers/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customer){
        //TODO: Check id
        if (customer == null || id == null || !Objects.equals(id, customer.getId()))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(customerRepository.save(customer));
    }

    @DeleteMapping("customers/{id}")
    public void deleteCustomer(@PathVariable Long id){
        //TODO: Check id
        customerRepository.deleteById(id);
    }
}
