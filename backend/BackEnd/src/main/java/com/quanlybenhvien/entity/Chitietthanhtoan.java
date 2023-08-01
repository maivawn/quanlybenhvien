package com.quanlybenhvien.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Min;

@Data
@Entity
@Table(name = "chitietthanhtoan")
public class Chitietthanhtoan {
    @EmbeddedId
    private ChitietthanhtoanId id;

    @JsonIgnore
    @MapsId("mtt")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "mtt", nullable = false)
    private Thanhtoan mtt;

    @JsonIgnore
    @MapsId("msdv")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "msdv", nullable = false)
    private Dichvu msdv;

    @Column(name = "soluong", nullable = false)
    @Min(value = 1, message = "Số lượng không được nhỏ hơn 1")
    private Double soluong;

    @Column(name = "tongthanhtoan", nullable = false)
    private Double tongthanhtoan;

}