package tn.ipsas.produitservice.domain;

import lombok.*;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;

@Entity
@Table(name = "products")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private Double weight;

    private String description;

    private Double unitPrice;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
