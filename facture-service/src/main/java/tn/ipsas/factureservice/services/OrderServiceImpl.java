package tn.ipsas.factureservice.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.ipsas.factureservice.domain.Order;
import tn.ipsas.factureservice.domain.OrderLine;
import tn.ipsas.factureservice.feign.ProductServiceFeign;
import tn.ipsas.factureservice.feign.UserServiceFeign;
import tn.ipsas.factureservice.model.product.Product;
import tn.ipsas.factureservice.model.user.Customer;
import tn.ipsas.factureservice.repository.OrderRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private OrderRepository orderRepository;
    private UserServiceFeign userServiceFeign;
    private ProductServiceFeign productServiceFeign;

    @Override
    public Order getCompleteOrder(Order order) {
        Customer customer = userServiceFeign.findCustomerById(order.getCustomerId());
        order.setCustomer(customer);

        order.getOrderLines().forEach(orderLine -> {
            Product product = productServiceFeign.findProductById(orderLine.getProductId());
            orderLine.setProduct(product);
        });
        return order;
    }

    @Override
    public Iterable<Order> getAll() {
        return orderRepository.findAll()
                .stream()
                .map(this::getCompleteOrder)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Order> getById(Long id) {
        return orderRepository.findById(id)
                .map(this::getCompleteOrder);
    }

    @Override
    public Optional<Order> save(Order order) {
        order = orderRepository.save(order);
        order = getCompleteOrder(order);
        order.setAmount(computeAmount(order));
        orderRepository.save(order);
        return Optional.of(order);
    }

    @Override
    public boolean delete(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Double computeAmount(Order order) {
        order.getOrderLines()
                .forEach(orderLine -> orderLine.setSubTotal(computeAmountOrderLine(orderLine)));
        return order.getOrderLines()
                .stream()
                .map(OrderLine::getSubTotal)
                .reduce(Double::sum)
                .orElse(0.);
    }

    @Override
    public Double computeAmountOrderLine(OrderLine orderLine) {
        return orderLine.getQuantity() * orderLine.getProduct().getUnitPrice();
    }
}
