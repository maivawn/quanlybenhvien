package com.quanlybenhvien.dto;

import com.quanlybenhvien.entity.NhanVien;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponseDTO {
    private String token;
    private NhanVien user;
}
