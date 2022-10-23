package tn.ipsas.factureservice.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import tn.ipsas.factureservice.domain.Order;
import tn.ipsas.factureservice.domain.OrderLine;

@RepositoryRestResource
public interface OrderRepository extends PagingAndSortingRepository<Order, Long> {
}