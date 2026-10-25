document.addEventListener("DOMContentLoaded", () => {
    console.log("Matheriel frontend engine initialized successfully [2026 Edition].");

    // Add subtle hover tracking / dynamic effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 12px 35px var(--accent-glow)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // 1. Lenis 초기화
    const lenis = new Lenis({
        duration: 1.2,      // 스크롤 지속 시간
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Math.MathPow -> Math.pow 로 수정
        direction: 'vertical',
        smooth: true,
    });

    // 2. 애니메이션 프레임 연결
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const themeToggleBtn = document.getElementById('themeToggle');
    
    // 저장된 테마 불러오기 (기본값: 다크 모드)
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
        }
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
        }
    }

    // 버튼 클릭 이벤트 리스너
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            
            if (theme === 'light') {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
            }
        });
    }

    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebarToggle && sidebar && sidebarClose && sidebarOverlay) {
        // 메뉴 버튼 클릭 시 사이드바 열기
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('open');
        });

        // 닫기 함수
        const closeSidebar = () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('open');
        };

        // 닫기 버튼 또는 외부 배경 클릭 시 사이드바 닫기
        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
});
