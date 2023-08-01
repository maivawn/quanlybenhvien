package com.quanlybenhvien.utils;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import javax.validation.constraints.NotNull;
import java.util.Optional;

public class ErrorUtils {

    private ErrorUtils() {}

    public static void throwError(@NotNull BindingResult bindingResult) {
        Optional.of(bindingResult.getFieldError())
                .map(FieldError::getDefaultMessage)
                .ifPresent(message -> { throw new IllegalArgumentException(message); });
    }
}
