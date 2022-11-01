package tn.ipsas.produitservice.web;

import lombok.AllArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import tn.ipsas.produitservice.domain.Category;
import tn.ipsas.produitservice.domain.Product;
import tn.ipsas.produitservice.service.CategoryRepository;
import tn.ipsas.produitservice.service.ProductRepository;

import javax.websocket.server.PathParam;
import java.io.IOException;
import java.util.*;

@RestController()
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    ProductRepository productRepository;
    CategoryRepository categoryRepository;

    @GetMapping(value = "products/search")
    public Iterable<Product> searchProduct(@RequestParam("query") String query,
                                       @RequestParam("query_category") String queryCategory){
        Set<Long> productsId = new HashSet<>();
        if(!Objects.isNull(query) && !"".equals(query))
            productsId = productRepository.findIdByQuery(query);
        if (!Objects.isNull(queryCategory) && !"".equals(queryCategory))
            productsId.addAll(productRepository.findIdByCategoryName(queryCategory));

        return productRepository.findByIdIn(productsId);
    }

    @GetMapping(value = "products/{id}/image", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) throws IOException {

        Product product = productRepository.getById((long) id);
        String imgPath = product.getImagePath() != null ? product.getImagePath() : "images/default.png";
        ClassPathResource resource = new ClassPathResource(imgPath);
        byte[] bytes = StreamUtils.copyToByteArray(resource.getInputStream());
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }


    @GetMapping("products")
    public Iterable<Product> getProducts(){
        return productRepository.findAll();
    }
    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id){
        return productRepository.getById(id);
    }

    @PostMapping("products")
    public Product saveProduct(@RequestBody Product product){
        return productRepository.save(product);
    }

    @PutMapping("products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product){
        //TODO: Check id
        if (product == null || id == null || !Objects.equals(id, product.getId()))
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok().body(productRepository.save(product));
    }

    @DeleteMapping("products/{id}")
    public void deleteProduct(@PathVariable Long id){
        //TODO: Check id
        productRepository.deleteById(id);
    }

    @GetMapping("categories")
    public Iterable<Category> getCategories(){
        return categoryRepository.findAll();
    }
}
