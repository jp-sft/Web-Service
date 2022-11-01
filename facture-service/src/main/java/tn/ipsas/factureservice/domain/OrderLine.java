package tn.ipsas.factureservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import tn.ipsas.factureservice.model.product.Product;

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

    @ManyToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    @JsonIgnore
    private Order order;

    @Transient
    private Product product;
    private Long productId;
}
