package tn.ipsas.produitservice.domain;

import lombok.*;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private Double weight;

    @Column(columnDefinition = "Text")
    private String description;

    @Column(name="unit_price")
    private Double unitPrice;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // For stat
    @Transient
    private List<OrderLine> orderLines = new ArrayList<>();
}
