package com.quanlybenhvien.service;

import com.quanlybenhvien.entity.Chitietthanhtoan;
import com.quanlybenhvien.entity.Dichvu;
import com.quanlybenhvien.entity.Thanhtoan;
import com.quanlybenhvien.repository.ChitietthanhtoanRepository;
import com.quanlybenhvien.repository.DichvuRepository;
import com.quanlybenhvien.repository.ThanhtoanRepository;
import com.quanlybenhvien.utils.ErrorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChiTietThanhToanService {

    private final ChitietthanhtoanRepository chitietthanhtoanRepository;
    private final ThanhtoanRepository thanhtoanRepository;
    private final DichvuRepository dichvuRepository;

    public List<Chitietthanhtoan> findByThanHToanId(String mtt) {
        Thanhtoan thanhtoan = this.thanhtoanRepository.findById(mtt)
                .orElseThrow(() -> new IllegalArgumentException("Mã thanh toán không tồn tại"));
        return this.chitietthanhtoanRepository.findByMtt(thanhtoan.getMtt());
    }

    public Chitietthanhtoan createChiTiet(Chitietthanhtoan chitietthanhtoan, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        Thanhtoan thanhtoan = this.thanhtoanRepository.findById(chitietthanhtoan.getId().getMtt())
                .orElseThrow(() -> new IllegalArgumentException("Mã thanh toán không tồn tại"));

        Dichvu dichvu = this.dichvuRepository.findById(chitietthanhtoan.getId().getMsdv())
                .orElseThrow(() -> new IllegalArgumentException("Mã dịch vụ không tồn tại"));

        chitietthanhtoan.setTongthanhtoan(chitietthanhtoan.getSoluong() * Double.parseDouble(dichvu.getDongia()));
        chitietthanhtoan.setMsdv(dichvu);
        chitietthanhtoan.setMtt(thanhtoan);
        return this.chitietthanhtoanRepository.save(chitietthanhtoan);
    }
}
