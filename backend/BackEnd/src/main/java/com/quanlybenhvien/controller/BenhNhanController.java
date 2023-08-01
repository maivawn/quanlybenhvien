package com.quanlybenhvien.controller;

import com.quanlybenhvien.entity.Benhnhan;
import com.quanlybenhvien.service.BenhNhanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/benh-nhan")
@RequiredArgsConstructor
public class BenhNhanController {

    private final BenhNhanService benhNhanService;

    @GetMapping("/{id}")
    public Benhnhan findById(@PathVariable String id) {
        return this.benhNhanService.findById(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Benhnhan> searchBenhNhanByCodeName(@RequestParam String keyword) {
        return this.benhNhanService.searchBenhNhanByCodeName(keyword);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Benhnhan createBenhNhan(@Validated @RequestBody Benhnhan benhNhan, BindingResult bindingResult) {
        return this.benhNhanService.createBenhNhan(benhNhan, bindingResult);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.OK)
    public Benhnhan deleteBenhNhan(@RequestParam String msbn) {
        return this.benhNhanService.deleteBenhNhan(msbn);
    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public Benhnhan updateBenhNhan(@Validated @RequestBody Benhnhan benhnhan, BindingResult bindingResult) {
        return this.benhNhanService.updateBenhNhan(benhnhan, bindingResult);
    }

}
