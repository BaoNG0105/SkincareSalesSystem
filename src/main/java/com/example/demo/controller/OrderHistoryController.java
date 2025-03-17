//package com.example.demo.controller;
//
//import com.example.demo.dto.OrderHistoryRequest;
//import com.example.demo.service.OrderHistoryService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/order-histories")
//public class OrderHistoryController {
//
//    @Autowired
//    private OrderHistoryService orderHistoryService;
//
//    @PostMapping
//    public OrderHistoryRequest createOrderHistory(@RequestBody OrderHistoryRequest dto) {
//        return orderHistoryService.createOrderHistory(dto);
//    }
//
//    @GetMapping
//    public List<OrderHistoryRequest> getAllOrderHistories() {
//        return orderHistoryService.getAllOrderHistories();
//    }
//
//    @GetMapping("/{id}")
//    public OrderHistoryRequest getOrderHistoryById(@PathVariable Long id) {
//        return orderHistoryService.getOrderHistoryById(id);
//    }
//
//    @PutMapping("/{id}")
//    public OrderHistoryRequest updateOrderHistory(@PathVariable Long id, @RequestBody OrderHistoryRequest dto) {
//        return orderHistoryService.updateOrderHistory(id, dto);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteOrderHistory(@PathVariable Long id) {
//        orderHistoryService.deleteOrderHistory(id);
//    }
//}
