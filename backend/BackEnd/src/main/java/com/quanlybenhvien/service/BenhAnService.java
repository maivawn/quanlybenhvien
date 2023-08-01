package com.quanlybenhvien.service;

import com.quanlybenhvien.entity.Benhan;
import com.quanlybenhvien.repository.BenhanRepository;
import com.quanlybenhvien.repository.BenhnhanRepository;
import com.quanlybenhvien.repository.NhanVienRepository;
import com.quanlybenhvien.utils.ErrorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class BenhAnService {

    private final BenhanRepository benhanRepository;
    private final NhanVienRepository nhanVienRepository;
    private final BenhnhanRepository benhnhanRepository;

    public Benhan findById(String msba) {
        return this.benhanRepository.findById(msba)
                .orElseThrow(() -> new IllegalArgumentException("mã bệnh án không tồn tại"));
    }

    @Transactional
    public Benhan createBenhAn(Benhan benhan, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        this.benhanRepository.findById(benhan.getMsba())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Mã bệnh án đã tồn tại");
                });

        this.nhanVienRepository.findById(benhan.getMsnv())
                .orElseThrow(() -> new IllegalArgumentException("Mã nhân viên không tồn tại"));

        this.benhnhanRepository.findById(benhan.getMsbn())
                .orElseThrow(() -> new IllegalArgumentException("Mã số bệnh nhân không tồn tại"));
        return this.benhanRepository.save(benhan);
    }
}
