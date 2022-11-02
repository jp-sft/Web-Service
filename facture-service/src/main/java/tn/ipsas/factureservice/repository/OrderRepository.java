package tn.ipsas.factureservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.ipsas.factureservice.domain.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}