// ─── SUPABASE ───
// Khởi tạo client với project URL và anon key
// Đặt tên là `db` để tránh trùng với global `supabase` do CDN inject
const db = window.supabase.createClient(
  'https://hfydvcmkahcqokobublb.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmeWR2Y21rYWhjcW9rb2J1YmxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxOTUwNTMsImV4cCI6MjA5Mjc3MTA1M30.rM8YugyIFyiT2Vj3DhZwesgFOSX5GQB-j4brhE_UqDU'
);

// ─── LEAD MODAL ───
const ZALO_URL = 'https://zalo.me/0937253577';

// Mở modal và focus vào ô họ tên
function openLeadModal() {
  document.getElementById('lead-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('lead-name').focus(), 120);
}

// Đóng modal và khôi phục scroll
function closeLeadModal() {
  document.getElementById('lead-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Xử lý submit form: validate → lưu Supabase → redirect Zalo
async function submitLead(e) {
  e.preventDefault();

  const name  = document.getElementById('lead-name').value.trim();
  const phone = document.getElementById('lead-phone').value.trim();
  const email = document.getElementById('lead-email').value.trim();
  const btn   = document.querySelector('.lead-modal__submit');

  // ── Validation ──
  let valid = true;

  if (name.length < 2) {
    document.getElementById('err-name').textContent = 'Vui lòng nhập họ và tên';
    valid = false;
  } else {
    document.getElementById('err-name').textContent = '';
  }

  // Số điện thoại VN: 10 chữ số, bắt đầu bằng 0
  if (!/^0\d{9}$/.test(phone.replace(/[\s\-\.]/g, ''))) {
    document.getElementById('err-phone').textContent = 'Số điện thoại chưa đúng (VD: 0912 345 678)';
    valid = false;
  } else {
    document.getElementById('err-phone').textContent = '';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('err-email').textContent = 'Email chưa đúng định dạng';
    valid = false;
  } else {
    document.getElementById('err-email').textContent = '';
  }

  if (!valid) return;

  // ── Lưu vào Supabase ──
  btn.disabled = true;
  btn.textContent = 'Đang gửi...';

  const { error } = await db
    .from('leads')
    .insert([{ name, phone, email }]);

  if (error) {
    // Hiển thị lỗi và khôi phục nút
    btn.disabled = false;
    btn.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="48" height="48" rx="12" fill="white" fill-opacity="0.15"/>
        <path d="M24 6C14.06 6 6 13.39 6 22.5c0 5.15 2.67 9.73 6.84 12.71L11.5 42l6.97-3.64C20.41 38.77 22.17 39 24 39c9.94 0 18-7.39 18-16.5S33.94 6 24 6z" fill="white"/>
      </svg>
      Nhận tư vấn qua Zalo`;
    document.getElementById('err-phone').textContent = 'Có lỗi xảy ra, vui lòng thử lại.';
    console.error('Supabase error:', error);
    return;
  }

  // ── Thành công: redirect sang Zalo ──
  closeLeadModal();
  window.location.href = ZALO_URL;
}

// Đóng modal khi nhấn phím Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLeadModal();
});

// ─── COUNTDOWN TIMER ───
function startCountdown() {
  const stored = localStorage.getItem('vc_deadline');
  let deadline;
  if (stored) {
    deadline = parseInt(stored);
  } else {
    deadline = Date.now() + 23 * 3600 * 1000 + 47 * 60 * 1000 + 59 * 1000;
    localStorage.setItem('vc_deadline', deadline);
  }

  function update() {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    document.getElementById('hours').textContent = String(h).padStart(2, '0');
    document.getElementById('minutes').textContent = String(m).padStart(2, '0');
    document.getElementById('seconds').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}
startCountdown();

// ─── FAQ TOGGLE ───
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .benefit-card, .week-card, .testi-card, .pain-item, .step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s';
  observer.observe(el);
});

// ─── ACTIVE NAV ───
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});
