package com.quanlybenhvien.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Nationalized;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity
@Table(name = "nhanVien")
public class NhanVien {
    @Id
    @Nationalized
    @Column(name = "msnv", nullable = false, length = 10)
    @NotBlank(message = "Mã nhân viên không được trống!")
    @Length(max = 10, message = "Mã nhân viên không được quá 10 ký tự")
    private String msnv;

    @Nationalized
    @Column(name = "hoTen", nullable = false, length = 50)
    @NotBlank(message = "Họ tên không được trống!")
    @Length(max = 50, message = "Họ tên không được quá 50 ký tự")
    private String hoTen;

    @Temporal(TemporalType.DATE)
    @Column(name = "ntns", nullable = false)
    @NotNull(message = "Ngày sinh không được trống")
    private Date ntns;

    @Nationalized
    @Column(name = "gioiTinh", length = 10)
    private String gioiTinh;

    @Column(name = "sdt", nullable = false, precision = 18)
    @NotNull(message = "Sđt không được trống!")
    private BigDecimal sdt;

    @Nationalized
    @Column(name = "chucVu", nullable = false, length = 20)
    private String chucVu;

    @JsonIgnore
    @Column(name = "password")
    private String password;
}