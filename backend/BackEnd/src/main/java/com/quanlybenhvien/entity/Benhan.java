package com.quanlybenhvien.entity;

import lombok.Data;
import org.hibernate.annotations.Nationalized;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@Table(name = "benhan")
public class Benhan {

    @Id
    @Nationalized
    @Column(name = "msba", nullable = false, length = 10)
    @NotBlank(message = "Mã bệnh án không được trống")
    @Length(max = 10, message = "Mã bệnh án tối đa 10 ký tự")
    private String msba;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngaynhapvien", nullable = false)
    @NotNull(message = "Ngày nhập viện không thể trống")
    private Date ngaynhapvien;

    @Temporal(TemporalType.DATE)
    @Column(name = "ngayravien", nullable = false)
    @NotNull(message = "Ngày ra viện không được phép trống")
    private Date ngayravien;

    @Nationalized
    @Column(name = "qtdieutri", nullable = false, length = 200)
    @NotBlank(message = "QT điều trị không được phép trống")
    private String qtdieutri;

    @Column(name = "msnv")
    private String msnv;

    @Column(name = "msbn")
    private String msbn;
}