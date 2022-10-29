package tn.ipsas.factureservice.service;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import tn.ipsas.factureservice.domain.OrderLine;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {
}