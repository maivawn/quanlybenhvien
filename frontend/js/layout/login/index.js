export default function createLogin(containerId) {
	const loginContainer = document.getElementById(containerId);

	if (!loginContainer) return;
	loginContainer.innerHTML = `
    <section>
            <a href="./index.html" class="login__close">&times;</a>
            <div class="noi-dung">
                <div class="form">
                    <h2>Trang Đăng Nhập</h2>
                    <form id="login">
                        <div class="input-form">
                            <span>Tên Tài Khoản</span>
                            <input type="text" name="username">
                        </div>
                        <div class="input-form">
                            <span>Mật Khẩu</span>
                            <input type="password" name="password">
                        </div>
                        <div class="nho-dang-nhap">
                            <label><input type="checkbox" name=""> Nhớ Đăng Nhập</label>
                        </div>
                        <div class="input-form">
                            <input onclick="login()" type="button" value="Đăng Nhập">
                        </div>
                        <div class="input-form">
                            <a href="#doimatkhau">Đổi mật khẩu</a>
                        </div>
                        <div class="input-form">
                            <p>Bạn Chưa Có Tài Khoản? <a href="#">Đăng Ký</a></p>
                        </div>
                    </form>
                    <h3>Đăng Nhập Bằng Mạng Xã Hội</h3>
                    <ul class="icon-dang-nhap">
                        <li><i class="fa fa-facebook" aria-hidden="true"></i></li>
                        <li><i class="fa fa-google" aria-hidden="true"></i></li>
                        <li><i class="fa fa-twitter" aria-hidden="true"></i></li>
                    </ul>
                </div>
            </div>
            <!--Kết Thúc Phần Nội Dung-->
        </section>
    `;
}
