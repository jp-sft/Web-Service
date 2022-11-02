package tn.ipsas.factureservice.services;

import tn.ipsas.factureservice.domain.Order;
import tn.ipsas.factureservice.domain.OrderLine;

import java.util.Optional;

public interface OrderService {
    Optional<Order> save(Order order);
    Order getCompleteOrder(Order order);
    Iterable<Order> getAll();

    Optional<Order> getById(Long id);

    boolean delete(Long id);

    Double computeAmount(Order order);

    Double computeAmountOrderLine(OrderLine orderLine);
}
