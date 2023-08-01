package com.quanlybenhvien.repository;

import com.quanlybenhvien.entity.NhanVien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface NhanVienRepository extends JpaRepository<NhanVien, String> {

    @Query("SELECT n FROM NhanVien n WHERE ?1 IS NULL OR n.msnv LIKE ?1 OR n.hoTen LIKE ?1")
    List<NhanVien> searchByCodeName(String codeName);
    Optional<NhanVien> findBySdt(BigDecimal sdt);
}