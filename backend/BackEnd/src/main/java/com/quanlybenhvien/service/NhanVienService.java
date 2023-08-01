package com.quanlybenhvien.service;

import com.quanlybenhvien.dto.LoginDTO;
import com.quanlybenhvien.dto.LoginResponseDTO;
import com.quanlybenhvien.entity.NhanVien;
import com.quanlybenhvien.repository.NhanVienRepository;
import com.quanlybenhvien.utils.DataUtils;
import com.quanlybenhvien.utils.ErrorUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.transaction.Transactional;
import java.util.Base64;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NhanVienService {

    private final NhanVienRepository nhanVienRepository;

    public NhanVien findById(String id) {
        return this.nhanVienRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Nhân viên không tồn tại"));
    }

    public List<NhanVien> searchByCodeName(String codeName) {
        log.info("search nhan-vien by: {}", codeName);
        return this.nhanVienRepository.searchByCodeName(DataUtils.handleKeySearch(codeName));
    }

    @Transactional
    public NhanVien createNhanVien(NhanVien nhanVien, BindingResult bindingResult) {
        log.info("create nhan-vien: {}", nhanVien.getMsnv());
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }

        this.nhanVienRepository.findById(nhanVien.getMsnv())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("Mã nhân viên đã tồn tại");
                });
        this.nhanVienRepository.findBySdt(nhanVien.getSdt())
                .ifPresent($ -> {
                    throw new IllegalArgumentException("SĐT đã tồn tại");
                });
        nhanVien.setPassword("123456789");
        NhanVien save = this.nhanVienRepository.save(nhanVien);
        log.info("create nhan-vien successfully");
        return save;
    }

    @Transactional
    public NhanVien deleteNhanVien(String msnv) {
        log.info("delete nhan-vien {}: ", msnv);
        NhanVien nhanVien = this.nhanVienRepository.findById(msnv)
                .orElseThrow(() -> new IllegalArgumentException("Mã nhân viên không tồn tại"));
        this.nhanVienRepository.deleteById(msnv);
        return nhanVien;
    }

    @Transactional
    public NhanVien updateNhanVien(NhanVien nhanVien, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }

        this.nhanVienRepository.findById(nhanVien.getMsnv())
                .orElseThrow(() -> new IllegalArgumentException("Nhân viên không tồn tại"));

        this.nhanVienRepository.findBySdt(nhanVien.getSdt())
                .filter($ -> !$.getMsnv().equals(nhanVien.getMsnv()))
                .ifPresent($ -> {
                    throw new IllegalArgumentException("SĐT đã tồn tại");
                });
        return this.nhanVienRepository.save(nhanVien);
    }

    public LoginResponseDTO login(LoginDTO loginDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            ErrorUtils.throwError(bindingResult);
        }
        NhanVien nhanVien = this.findById(loginDTO.getUsername());
        if (!nhanVien.getPassword().equals(loginDTO.getPassword())) {
            throw new IllegalArgumentException("Mật khẩu không chính xác");
        }

        String token = Base64.getEncoder().encodeToString(nhanVien.getMsnv().getBytes());
        return new LoginResponseDTO(token, nhanVien);
    }
}
