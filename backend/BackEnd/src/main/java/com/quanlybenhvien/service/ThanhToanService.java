package com.quanlybenhvien.service;

import com.quanlybenhvien.entity.Thanhtoan;
import com.quanlybenhvien.repository.BenhnhanRepository;
import com.quanlybenhvien.repository.NhanVienRepository;
import com.quanlybenhvien.repository.ThanhtoanRepository;
import com.quanlybenhvien.utils.ErrorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ThanhToanService {

    private final ThanhtoanRepository thanhtoanRepository;
    private final BenhnhanRepository benhnhanRepository;
    private final NhanVienRepository nhanVienRepository;

    @Nullable
    public Thanhtoan findByCode(String code) {
        log.info("find thanh-toan by code: {}", code);
        return this.thanhtoanRepository.findById(code).orElseThrow(() -> new IllegalArgumentException("Không tìm thấy mã thanh toán"));
    }

    @Transactional
    public Thanhtoan createThanhToan(Thanhtoan thanhtoan, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        this.thanhtoanRepository.findById(thanhtoan.getMsbn())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đã tồn tại mã thanh toán");
                });
        this.nhanVienRepository.findById(thanhtoan.getMsnv())
                .orElseThrow(() -> new IllegalArgumentException("Không tồn tại mã số nhân viên"));
        this.benhnhanRepository.findById(thanhtoan.getMsbn())
                .orElseThrow(() -> new IllegalArgumentException("Không tồn tại mã số bệnh nhân"));
        return this.thanhtoanRepository.save(thanhtoan);
    }
}
