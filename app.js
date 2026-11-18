(() => {
  "use strict";

  const STORAGE_KEY = "lai-loi-store-v1";
  const AUTH_SESSION_KEY = "lai-loi-demo-session";
  const DEMO_EMAIL = "demo@lailoi.vn";
  const DEMO_PASSWORD = "lailoi123";
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const localISO = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const dayOffset = (days, hour = 10) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    date.setHours(hour, 0, 0, 0);
    return localISO(date);
  };
  const money = (amount) => new Intl.NumberFormat("vi-VN", {
    style: "currency", currency: "VND", maximumFractionDigits: 0
  }).format(Number(amount) || 0);
  const number = (amount) => new Intl.NumberFormat("vi-VN").format(Number(amount) || 0);
  const shortMoney = (amount) => {
    const value = Number(amount) || 0;
    if (value >= 1000000) return `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 1 }).format(value / 1000000)}tr`;
    if (value >= 1000) return `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value / 1000)}k`;
    return number(value);
  };
  const todayISO = () => localISO(new Date());
  const formatDate = (date) => new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${date}T12:00:00`));
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const defaultData = () => ({
    transactions: [
      { id: "DH-1058", type: "sale", title: "Đơn hàng #DH-1058", customer: "Nguyễn Minh Anh", product: "Túi tote hoa nhí", amount: 385000, date: dayOffset(0, 9), status: "completed" },
      { id: "DH-1057", type: "sale", title: "Đơn hàng #DH-1057", customer: "Trần Ngọc Hà", product: "Bình giữ nhiệt Mây", amount: 520000, date: dayOffset(0, 8), status: "pending" },
      { id: "CP-042", type: "expense", title: "Nhập hàng đợt tháng 11", category: "Nhập hàng", note: "Bộ sưu tập mới", amount: 2350000, date: dayOffset(1, 13) },
      { id: "DH-1056", type: "sale", title: "Đơn hàng #DH-1056", customer: "Phạm Thảo Vy", product: "Nến thơm Gỗ thông", amount: 299000, date: dayOffset(1, 11), status: "completed" },
      { id: "CP-041", type: "expense", title: "Hộp giấy & thiệp cảm ơn", category: "Đóng gói", note: "100 bộ", amount: 420000, date: dayOffset(2, 15) },
      { id: "DH-1055", type: "sale", title: "Đơn hàng #DH-1055", customer: "Lê Gia Hân", product: "Túi tote hoa nhí", amount: 385000, date: dayOffset(2, 10), status: "completed" },
      { id: "DH-1054", type: "sale", title: "Đơn hàng #DH-1054", customer: "Đỗ Khánh Linh", product: "Set quà Mây nhỏ", amount: 650000, date: dayOffset(3, 14), status: "completed" },
      { id: "CP-040", type: "expense", title: "Phí quảng cáo Instagram", category: "Quảng cáo", note: "Chiến dịch cuối tuần", amount: 680000, date: dayOffset(4, 9) },
      { id: "DH-1053", type: "sale", title: "Đơn hàng #DH-1053", customer: "Võ Ngọc Mai", product: "Nến thơm Gỗ thông", amount: 299000, date: dayOffset(5, 16), status: "completed" },
      { id: "CP-039", type: "expense", title: "Phí giao hàng nội thành", category: "Vận chuyển", note: "Giao 12 đơn", amount: 185000, date: dayOffset(6, 12) },
      { id: "DH-1052", type: "sale", title: "Đơn hàng #DH-1052", customer: "Nguyễn Bảo Châu", product: "Bình giữ nhiệt Mây", amount: 520000, date: dayOffset(7, 9), status: "completed" },
      { id: "CP-038", type: "expense", title: "Nhập thêm túi tote", category: "Nhập hàng", note: "Nhập bổ sung", amount: 1180000, date: dayOffset(9, 9) },
      { id: "DH-1051", type: "sale", title: "Đơn hàng #DH-1051", customer: "Mai Phương Thảo", product: "Túi tote hoa nhí", amount: 385000, date: dayOffset(10, 11), status: "completed" },
      { id: "DH-1050", type: "sale", title: "Đơn hàng #DH-1050", customer: "Phan Yến Nhi", product: "Nến thơm Gỗ thông", amount: 299000, date: dayOffset(12, 14), status: "completed" },
      { id: "CP-037", type: "expense", title: "Phí quảng cáo Facebook", category: "Quảng cáo", note: "Tháng này", amount: 450000, date: dayOffset(15, 9) },
      { id: "DH-1049", type: "sale", title: "Đơn hàng #DH-1049", customer: "Nguyễn Quỳnh Anh", product: "Set quà Mây nhỏ", amount: 650000, date: dayOffset(17, 15), status: "completed" },
      { id: "CP-036", type: "expense", title: "Vật liệu đóng gói", category: "Đóng gói", note: "Giấy kraft, ruy băng", amount: 290000, date: dayOffset(20, 10) },
      { id: "DH-1048", type: "sale", title: "Đơn hàng #DH-1048", customer: "Trần Thanh Tâm", product: "Bình giữ nhiệt Mây", amount: 520000, date: dayOffset(23, 9), status: "completed" },
      { id: "DH-1047", type: "sale", title: "Đơn hàng #DH-1047", customer: "Lưu Hoài An", product: "Túi tote hoa nhí", amount: 385000, date: dayOffset(25, 16), status: "completed" }
    ],
    products: [
      { id: "SP-01", name: "Túi tote hoa nhí", category: "Túi vải · Màu kem", price: 385000, stock: 18, emoji: "👜" },
      { id: "SP-02", name: "Bình giữ nhiệt Mây", category: "Đồ dùng · Trắng sữa", price: 520000, stock: 4, emoji: "🫖" },
      { id: "SP-03", name: "Nến thơm Gỗ thông", category: "Nến thơm · 120g", price: 299000, stock: 12, emoji: "🕯️" },
      { id: "SP-04", name: "Set quà Mây nhỏ", category: "Quà tặng · 3 món", price: 650000, stock: 7, emoji: "🎁" },
      { id: "SP-05", name: "Kẹp tóc hoa sứ", category: "Phụ kiện · Trắng", price: 89000, stock: 2, emoji: "🌼" }
    ]
  });
  let state;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    state = saved ? JSON.parse(saved) : defaultData();
    if (!Array.isArray(state.transactions) || !Array.isArray(state.products)) throw new Error("Dữ liệu lưu không hợp lệ");
  } catch (error) {
    console.error("Không thể đọc dữ liệu cửa hàng đã lưu:", error);
    state = defaultData();
  }
  function editProduct(id) {
    const product = state.products.find((item) => item.id === id);
    if (product) openModal("product", { id: product.id, type: "product", title: product.name, name: product.name, category: product.category, price: product.price, stock: product.stock, emoji: product.emoji });
  }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const save = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (error) { console.error("Không thể lưu dữ liệu cửa hàng:", error); toast("Không thể lưu dữ liệu. Kiểm tra dung lượng trình duyệt."); }
  };
  let toastTimer;
  const toast = (message) => {
    const element = $("#toast");
    element.textContent = message;
    element.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("show"), 2600);
  };
  const thisMonth = (transaction) => transaction.date.slice(0, 7) === todayISO().slice(0, 7);
  const revenueOf = (items) => items.filter((item) => item.type === "sale" && item.status !== "pending").reduce((sum, item) => sum + Number(item.amount), 0);
  const expensesOf = (items) => items.filter((item) => item.type === "expense").reduce((sum, item) => sum + Number(item.amount), 0);
  const allSorted = () => [...state.transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  const saleId = () => `DH-${Date.now().toString().slice(-6)}`;
  const expenseId = () => `CP-${Date.now().toString().slice(-6)}`;

  function setView(view) {
    const valid = ["dashboard", "orders", "expenses", "products", "reports"].includes(view) ? view : "dashboard";
    $$(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${valid}`));
    $$(".nav-link").forEach((link) => link.classList.toggle("active", link.dataset.view === valid));
    $("#breadcrumb-current").textContent = ({ dashboard: "Tổng quan", orders: "Đơn hàng", expenses: "Chi phí", products: "Sản phẩm", reports: "Báo cáo" })[valid];
    document.title = `${$("#breadcrumb-current").textContent} — Lãi Lời`;
    $("#sidebar").classList.remove("open");
    $("#sidebar-overlay").classList.remove("open");
    if (valid === "reports") renderReport();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderStats() {
    const monthSales = state.transactions.filter((item) => thisMonth(item) && item.type === "sale" && item.status !== "pending");
    const monthExpenses = state.transactions.filter((item) => thisMonth(item) && item.type === "expense");
    const revenue = revenueOf(monthSales);
    const expenses = expensesOf(monthExpenses);
    $("#stat-revenue").textContent = money(revenue);
    $("#stat-expenses").textContent = money(expenses);
    $("#stat-profit").textContent = money(revenue - expenses);
    $("#stat-orders").textContent = number(monthSales.length);
    $("#profit-margin").textContent = `Biên lợi nhuận ${revenue ? Math.round((revenue - expenses) / revenue * 100) : 0}%`;
    $("#expense-note").textContent = `${monthExpenses.length} khoản chi`;
    $("#order-count").textContent = number(monthSales.length);
    $("#orders-revenue").textContent = money(revenue);
    $("#orders-count").textContent = number(monthSales.length);
    $("#average-order").textContent = money(monthSales.length ? Math.round(revenue / monthSales.length) : 0);
    const allExpenses = state.transactions.filter((item) => item.type === "expense" && thisMonth(item));
    const largest = allExpenses.reduce((best, item) => item.amount > (best?.amount || 0) ? item : best, null);
    $("#expenses-total").textContent = money(expenses);
    $("#expenses-count").textContent = number(allExpenses.length);
    $("#expenses-largest").textContent = money(largest?.amount || 0);
    $("#largest-category").textContent = largest?.category || "Chưa có khoản chi";
    $("#products-count").textContent = number(state.products.length);
    $("#stock-count").textContent = number(state.products.reduce((sum, item) => sum + Number(item.stock), 0));
    $("#low-stock-count").textContent = number(state.products.filter((item) => Number(item.stock) < 5).length);
  }

  function renderTransactionRow(item, mode = "recent") {
    const isSale = item.type === "sale";
    const icon = isSale ? "↗" : "↙";
    const label = isSale ? "Đơn hàng" : escapeHTML(item.category || "Chi phí");
    const status = isSale ? `<span class="tag ${item.status === "pending" ? "pending" : ""}">${item.status === "pending" ? "Đang xử lý" : "Hoàn tất"}</span>` : '<span class="tag expense-tag">Đã ghi nhận</span>';
    const actions = `<div class="row-actions"><button class="row-action" type="button" data-edit="${escapeHTML(item.id)}" aria-label="Chỉnh sửa giao dịch">✎</button><button class="row-action delete" type="button" data-delete="${escapeHTML(item.id)}" aria-label="Xóa giao dịch">×</button></div>`;
    const name = `<div class="transaction-name"><span class="transaction-icon ${isSale ? "sale" : "expense"}">${icon}</span><span class="transaction-text"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(isSale ? item.customer || item.product || "Khách hàng" : item.note || "Chi phí cửa hàng")}</small></span></div>`;
    if (mode === "order") return `<tr><td>${name}</td><td>${formatDate(item.date)}</td><td>${escapeHTML(item.product || "—")}</td><td>${status}</td><td class="amount-cell">${money(item.amount)}</td><td>${actions}</td></tr>`;
    if (mode === "expense") return `<tr><td>${name}</td><td>${formatDate(item.date)}</td><td><span class="tag expense-tag">${escapeHTML(item.category || "Khác")}</span></td><td>${escapeHTML(item.note || "—")}</td><td class="amount-cell">${money(item.amount)}</td><td>${actions}</td></tr>`;
    return `<tr><td>${name}</td><td>${formatDate(item.date)}</td><td>${label}</td><td>${status}</td><td class="amount-cell">${isSale ? "+" : "−"}${money(item.amount)}</td><td>${actions}</td></tr>`;
  }
  const emptyRow = (columns, message) => `<tr><td colspan="${columns}" class="empty-state">${message}</td></tr>`;

  function renderRecent() {
    const recent = allSorted().slice(0, 5);
    $("#recent-transactions").innerHTML = recent.length ? recent.map((item) => renderTransactionRow(item)).join("") : emptyRow(6, "Chưa có giao dịch nào. Hãy thêm giao dịch đầu tiên nhé!");
  }

  function renderOrders() {
    const query = $("#order-search").value.trim().toLocaleLowerCase("vi");
    const status = $("#order-filter").value;
    const items = allSorted().filter((item) => item.type === "sale")
      .filter((item) => status === "all" || item.status === status)
      .filter((item) => `${item.title} ${item.customer || ""} ${item.product || ""}`.toLocaleLowerCase("vi").includes(query));
    $("#orders-table").innerHTML = items.length ? items.map((item) => renderTransactionRow(item, "order")).join("") : emptyRow(6, "Không tìm thấy đơn hàng phù hợp.");
    $("#orders-list-note").textContent = `${items.length} đơn hàng`;
  }
  function renderExpenses() {
    const query = $("#expense-search").value.trim().toLocaleLowerCase("vi");
    const category = $("#expense-filter").value;
    const items = allSorted().filter((item) => item.type === "expense")
      .filter((item) => category === "all" || item.category === category)
      .filter((item) => `${item.title} ${item.note || ""} ${item.category || ""}`.toLocaleLowerCase("vi").includes(query));
    $("#expenses-table").innerHTML = items.length ? items.map((item) => renderTransactionRow(item, "expense")).join("") : emptyRow(6, "Chưa có khoản chi nào phù hợp.");
  }
  function renderProducts() {
    const query = $("#product-search").value.trim().toLocaleLowerCase("vi");
    const items = state.products.filter((item) => `${item.name} ${item.category}`.toLocaleLowerCase("vi").includes(query));
    $("#product-grid").innerHTML = items.length ? items.map((item, index) => `<article class="product-card"><div class="product-art art-${index % 6}"><span class="product-emoji">${escapeHTML(item.emoji || "📦")}</span><span class="stock-badge ${item.stock < 5 ? "low" : ""}">${item.stock < 5 ? "Sắp hết hàng" : `Còn ${number(item.stock)}`}</span></div><div class="product-info"><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.category || "Sản phẩm")}</p><div class="product-card-foot"><strong>${money(item.price)}</strong><span><button type="button" class="row-action" data-edit-product="${escapeHTML(item.id)}" aria-label="Chỉnh sửa ${escapeHTML(item.name)}">✎</button><button type="button" class="row-action delete" data-delete-product="${escapeHTML(item.id)}" aria-label="Xóa sản phẩm ${escapeHTML(item.name)}">×</button></span></div></div></article>`).join("") : '<div class="empty-state">Chưa có sản phẩm phù hợp.</div>';
  }

  function renderChart() {
    const count = Number($("#chart-period").value);
    const dates = Array.from({ length: count }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (count - index - 1));
      return localISO(date);
    });
    const sales = dates.map((date) => revenueOf(state.transactions.filter((item) => item.date === date)));
    const expenses = dates.map((date) => expensesOf(state.transactions.filter((item) => item.date === date)));
    const maximum = Math.max(100000, ...sales, ...expenses);
    const rounded = Math.ceil(maximum / 4 / 50000) * 50000 || 50000;
    const x = (index) => dates.length < 2 ? 350 : index * 700 / (dates.length - 1);
    const y = (value) => 8 + (1 - value / (rounded * 4)) * 164;
    const pathFor = (values) => values.map((value, index) => `${index ? "L" : "M"}${x(index)},${y(value)}`).join(" ");
    const salePath = pathFor(sales);
    $("#revenue-chart").innerHTML = `<defs><linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#88bb91" stop-opacity=".24"/><stop offset="100%" stop-color="#88bb91" stop-opacity="0"/></linearGradient></defs><path class="chart-area" d="${salePath} L700,190 L0,190 Z"/><path class="chart-line revenue" d="${salePath}"/><path class="chart-line expense" d="${pathFor(expenses)}"/>`;
    $("#chart-y-labels").innerHTML = Array.from({ length: 5 }, (_, i) => `<span>${shortMoney(rounded * (4 - i))}</span>`).join("");
    const labelStep = count === 7 ? 1 : 5;
    $("#chart-x-labels").innerHTML = dates.filter((_, i) => i % labelStep === 0 || i === dates.length - 1).map((date) => `<span>${new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit" }).format(new Date(`${date}T12:00:00`))}</span>`).join("");
    $("#chart-total").textContent = money(sales.reduce((sum, value) => sum + value, 0));
  }

  function renderBreakdown() {
    const expenses = state.transactions.filter((item) => item.type === "expense" && thisMonth(item));
    const totals = new Map();
    expenses.forEach((item) => totals.set(item.category || "Khác", (totals.get(item.category || "Khác") || 0) + Number(item.amount)));
    const entries = [...totals.entries()].sort((a, b) => b[1] - a[1]);
    const colors = ["#83b889", "#e9b18b", "#9295b8", "#b9d1ac", "#c5c9c0"];
    const total = expensesOf(expenses);
    let start = 0;
    const stops = entries.length ? entries.map(([, value], index) => {
      const end = start + (total ? value / total * 360 : 0);
      const part = `${colors[index % colors.length]} ${start}deg ${end}deg`;
      start = end;
      return part;
    }) : ["#e8ebe6 0deg 360deg"];
    $("#expense-donut").style.background = `conic-gradient(${stops.join(",")})`;
    $("#donut-total").textContent = shortMoney(total);
    $("#category-legend").innerHTML = entries.length ? entries.slice(0, 4).map(([category, value], index) => `<div class="category-item"><i style="background:${colors[index % colors.length]}"></i><span>${escapeHTML(category)}</span><b>${total ? Math.round(value / total * 100) : 0}%</b></div>`).join("") : '<div class="empty-state">Chưa có dữ liệu chi phí.</div>';
  }

  function renderReport() {
    const mode = $("#report-period").value;
    const items = state.transactions.filter((item) => mode === "all" || thisMonth(item));
    const sales = revenueOf(items);
    const expenses = expensesOf(items);
    const profit = sales - expenses;
    $("#report-revenue").textContent = money(sales);
    $("#report-expenses").textContent = money(expenses);
    $("#report-profit").textContent = money(profit);
    $("#report-margin").textContent = `Biên lợi nhuận ${sales ? Math.round(profit / sales * 100) : 0}%`;
    $("#report-date-range").textContent = mode === "all" ? "Từ ngày bắt đầu ghi nhận" : `01/${todayISO().slice(5, 7)} – ${formatDate(todayISO())}`;
    const max = Math.max(sales, expenses, Math.max(profit, 0), 1);
    [["revenue", sales], ["expense", expenses], ["profit", Math.max(profit, 0)]].forEach(([key, value]) => {
      $(`#report-${key}-bar`).style.width = `${Math.max(value ? 2 : 0, value / max * 100)}%`;
      $(`#report-${key}-bar-label`).textContent = money(value);
    });
    const pending = state.transactions.filter((item) => item.type === "sale" && item.status === "pending").length;
    $("#report-insight").textContent = sales ? `Cửa hàng đạt biên lợi nhuận ${Math.round(profit / sales * 100)}%${pending ? `, cùng ${pending} đơn hàng đang chờ xử lý` : ""}. Doanh thu chưa bao gồm các đơn đang xử lý.` : "Chưa có doanh thu trong khoảng thời gian này. Thêm đơn hàng để bắt đầu theo dõi nhé!";
  }
  function renderAll() {
    renderStats(); renderRecent(); renderOrders(); renderExpenses(); renderProducts(); renderChart(); renderBreakdown(); renderReport();
  }

  const modal = $("#modal-backdrop");
  function setFormType(type) {
    const product = type === "product";
    $("#transaction-type").value = product ? "sale" : type;
    $("#transaction-form").elements.amount.required = !product;
    $("#transaction-form").elements.date.required = !product;
    $$(".transaction-only").forEach((field) => { field.hidden = product; });
    $$(".sale-only").forEach((field) => { field.hidden = product || type !== "sale"; });
    $$(".expense-only").forEach((field) => { field.hidden = product || type !== "expense"; });
    $$(".product-only").forEach((field) => { field.hidden = !product; });
    $(".title-label").firstChild.textContent = product ? "Tên sản phẩm" : "Tên giao dịch";
    $("#transaction-form").elements.title.placeholder = product ? "VD: Túi tote hoa nhí" : "VD: Đơn hàng #DH012";
    $("#modal-title").textContent = product ? "Thêm sản phẩm" : type === "sale" ? "Thêm đơn hàng" : "Thêm chi phí";
    $("#modal-eyebrow").textContent = product ? "QUẢN LÝ SẢN PHẨM" : type === "sale" ? "GHI NHẬN DOANH THU" : "GHI NHẬN KHOẢN CHI";
    $("#submit-label").textContent = product ? "Lưu sản phẩm" : type === "sale" ? "Lưu đơn hàng" : "Lưu chi phí";
  }
  function openModal(type = "sale", item = null) {
    const form = $("#transaction-form");
    form.reset();
    form.elements.id.value = item?.id || "";
    form.elements.productId.value = item?.type === "product" ? item.id : "";
    setFormType(item?.type || type);
    form.elements.title.value = item?.title || "";
    form.elements.amount.value = item?.amount || "";
    form.elements.date.value = item?.date || todayISO();
    if (item) {
      form.elements.customer.value = item.customer || "";
      form.elements.product.value = item.product || "";
      form.elements.category.value = item.category || "Khác";
      form.elements.note.value = item.note || "";
      form.elements.status.value = item.status || "completed";
      if (item.type === "product") {
        form.elements.title.value = item.name;
        form.elements.productCategory.value = item.category || "";
        form.elements.productPrice.value = item.price;
        form.elements.productStock.value = item.stock;
        form.elements.productEmoji.value = item.emoji || "";
      }
      $("#modal-title").textContent = item.type === "product" ? "Chỉnh sửa sản phẩm" : "Chỉnh sửa giao dịch";
      $("#submit-label").textContent = item.type === "product" ? "Lưu sản phẩm" : "Lưu thay đổi";
    }
    $("#form-error").textContent = "";
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => form.elements.title.focus(), 50);
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function submitTransaction(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const type = String(data.get("type"));
    const productId = String(data.get("productId") || "");
    if (productId || $("#modal-title").textContent.includes("sản phẩm")) {
      const price = Number(data.get("productPrice"));
      const stock = Number(data.get("productStock"));
      if (!String(data.get("title")).trim()) { $("#form-error").textContent = "Vui lòng nhập tên sản phẩm."; return; }
      if (!Number.isFinite(price) || price <= 0) { $("#form-error").textContent = "Giá bán phải là số lớn hơn 0."; return; }
      if (!Number.isInteger(stock) || stock < 0) { $("#form-error").textContent = "Tồn kho phải là số nguyên không âm."; return; }
      const product = {
        id: productId || `SP-${Date.now()}`,
        name: String(data.get("title")).trim(),
        category: String(data.get("productCategory") || "").trim() || "Sản phẩm",
        price, stock,
        emoji: String(data.get("productEmoji") || "").trim() || "📦"
      };
      const index = state.products.findIndex((item) => item.id === productId);
      if (index >= 0) state.products[index] = product;
      else state.products.push(product);
      save(); renderAll(); closeModal(); toast(index >= 0 ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm mới.");
      return;
    }
    const amount = Number(data.get("amount"));
    const date = String(data.get("date"));
    if (!Number.isFinite(amount) || amount <= 0) { $("#form-error").textContent = "Số tiền phải lớn hơn 0."; return; }
    if (!date || date > todayISO()) { $("#form-error").textContent = "Ngày giao dịch không được ở tương lai."; return; }
    const existingId = String(data.get("id") || "");
    const existing = state.transactions.find((item) => item.id === existingId);
    const transaction = {
      id: existingId || (type === "sale" ? saleId() : expenseId()),
      type, title: String(data.get("title")).trim(), amount, date,
      ...(type === "sale" ? {
        customer: String(data.get("customer") || "").trim(),
        product: String(data.get("product") || "").trim(),
        status: String(data.get("status") || "completed")
      } : {
        category: String(data.get("category") || "Khác"),
        note: String(data.get("note") || "").trim()
      })
    };
    if (!transaction.title) { $("#form-error").textContent = "Vui lòng nhập tên giao dịch."; return; }
    if (existing) state.transactions[state.transactions.indexOf(existing)] = transaction;
    else state.transactions.push(transaction);
    save(); renderAll(); closeModal(); toast(existing ? "Đã cập nhật giao dịch." : "Đã lưu giao dịch mới.");
  }

  function deleteTransaction(id) {
    const item = state.transactions.find((transaction) => transaction.id === id);
    if (!item || !window.confirm(`Xóa "${item.title}" khỏi sổ giao dịch?`)) return;
    state.transactions = state.transactions.filter((transaction) => transaction.id !== id);
    save(); renderAll(); toast("Đã xóa giao dịch.");
  }
  function deleteProduct(id) {
    const item = state.products.find((product) => product.id === id);
    if (!item || !window.confirm(`Xóa sản phẩm "${item.name}" khỏi danh sách?`)) return;
    state.products = state.products.filter((product) => product.id !== id);
    save(); renderAll(); toast("Đã xóa sản phẩm.");
  }

  function exportCSV() {
    const rows = [["Loại", "Mã giao dịch", "Tên giao dịch", "Ngày", "Khách hàng", "Sản phẩm", "Danh mục", "Trạng thái", "Ghi chú", "Số tiền"]];
    allSorted().forEach((item) => rows.push([
      item.type === "sale" ? "Đơn hàng" : "Chi phí", item.id, item.title, item.date,
      item.customer || "", item.product || "", item.category || "",
      item.status === "pending" ? "Đang xử lý" : item.type === "sale" ? "Hoàn tất" : "Đã ghi nhận",
      item.note || "", String(item.amount)
    ]));
    const csv = "\uFEFF" + rows.map((row) => row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = `lai-loi-bao-cao-${todayISO()}.csv`;
    document.body.append(link); link.click(); link.remove(); URL.revokeObjectURL(url);
    toast("Đã tải báo cáo CSV.");
  }

  function initialize() {
    $("#today-label").textContent = new Intl.DateTimeFormat("vi-VN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" }).format(new Date());
    const hashView = window.location.hash.slice(1);
    setView(hashView || "dashboard");
    renderAll();
    document.addEventListener("click", (event) => {
      const viewLink = event.target.closest("[data-view]");
      if (viewLink) { event.preventDefault(); const view = viewLink.dataset.view; if (window.location.hash !== `#${view}`) history.pushState(null, "", `#${view}`); setView(view); }
      const openButton = event.target.closest("[data-open-modal]");
      if (openButton) openModal(openButton.dataset.openModal);
      const editButton = event.target.closest("[data-edit]");
      if (editButton) { const transaction = state.transactions.find((item) => item.id === editButton.dataset.edit); if (transaction) openModal(transaction.type, transaction); }
      const editProductButton = event.target.closest("[data-edit-product]");
      if (editProductButton) editProduct(editProductButton.dataset.editProduct);
      const deleteButton = event.target.closest("[data-delete]");
      if (deleteButton) deleteTransaction(deleteButton.dataset.delete);
      const productButton = event.target.closest("[data-delete-product]");
      if (productButton) deleteProduct(productButton.dataset.deleteProduct);
    });
    window.addEventListener("hashchange", () => setView(window.location.hash.slice(1)));
    window.addEventListener("popstate", () => setView(window.location.hash.slice(1)));
    $("#top-add").addEventListener("click", () => openModal("sale"));
    $("#transaction-form").addEventListener("submit", submitTransaction);
    $("#transaction-type").addEventListener("change", (event) => setFormType(event.target.value));
    $("#modal-close").addEventListener("click", closeModal);
    $("#cancel-modal").addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });
    $("#order-search").addEventListener("input", renderOrders);
    $("#order-filter").addEventListener("change", renderOrders);
    $("#expense-search").addEventListener("input", renderExpenses);
    $("#expense-filter").addEventListener("change", renderExpenses);
    $("#product-search").addEventListener("input", renderProducts);
    $("#chart-period").addEventListener("change", renderChart);
    $("#report-period").addEventListener("change", renderReport);
    $("#export-dashboard").addEventListener("click", exportCSV);
    $("#export-report").addEventListener("click", exportCSV);
    $("#menu-toggle").addEventListener("click", () => { $("#sidebar").classList.add("open"); $("#sidebar-overlay").classList.add("open"); });
    $("#sidebar-overlay").addEventListener("click", () => { $("#sidebar").classList.remove("open"); $("#sidebar-overlay").classList.remove("open"); });
    $("#logout-button").addEventListener("click", logout);
  }

  function showLoginError(message) {
    $("#login-error").textContent = message;
  }
  function logout() {
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch (error) {
      console.error("Không thể kết thúc phiên demo:", error);
    }
    $("#app-shell").hidden = true;
    $("#auth-screen").hidden = false;
    $("#login-password").value = "";
    showLoginError("");
    if (window.location.hash) history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    $("#login-email").focus();
  }
  function initializeAuthentication() {
    $("#login-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const email = $("#login-email").value.trim().toLocaleLowerCase("vi");
      const password = $("#login-password").value;
      if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
        showLoginError("Email hoặc mật khẩu chưa đúng. Hãy dùng tài khoản demo bên dưới.");
        $("#login-password").setAttribute("aria-invalid", "true");
        return;
      }
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, DEMO_EMAIL);
      } catch (error) {
        console.error("Không thể lưu phiên demo:", error);
        showLoginError("Trình duyệt không cho phép tạo phiên. Hãy bật session storage rồi thử lại.");
        return;
      }
      $("#login-password").removeAttribute("aria-invalid");
      showLoginError("");
      $("#auth-screen").hidden = true;
      $("#app-shell").hidden = false;
      $("#profile-display-name").textContent = "Linh Nguyễn";
      $("#welcome-name").textContent = "Linh";
      setView(window.location.hash.slice(1) || "dashboard");
    });

    let authenticated = false;
    try {
      authenticated = sessionStorage.getItem(AUTH_SESSION_KEY) === DEMO_EMAIL;
    } catch (error) {
      console.error("Không thể kiểm tra phiên demo:", error);
      showLoginError("Không thể kiểm tra phiên đăng nhập trong trình duyệt này.");
    }
    $("#auth-screen").hidden = authenticated;
    $("#app-shell").hidden = !authenticated;
  }
  initialize();
  initializeAuthentication();
})();
