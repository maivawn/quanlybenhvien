create database benhvien;
use benhvien;

create table benhnhan
(
    msbn            nvarchar(10) not null
        primary key,
    hoTen           nvarchar(50) not null,
    CCCD            numeric      not null,
    ntns            date         not null,
    gioitinh        nvarchar(10) not null,
    sdt             numeric      not null,
    Thongtinsuckhoe text         not null
)
    go

create table dichvu
(
    msdv   nvarchar(10) not null
        primary key,
    dongia nvarchar(50) not null,
    tendv  nvarchar(50) not null
)
    go

create table nhanVien
(
    msnv     nvarchar(10) not null
        primary key,
    hoTen    nvarchar(50) not null,
    ntns     date         not null,
    gioiTinh nvarchar(10),
    sdt      numeric      not null,
    chucVu   nvarchar(20) not null,
    password varchar(300) ,
)
    go

create table benhan
(
    msba         nvarchar(10)  not null
        primary key,
    ngaynhapvien date          not null,
    ngayravien   date          not null,
    qtdieutri    nvarchar(200) not null,
    msnv         nvarchar(10)
        references nhanVien,
    msbn         nvarchar(10)
        references benhnhan
)
    go

create table thanhtoan
(
    mtt           nvarchar(10) not null
        primary key,
    ngaythanhtoan date         not null,
    msnv          nvarchar(10)
        references nhanVien,
    msbn          nvarchar(10)
        references benhnhan
)
    go

create table chitietthanhtoan
(
    mtt           nvarchar(10) not null
        constraint FK_thanhtoan
        references thanhtoan,
    msdv          nvarchar(10) not null
        constraint FK_dichvu
        references dichvu,
    soluong       float        not null,
    tongthanhtoan float        not null,
    primary key (mtt, msdv)
)
    go

