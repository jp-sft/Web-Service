package tn.ipsas.paymentservice.domain.payment_type;

import lombok.*;
import tn.ipsas.paymentservice.domain.Payment;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CHEQUE")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Cheque extends Payment {
    private String name;
    private String bank;
}
