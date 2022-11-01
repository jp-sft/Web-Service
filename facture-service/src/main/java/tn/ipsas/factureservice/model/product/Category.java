package tn.ipsas.factureservice.model.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import tn.ipsas.factureservice.domain.OrderLine;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

//@Entity
//@Table(name = "categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Category {
    //    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "id", nullable = false)
    private Long id;

    private String name;

    private String description;

    @JsonIgnore
//    @ManyToOne
//    @JoinColumn(name = "parent_id")
    private Category parent;

    @JsonIgnore
//    @OneToMany(mappedBy = "parent", fetch = FetchType.EAGER)
    private List<Category> children = new ArrayList<>();

    @JsonIgnore
//    @OneToMany(mappedBy = "category" , fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Product> products = new ArrayList<>();

    // For stat
    @JsonIgnore
//    @Transient
    private List<OrderLine> orderLines = new ArrayList<>();

}
