package com.quanlybenhvien.entity;

import org.hibernate.Hibernate;
import org.hibernate.annotations.Nationalized;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class ChitietthanhtoanId implements Serializable {
    private static final long serialVersionUID = 6296690645559896912L;
    @Nationalized
    @Column(name = "mtt", nullable = false, length = 10)
    private String mtt;

    @Nationalized
    @Column(name = "msdv", nullable = false, length = 10)
    private String msdv;

    public String getMtt() {
        return mtt;
    }

    public void setMtt(String mtt) {
        this.mtt = mtt;
    }

    public String getMsdv() {
        return msdv;
    }

    public void setMsdv(String msdv) {
        this.msdv = msdv;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        ChitietthanhtoanId entity = (ChitietthanhtoanId) o;
        return Objects.equals(this.msdv, entity.msdv) &&
                Objects.equals(this.mtt, entity.mtt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(msdv, mtt);
    }

}