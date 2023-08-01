package com.quanlybenhvien.controller;

import com.quanlybenhvien.entity.NhanVien;
import com.quanlybenhvien.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nhan-vien")
@RequiredArgsConstructor
public class NhanVienController {

    private final NhanVienService nhanVienService;

    @GetMapping("/{id}")
    public NhanVien findById(@PathVariable String id) {
        return this.nhanVienService.findById(id);
    }

    @GetMapping
    public List<NhanVien> searchByCodeName(@RequestParam String codeName) {
        return this.nhanVienService.searchByCodeName(codeName);
    }

    @PostMapping
    public NhanVien createNhanVien(@Validated @RequestBody NhanVien nhanVien, BindingResult bindingResult) {
        return this.nhanVienService.createNhanVien(nhanVien, bindingResult);
    }

    @PutMapping
    public NhanVien updateNhanVien(@Validated @RequestBody NhanVien nhanVien, BindingResult bindingResult) {
        return this.nhanVienService.updateNhanVien(nhanVien, bindingResult);
    }

    @DeleteMapping
    public NhanVien deleteNhanVien(@RequestParam String msnv) {
        return this.nhanVienService.deleteNhanVien(msnv);
    }
}
