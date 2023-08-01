package com.quanlybenhvien.service;

import com.quanlybenhvien.entity.Benhnhan;
import com.quanlybenhvien.repository.BenhanRepository;
import com.quanlybenhvien.repository.BenhnhanRepository;
import com.quanlybenhvien.utils.DataUtils;
import com.quanlybenhvien.utils.ErrorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BenhNhanService {

    private final BenhnhanRepository benhnhanRepository;
    private final BenhanRepository benhanRepository;

    public Benhnhan findById(String code) {
        return this.benhnhanRepository.findById(code)
                .orElseThrow(() -> new IllegalArgumentException("Mã bệnh nhân không tồn tại"));
    }

    public List<Benhnhan> searchBenhNhanByCodeName(String codeName) {
        log.info("get all benh-nhan by: {}", codeName);
        return this.benhnhanRepository.findByCodeName(DataUtils.handleKeySearch(codeName));
    }

    @Transactional
    public Benhnhan createBenhNhan(Benhnhan benhnhan, BindingResult bindingResult) {
        log.info("create benh nhan: {}", benhnhan.getMsbn());
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        this.benhnhanRepository.findById(benhnhan.getMsbn())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đã tồn tại mã số bệnh nhân.");
                });
        this.benhnhanRepository.findByCccd(benhnhan.getCccd())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đẫ tồn tại CCCD");
                });
        this.benhnhanRepository.findBySdt(benhnhan.getSdt())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đã tồn tại sđt");
                });
        Benhnhan save = this.benhnhanRepository.save(benhnhan);
        log.info("create benh nahn successfully");
        return save;
    }

    @Transactional
    public Benhnhan deleteBenhNhan(String msbn) {
        log.info("delete benh-nhan: {}", msbn);
        Benhnhan benhnhan = this.findById(msbn);

        if (!CollectionUtils.isEmpty(this.benhanRepository.findByMsbn(msbn))) {
            throw new IllegalArgumentException("Bệnh nhân này đã có bệnh án.");
        }

        this.benhnhanRepository.deleteById(msbn);
        log.info("delete benh-nhan: {} successfully", msbn);
        return benhnhan;
    }

    @Transactional
    public Benhnhan updateBenhNhan(Benhnhan benhnhan, BindingResult bindingResult) {
        log.info("update benh nhan: {}", benhnhan.getMsbn());
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        Benhnhan benhNhanInDb = this.findById(benhnhan.getMsbn());
        this.benhnhanRepository.findByCccd(benhnhan.getCccd())
                .filter($ -> !$.getMsbn().equals(benhNhanInDb.getMsbn()))
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đẫ tồn tại CCCD");
                });
        this.benhnhanRepository.findBySdt(benhnhan.getSdt())
                .filter($ -> !$.getMsbn().equals(benhNhanInDb.getMsbn()))
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Đã tồn tại sđt");
                });
        Benhnhan save = this.benhnhanRepository.save(benhnhan);
        log.info("update benh nahn successfully");
        return save;
    }
}
