package com.quanlybenhvien.controller;

import com.quanlybenhvien.entity.Thanhtoan;
import com.quanlybenhvien.service.ThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/thanh-toan")
@RequiredArgsConstructor
public class ThanhToanController {

    private final ThanhToanService thanhToanService;

    @GetMapping("/{id}")
    public Thanhtoan findById(@PathVariable String id) {
        return this.thanhToanService.findByCode(id);
    }

    @PostMapping
    public Thanhtoan createThanhToan(@Validated @RequestBody Thanhtoan thanhtoan, BindingResult bindingResult) {
        return this.thanhToanService.createThanhToan(thanhtoan, bindingResult);
    }
}
