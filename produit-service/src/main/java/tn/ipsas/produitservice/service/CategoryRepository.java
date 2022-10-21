package tn.ipsas.produitservice.service;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import tn.ipsas.produitservice.domain.Category;

@RepositoryRestResource
public interface CategoryRepository extends PagingAndSortingRepository<Category, Long> {
}
