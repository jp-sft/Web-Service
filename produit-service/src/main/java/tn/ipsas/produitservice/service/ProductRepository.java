package tn.ipsas.produitservice.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import tn.ipsas.produitservice.domain.Product;

@RepositoryRestResource
public interface ProductRepository  extends PagingAndSortingRepository<Product, Long> {
}
