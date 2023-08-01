export default function createHeader(containerId) {
    const headerDom = document.getElementById(containerId);
    if (!headerDom) return;
    headerDom.innerHTML = `
        <div class="header__language"></div>
        <div class="row">
            <div class="col-1-of-4">
                <div class="header__logo-box">
                    <a href="#">
                        <img src="./img/logo.png" class="header__logo" alt="Thanh Cong">
                    </a>
                </div>
            </div>

            <div class="col-3-of-4">
                <div class="items">
                    <div class="row">
                        <div class="col-1-of-3">
                            <div class="item">
                                <div class="item__image">
                                    <img src="./img/phone-icon.png" class="item__image-head" alt="icon">
                                </div>
                                <div class="item__desc">
                                    <a class="item__desc-phone" href="tel:0374298773">0374 298 773</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-3">
                            <div class="item">
                                <div class="item__image">
                                    <img src="./img/clock-icon.png" class="item__image-head" alt="icon">
                                </div>
                                <div class="item__desc">
                                    <div class="item__desc-string">
                                        <p>Thứ 2 -Thứ 7: 7:30-19:30</p>
                                        <p>Chủ nhật: 7:30-11:30</p>
                                    </div>
                                    <p>
                                        Hết giờ làm việc
                                        <span class="light"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-1-of-3">
                            <div class="item">
                                <div class="item__image">
                                    <img src="./img/place-icon.png" class="item__image-head" alt="icon">
                                </div>
                                <div class="item__desc">
                                    <a href="#" target="_blank">
                                        <p> Số1, Đại Cồ Việt, </p>
                                        <p> Hai Bà Trưng , Hà Nội</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </div>
        <h2 class="header__title">
            Bệnh viện đa khoa Hà Nội
        </h2>
    `
}