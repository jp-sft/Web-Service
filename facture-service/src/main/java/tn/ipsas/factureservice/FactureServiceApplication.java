package tn.ipsas.factureservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class FactureServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(FactureServiceApplication.class, args);
	}

}
