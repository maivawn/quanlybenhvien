package com.quanlybenhvien.entity;

import lombok.Data;
import org.hibernate.annotations.Nationalized;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "thanhtoan")
public class Thanhtoan {
    @Id
    @Nationalized
    @Column(name = "mtt", nullable = false, length = 10)
    @NotBlank(message = "Mã thanh toán không được trống")
    private String mtt;

    @Column(name = "ngaythanhtoan", nullable = false)
    @NotNull(message = "Ngày thành toán không được trống")
    private LocalDate ngaythanhtoan;

    @Column(name = "msnv")
    @NotBlank(message = "Mã nhân viên không được trống")
    private String msnv;

    @Column(name = "msbn")
    @NotBlank(message = "Mã bệnh nhân không được trống")
    private String msbn;

}