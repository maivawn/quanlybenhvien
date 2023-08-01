package com.quanlybenhvien.controller;


import com.quanlybenhvien.entity.Chitietthanhtoan;
import com.quanlybenhvien.service.ChiTietThanhToanService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chi-tiet-thanh-toan")
@RequiredArgsConstructor
public class ChiTietThanhToanController {

    private final ChiTietThanhToanService chiTietThanhToanService;

    @GetMapping(params = {"mtt"})
    public List<Chitietthanhtoan> findByThanhToanId(@RequestParam String mtt) {
        return this.chiTietThanhToanService.findByThanHToanId(mtt);
    }

    @PostMapping
    public Chitietthanhtoan createChiTiet(@Validated @RequestBody Chitietthanhtoan chitietthanhtoan, BindingResult bindingResult) {
        return this.chiTietThanhToanService.createChiTiet(chitietthanhtoan, bindingResult);
    }
}
