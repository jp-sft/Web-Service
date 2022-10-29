package tn.ipsas.clientservice.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RestController;
import tn.ipsas.clientservice.domain.Customer;
import tn.ipsas.clientservice.domain.User;

@RestController
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
