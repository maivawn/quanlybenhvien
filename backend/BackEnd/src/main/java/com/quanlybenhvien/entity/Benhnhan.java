package com.quanlybenhvien.entity;

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
@Table(name = "benhnhan")
public class Benhnhan {

    @Id
    @Nationalized
    @Column(name = "msbn", nullable = false, length = 10)
    @NotBlank(message = "Mã số bệnh nhân không được trống!")
    @Length(max = 10, message = "Mã số bệnh nhân không được quá 10 ký tự")
    private String msbn;

    @Nationalized
    @Column(name = "hoTen", nullable = false, length = 50)
    @NotBlank(message = "Họ và tên không đưuọc trống!")
    @Length(max = 50, message = "Họ và tên không được quá 50 ký tự")
    private String hoTen;

    @Column(name = "CCCD", nullable = false, precision = 18)
    @NotNull(message = "CCCD không được trống")
    private BigDecimal cccd;

    @Temporal(TemporalType.DATE)
    @Column(name = "ntns", nullable = false)
    @NotNull(message = "Ngày sinh không đưuọc trống!")
    private Date ntns;

    @Nationalized
    @Column(name = "gioitinh", nullable = false, length = 10)
    @NotNull(message = "Giới tình không đưuợc trống!")
    private String gioitinh;

    @Column(name = "sdt", nullable = false, precision = 18)
    @NotNull(message = "Số điện thoại không được trống")
    private BigDecimal sdt;

    @Lob
    @Column(name = "Thongtinsuckhoe", nullable = false)
    @NotNull(message = "Thông tin sức khỏe không đưuọc trống!")
    private String thongtinsuckhoe;
}