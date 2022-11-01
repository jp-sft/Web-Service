package tn.ipsas.factureservice.web;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import tn.ipsas.factureservice.domain.Order;
import tn.ipsas.factureservice.feign.ProductServiceFeign;
import tn.ipsas.factureservice.feign.UserServiceFeign;
import tn.ipsas.factureservice.model.product.Product;
import tn.ipsas.factureservice.model.user.Customer;
import tn.ipsas.factureservice.service.OrderLineRepository;
import tn.ipsas.factureservice.service.OrderRepository;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.*;

@RestController()
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    OrderRepository orderRepository;
    OrderLineRepository orderLineRepository;
    UserServiceFeign userServiceFeign;
    ProductServiceFeign productServiceFeign;


//    @GetMapping(value = "orders/search")
//    public Iterable<Order> searchOrder(@RequestParam("query") String query,
//                                       @RequestParam("query_category") String queryCategory){
//        Set<Long> ordersId = new HashSet<>();
//        if(!Objects.isNull(query) && !"".equals(query))
//            ordersId = orderRepository.findIdByQuery(query);
//        if (!Objects.isNull(queryCategory) && !"".equals(queryCategory))
//            ordersId.addAll(orderRepository.findIdByCategoryName(queryCategory));
//
//        return orderRepository.findByIdIn(ordersId);
//    }

//    @GetMapping(value = "orders/{id}/image", produces = MediaType.IMAGE_JPEG_VALUE)
//    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) throws IOException {
//
//        Order order = orderRepository.getById((long) id);
//        String imgPath = order.getImagePath() != null ? order.getImagePath() : "images/default.png";
//        ClassPathResource resource = new ClassPathResource(imgPath);
//        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.IMAGE_JPEG)
//                .body(bytes);
//    }

    @GetMapping("orders/{id}")
    private Order findOrderById(@PathVariable Long id){
        Order order = orderRepository.getById(id);

        Customer customer = userServiceFeign.findCustomerById(order.getCustomerId());
        order.setCustomer(customer);

        order.getOrderLines().forEach(orderLine -> {
            Product product = productServiceFeign.findProductById(orderLine.getProductId());
            orderLine.setProduct(product);
        });

        return order;
    }

    @GetMapping("orders")
    public Iterable<Order> getOrders(){

        List<Order> orders = orderRepository.findAll();
        orders.forEach(order -> {
            Customer customer = userServiceFeign.findCustomerById(order.getCustomerId());
            order.setCustomer(customer);

            order.getOrderLines().forEach(orderLine -> {
                Product product = productServiceFeign.findProductById(orderLine.getProductId());
                orderLine.setProduct(product);
            });
        });
        return orders;
    }

    @PostMapping("orders")
    public Order saveOrder(@RequestBody Order order){
        order = orderRepository.save(order);
        Customer customer = userServiceFeign.findCustomerById(order.getCustomerId());
        order.setCustomer(customer);

        order.getOrderLines().forEach(orderLine -> {
            Product product = productServiceFeign.findProductById(orderLine.getProductId());
            orderLine.setProduct(product);
        });
        return order;
    }

    @PutMapping("orders/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order){
        //TODO: Check id
        if (order == null || id == null || !Objects.equals(id, order.getId()))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(orderRepository.save(order));
    }

    @DeleteMapping("orders/{id}")
    public void deleteOrder(@PathVariable Long id){
        //TODO: Check id
        orderRepository.deleteById(id);
    }

}
