package com.quanlybenhvien.service;

import com.quanlybenhvien.entity.Dichvu;
import com.quanlybenhvien.repository.DichvuRepository;
import com.quanlybenhvien.utils.DataUtils;
import com.quanlybenhvien.utils.ErrorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DichVuService {
    private final DichvuRepository dichvuRepository;

    public Dichvu findById(String mdv) {
        return this.dichvuRepository.findById(mdv).orElseThrow(() -> {
            throw new IllegalArgumentException("Mã dịch vụ không tồn tại");
        });
    }

    public List<Dichvu> searchDichVuByCodeName(String codeName) {
        log.info("get all dich-vu by: {}", codeName);
        return this.dichvuRepository.findByCodeName(DataUtils.handleKeySearch(codeName));
    }

    @Transactional
    public Dichvu createDichVu(Dichvu dichvu, BindingResult bindingResult) {
        log.info("create dich vu: {}", dichvu.getMsdv());
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        this.dichvuRepository.findById(dichvu.getMsdv())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đã tồn tại mã số dịch vụ.");
                });

        Dichvu save = this.dichvuRepository.save(dichvu);
        log.info("create dich vu successfully");
        return save;
    }

    @Transactional
    public Dichvu updateDichVu(Dichvu dichVu, BindingResult bindingResult) {
        log.info("update dich vu: {}", dichVu.getMsdv());
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        this.dichvuRepository.findById(dichVu.getMsdv())
                .orElseThrow(() -> new IllegalArgumentException("Không tồn tại mã số dịch vụ."));
        Dichvu save = this.dichvuRepository.save(dichVu);
        log.info("update dich vu successfully");
        return save;
    }
}
