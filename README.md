# Lãi Lời — Quản lý bán hàng

Ứng dụng web tiếng Việt dành cho người bán hàng online cá nhân. Không cần cài đặt thư viện hoặc máy chủ.

## Chạy ứng dụng

Mở `index.html` bằng trình duyệt hiện đại và đăng nhập bằng tài khoản demo:

- Email: `demo@lailoi.vn`
- Mật khẩu: `lailoi123`

Đăng nhập chỉ là cổng demo phía trình duyệt; không xác thực tài khoản qua máy chủ, không bảo vệ dữ liệu khỏi người dùng thiết bị và không tách dữ liệu theo tài khoản. Phiên đăng nhập được giữ đến khi đóng tab/trình duyệt hoặc đăng xuất. Dữ liệu cửa hàng được lưu cục bộ bằng `localStorage`; không gửi tới máy chủ.

## Tính năng

- Tổng quan doanh thu, chi phí, lợi nhuận và đơn hàng; biểu đồ có bộ lọc thời gian.
- Tạo, sửa, tìm kiếm, lọc và xóa đơn hàng, giao dịch chi phí.
- Quản lý danh sách sản phẩm, giá và tồn kho.
- Báo cáo tài chính theo tháng hoặc toàn bộ thời gian; xuất giao dịch dạng CSV.
- Bố cục thích ứng trên điện thoại, máy tính bảng và máy tính.

Ứng dụng khởi đầu bằng dữ liệu mẫu để xem trước giao diện. Mọi thay đổi được lưu trên trình duyệt hiện tại. CSV chứa toàn bộ giao dịch, không bao gồm danh sách sản phẩm. Để dùng tài khoản thật hoặc triển khai nhiều người dùng, cần thay cổng demo bằng backend/dịch vụ xác thực và lưu trữ dữ liệu an toàn.
