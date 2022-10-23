package tn.ipsas.paymentservice.domain;

import lombok.*;
import net.minidev.json.annotate.JsonIgnore;
import tn.ipsas.paymentservice.domain.order.Order;

import javax.persistence.*;

@Entity
@Table(name = "Payments")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "payment_type", discriminatorType = DiscriminatorType.STRING)
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    private Double amount;

    @ManyToOne
    @JoinColumn(name = "currency_id")
    private Currency currency;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    private Double convertAmount(String currency){
        // TODO: Convert amount to
        return this.amount;
    }
}
