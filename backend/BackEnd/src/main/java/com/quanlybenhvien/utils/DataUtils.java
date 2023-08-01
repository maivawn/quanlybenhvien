package com.quanlybenhvien.utils;

import org.springframework.lang.Nullable;

import java.util.Optional;

public class DataUtils {

    private DataUtils() {}

    public static String handleKeySearch(@Nullable String keySearch) {
        return Optional.ofNullable(keySearch)
                .map($ -> "%" + $ + "%")
                .orElse("%%");
    }
}
