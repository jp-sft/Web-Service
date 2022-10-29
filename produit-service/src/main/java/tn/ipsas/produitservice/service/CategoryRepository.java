package tn.ipsas.produitservice.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import tn.ipsas.produitservice.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
