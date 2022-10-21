package tn.ipsas.produitservice.domain;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Category parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private List<Category> children = new ArrayList<>();

    @OneToMany(mappedBy = "category" , fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Product> products = new ArrayList<>();

    // For stat
    @Transient
    private List<OrderLine> orderLines = new ArrayList<>();

}
