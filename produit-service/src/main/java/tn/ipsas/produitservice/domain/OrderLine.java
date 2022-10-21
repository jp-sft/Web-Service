package tn.ipsas.produitservice.domain;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString
public class OrderLine {

    private Long id;

    private Integer quantity;

    private String taxStatus;

    private Double weight;

    private Double subTotal;

    private Product product;
}
