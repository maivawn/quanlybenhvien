package com.quanlybenhvien.controller;

import com.quanlybenhvien.dto.LoginDTO;
import com.quanlybenhvien.dto.LoginResponseDTO;
import com.quanlybenhvien.service.NhanVienService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final NhanVienService nhanVienService;

    @PostMapping("/login")
    public LoginResponseDTO login(@Validated @RequestBody LoginDTO loginDTO, BindingResult bindingResult) {
        return this.nhanVienService.login(loginDTO, bindingResult);
    }
}
