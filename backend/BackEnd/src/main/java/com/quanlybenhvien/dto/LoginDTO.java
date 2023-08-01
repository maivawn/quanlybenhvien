package com.quanlybenhvien.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginDTO {

    @NotBlank(message = "Tên đăng nhập không được trống")
    private String username;

    @NotBlank(message = "Mật khẩu không được trống")
    private String password;
}
