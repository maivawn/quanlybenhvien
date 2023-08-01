package com.quanlybenhvien.controller;

import com.quanlybenhvien.entity.Benhan;
import com.quanlybenhvien.service.BenhAnService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/benh-an")
@RequiredArgsConstructor
public class BenhAnController {

    private final BenhAnService benhAnService;

    @GetMapping("/{msba}")
    public Benhan findById(@PathVariable String msba) {
        return this.benhAnService.findById(msba);
    }

    @PostMapping
    public Benhan createBenhAn(@Validated @RequestBody Benhan benhan, BindingResult bindingResult) {
        return this.benhAnService.createBenhAn(benhan, bindingResult);
    }
}
