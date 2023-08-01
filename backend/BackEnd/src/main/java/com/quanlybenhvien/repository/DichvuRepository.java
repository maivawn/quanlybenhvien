package com.quanlybenhvien.repository;

import com.quanlybenhvien.entity.Dichvu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DichvuRepository extends JpaRepository<Dichvu, String> {

    @Query("SELECT d FROM Dichvu d WHERE ?1 IS NULL OR d.msdv LIKE ?1 OR d.tendv LIKE ?1")
    List<Dichvu> findByCodeName(String handleKeySearch);
}