package com.quanlybenhvien.repository;

import com.quanlybenhvien.entity.Benhnhan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface BenhnhanRepository extends JpaRepository<Benhnhan, String> {

    @Query("SELECT b FROM Benhnhan b WHERE ?1 IS NULL OR b.msbn LIKE ?1 OR b.hoTen LIKE ?1")
    List<Benhnhan> findByCodeName(String codeName);

    Optional<Benhnhan> findByCccd(BigDecimal cccd);

    Optional<Benhnhan> findBySdt(BigDecimal phone);
}