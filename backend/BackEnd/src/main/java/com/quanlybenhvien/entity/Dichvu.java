package com.quanlybenhvien.entity;

import lombok.Data;
import org.hibernate.annotations.Nationalized;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "dichvu")
public class Dichvu {
    @Id
    @Nationalized
    @Column(name = "msdv", nullable = false, length = 10)
    @NotBlank(message = "Mã dịch vụ không được trống")
    @Length(max = 10, message = "Mã dịch vụ không được quá 10 ký tự")
    private String msdv;

    @Nationalized
    @Column(name = "dongia", nullable = false, length = 50)
    @NotBlank(message = "Đơn giá không được trống")
    private String dongia;

    @Nationalized
    @Column(name = "tendv", nullable = false, length = 50)
    @NotBlank(message = "Tên dịch vụ không đưc trống")
    @Length(max = 50, message = "Tên dịch vu không được quá 50 ký tự")
    private String tendv;

}