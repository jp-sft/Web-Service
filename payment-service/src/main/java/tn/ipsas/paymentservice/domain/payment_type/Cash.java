package tn.ipsas.paymentservice.domain.payment_type;

import lombok.*;
import tn.ipsas.paymentservice.domain.Payment;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("CASH")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Cash extends Payment {
    private Double cashTendered; //TODO: Remove this
}
