# Lãi Lời — Quản lý bán hàng

Ứng dụng web tiếng Việt dành cho người bán hàng online cá nhân. Không cần cài đặt thư viện hoặc máy chủ.

## Chạy ứng dụng

Mở `index.html` bằng trình duyệt hiện đại, tạo tài khoản trước rồi đăng nhập bằng email và mật khẩu vừa đăng ký.

Nếu email chưa được đăng ký, biểu mẫu sẽ báo lỗi và chuyển về màn hình tạo tài khoản. Mật khẩu được dẫn xuất bằng PBKDF2 trước khi lưu vào trình duyệt; không lưu mật khẩu dạng văn bản.

Đăng ký/đăng nhập chỉ hoạt động trên trình duyệt và thiết bị hiện tại; không xác thực qua máy chủ, không thể dùng tài khoản trên thiết bị khác và không bảo vệ dữ liệu khỏi người có quyền truy cập trình duyệt. Dữ liệu cửa hàng hiện được dùng chung trên thiết bị, chưa tách theo tài khoản. Phiên đăng nhập được giữ đến khi đóng tab/trình duyệt hoặc đăng xuất.

## Tính năng

- Tổng quan doanh thu, chi phí, lợi nhuận và đơn hàng; biểu đồ có bộ lọc thời gian.
- Tạo, sửa, tìm kiếm, lọc và xóa đơn hàng, giao dịch chi phí.
- Quản lý danh sách sản phẩm, giá và tồn kho.
- Báo cáo tài chính theo tháng hoặc toàn bộ thời gian; xuất giao dịch dạng CSV.
- Bố cục thích ứng trên điện thoại, máy tính bảng và máy tính.

Ứng dụng khởi đầu bằng dữ liệu mẫu để xem trước giao diện. Mọi thay đổi được lưu trên trình duyệt hiện tại. CSV chứa toàn bộ giao dịch, không bao gồm danh sách sản phẩm. Để dùng tài khoản thật hoặc triển khai nhiều người dùng, cần backend/dịch vụ xác thực và lưu trữ dữ liệu riêng an toàn cho từng tài khoản.
