package tn.ipsas.factureservice.web;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.ipsas.factureservice.domain.Order;
import tn.ipsas.factureservice.feign.ProductServiceFeign;
import tn.ipsas.factureservice.feign.UserServiceFeign;
import tn.ipsas.factureservice.model.product.Product;
import tn.ipsas.factureservice.model.user.Customer;
import tn.ipsas.factureservice.repository.OrderLineRepository;
import tn.ipsas.factureservice.services.OrderService;

import java.util.*;

@RestController()
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {
    OrderService orderService;

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
    private ResponseEntity<Order> findOrderById(@PathVariable Long id) {
        return orderService.getById(id)
                .map(order -> ResponseEntity.ok().body(order))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("orders")
    public ResponseEntity<Iterable<Order>> getOrders() {
        Iterable<Order> orders = orderService.getAll();
        orders.forEach(order -> {
            order = orderService.getCompleteOrder(order);
        });
        return ResponseEntity.ok().body(orders);
    }

    @PostMapping("orders")
    public ResponseEntity<Order> saveOrder(@RequestBody Order order) {
        return orderService.save(order)
                .map(value -> new ResponseEntity<>(value, HttpStatus.CREATED))
                .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @PutMapping("orders/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        if (!Objects.equals(order.getId(), id))
            return ResponseEntity.badRequest().build();
        return orderService.getById(id)
                .map(o -> {
                    Order order1 = orderService.getById(id).orElse(null);
                    return ResponseEntity.ok().body(order1);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("orders/{id}")
    public ResponseEntity deleteOrder(@PathVariable Long id) {
        if (orderService.delete(id))
            return ResponseEntity.ok().build();
        else
            return ResponseEntity.notFound().build();
    }

}
