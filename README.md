# Lãi Lời — Quản lý bán hàng

Ứng dụng web tiếng Việt dành cho người bán hàng online cá nhân. Không cần cài đặt thư viện hoặc máy chủ.

## Chạy ứng dụng

Mở `index.html` bằng trình duyệt hiện đại, tạo tài khoản trước rồi đăng nhập bằng email và mật khẩu vừa đăng ký.

Nếu email chưa được đăng ký, biểu mẫu sẽ báo lỗi và chuyển về màn hình tạo tài khoản. Mật khẩu được dẫn xuất bằng PBKDF2 trước khi lưu vào trình duyệt; không lưu mật khẩu dạng văn bản.

Đăng ký/đăng nhập chỉ hoạt động trên trình duyệt và thiết bị hiện tại; không xác thực qua máy chủ, không thể dùng tài khoản trên thiết bị khác và không bảo vệ dữ liệu khỏi người có quyền truy cập trình duyệt. Dữ liệu cửa hàng được lưu riêng theo từng email trong trình duyệt này. Tài khoản mới bắt đầu với danh sách giao dịch và sản phẩm trống. Phiên đăng nhập được giữ đến khi đóng tab/trình duyệt hoặc đăng xuất.

## Tính năng

- Tổng quan doanh thu, chi phí, lợi nhuận và đơn hàng; biểu đồ có bộ lọc thời gian.
- Tạo, sửa, tìm kiếm, lọc và xóa đơn hàng, giao dịch chi phí.
- Quản lý danh sách sản phẩm, giá và tồn kho.
- Báo cáo tài chính theo tháng hoặc toàn bộ thời gian; xuất giao dịch dạng CSV.
- Bố cục thích ứng trên điện thoại, máy tính bảng và máy tính.

Mọi thay đổi được lưu trên trình duyệt hiện tại; các tài khoản khác nhau trên cùng trình duyệt có dữ liệu riêng. Dữ liệu cũ từ phiên bản trước không được tự động gán vào tài khoản nào. CSV chứa toàn bộ giao dịch, không bao gồm danh sách sản phẩm.

Đây là ứng dụng tĩnh để trải nghiệm, không phải hệ thống tài khoản an toàn: dữ liệu không đồng bộ giữa các máy và người có quyền truy cập trình duyệt có thể xem hoặc chỉnh sửa dữ liệu lưu cục bộ. Muốn đăng nhập và đồng bộ dữ liệu an toàn trên nhiều thiết bị cần triển khai backend/dịch vụ xác thực và cơ sở dữ liệu.
