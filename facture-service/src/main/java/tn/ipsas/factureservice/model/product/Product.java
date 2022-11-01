package tn.ipsas.factureservice.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import tn.ipsas.factureservice.domain.OrderLine;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//@Entity
//@Table(name = "products")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Product {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private Double weight;

//    @Column(columnDefinition = "Text")
    private String description;

//    @Column(name="unit_price")
    private Double unitPrice;

//    @ManyToOne
//    @JoinColumn(name = "category_id")
    private Category category;

    // For stat
    @JsonIgnore
//    @Transient
    private List<OrderLine> orderLines = new ArrayList<>();
}
