package tn.ipsas.factureservice.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import tn.ipsas.factureservice.model.user.Customer;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Date createdDate;

    @Enumerated(EnumType.STRING)
    private OrderStatus Status = OrderStatus.CREATED;


    @OneToMany(mappedBy = "order", fetch = FetchType.EAGER)
    private List<OrderLine> orderLines = new ArrayList<>();

    @Transient
    private Customer customer;
    private Long customerId;
}
