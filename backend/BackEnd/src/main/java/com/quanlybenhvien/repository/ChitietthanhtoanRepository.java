package com.quanlybenhvien.repository;

import com.quanlybenhvien.entity.Chitietthanhtoan;
import com.quanlybenhvien.entity.ChitietthanhtoanId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChitietthanhtoanRepository extends JpaRepository<Chitietthanhtoan, ChitietthanhtoanId> {

    @Query("SELECT c FROM Chitietthanhtoan c WHERE c.id.mtt = ?1")
    List<Chitietthanhtoan> findByMtt(String mtt);
}