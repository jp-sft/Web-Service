package tn.ipsas.paymentservice.domain.order;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import tn.ipsas.paymentservice.domain.order.product.Product;

import javax.persistence.*;

@Entity
@Table(name = "order_lines")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class OrderLine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Integer quantity;

    private String taxStatus;

    private Double weight;

    private Double subTotal;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
