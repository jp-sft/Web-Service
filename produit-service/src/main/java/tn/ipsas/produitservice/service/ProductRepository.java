package tn.ipsas.produitservice.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import tn.ipsas.produitservice.domain.Product;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Stream;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {

    @Query("select p.id from Product p " +
            "where upper(p.name) like upper(concat('%', ?1, '%')) " +
            "or p.description like concat('%', ?1, '%')")
    Set<Long> findIdByQuery(@Nullable String query);

    @Query("select p.id from Product p " +
            "where upper(p.category.name) like upper(concat('%', ?1, '%'))")
    Set<Long> findIdByCategoryName(String name);

    List<Product> findByIdIn(Collection<Long> ids);

}