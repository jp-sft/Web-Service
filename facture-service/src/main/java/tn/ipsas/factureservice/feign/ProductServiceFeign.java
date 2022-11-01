package tn.ipsas.factureservice.feign;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import tn.ipsas.factureservice.model.product.Product;

@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductServiceFeign {
    @GetMapping("/products")
    PagedModel<Product> getAllProducts();

    @GetMapping("/products/{id}")
    Product findProductById(@PathVariable(name = "id") Long id);
}
