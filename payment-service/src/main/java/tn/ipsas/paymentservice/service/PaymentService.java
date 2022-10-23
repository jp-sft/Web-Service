package tn.ipsas.paymentservice.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import tn.ipsas.paymentservice.domain.Payment;

@RepositoryRestResource
public interface PaymentService extends PagingAndSortingRepository<Payment, Long> {
}