package tn.ipsas.factureservice.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

//@Entity
//@DiscriminatorValue("CUSTOMER")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class Customer extends User {
    private String city; //TODO: Create City Table For Statistique
    //TODO: Add Customer type (Entreprise, ..)
}
