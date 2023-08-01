package com.quanlybenhvien.controller;

import com.quanlybenhvien.entity.Dichvu;
import com.quanlybenhvien.service.DichVuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dich-vu")
@RequiredArgsConstructor
public class DichVuController {

    private final DichVuService dichVuService;

    @GetMapping("/{mdv}")
    public Dichvu findById(@PathVariable String mdv) {
        return this.dichVuService.findById(mdv);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Dichvu> searchDichVuByCodeName(@RequestParam String keyword) {
        return this.dichVuService.searchDichVuByCodeName(keyword);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Dichvu createBenhNhan(@Validated @RequestBody Dichvu dichvu, BindingResult bindingResult) {
        return this.dichVuService.createDichVu(dichvu, bindingResult);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Dichvu updateBenhNhan(@Validated @RequestBody Dichvu dichvu, BindingResult bindingResult) {
        return this.dichVuService.updateDichVu(dichvu, bindingResult);
    }
}
