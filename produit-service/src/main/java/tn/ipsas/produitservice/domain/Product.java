package tn.ipsas.produitservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.hibernate.annotations.GeneratorType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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

    //TODO : Add Image
    @Column(name="image_path")
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // For stat
    @JsonIgnore
    @Transient
    private List<OrderLine> orderLines = new ArrayList<>();
}
