package tn.ipsas.factureservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.ipsas.factureservice.domain.OrderLine;

@Repository
public interface OrderLineRepository extends JpaRepository<OrderLine, Long> {
}