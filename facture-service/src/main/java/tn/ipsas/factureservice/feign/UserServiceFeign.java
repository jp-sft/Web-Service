package tn.ipsas.factureservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.ipsas.factureservice.model.user.Customer;

@FeignClient(name = "CLIENT-SERVICE")
public interface UserServiceFeign {
    @GetMapping(path = "/customers/{id}")
    Customer findCustomerById(@PathVariable(name = "id") Long id);
}
