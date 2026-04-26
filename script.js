document.addEventListener('DOMContentLoaded', () => {

    /* ═════════════════════════════════════════
       1. SPLASH SCREEN
       Menghilang setelah 1.8 detik dengan fade-out
    ═════════════════════════════════════════ */
    const splash = document.getElementById('splash');

    if (splash) {
        setTimeout(() => {
            splash.classList.add('hide');
            // Hapus dari DOM setelah transisi selesai
            setTimeout(() => splash.remove(), 700);
        }, 1800);
    }

    /* ═════════════════════════════════════════
       2. HAMBURGER MENU (mobile)
    ═════════════════════════════════════════ */
    const hamburger = document.getElementById('hamburger');
    const navMenu   = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('active');
            const icon   = hamburger.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });
    }

    /* ═════════════════════════════════════════
       3. SMOOTH SCROLL + TUTUP MOBILE MENU
    ═════════════════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navMenu.classList.remove('active');
                const icon = hamburger?.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });

    /* ═════════════════════════════════════════
       4. NAVBAR SCROLL SHADOW
    ═════════════════════════════════════════ */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    /* ═════════════════════════════════════════
       5. BACK TO TOP BUTTON
    ═════════════════════════════════════════ */
    const bttBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        bttBtn?.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });

    bttBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ═════════════════════════════════════════
       6. TAB SYSTEM — MENU UTAMA ↔ SUB MENU
       (Administrasi & Akademik)
    ═════════════════════════════════════════ */
    const mainMenu = document.getElementById('main-menu');

    function showSubMenu(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        // Sembunyikan main menu
        mainMenu.classList.add('hidden');

        // Tampilkan sub menu + reset animasi
        target.classList.remove('hidden');
        target.style.animation = 'none';
        void target.offsetWidth; // force reflow
        target.style.animation = '';

        // Scroll ke section services
        setTimeout(() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
    }

    function showMainMenu() {
        // Tutup semua sub menu
        document.querySelectorAll('.sub-menu').forEach(sm => sm.classList.add('hidden'));
        // Tutup semua level1 accordion
        closeAllLevel1();

        mainMenu.classList.remove('hidden');
        mainMenu.style.animation = 'none';
        void mainMenu.offsetWidth;
        mainMenu.style.animation = '';

        setTimeout(() => {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
    }

    // Klik tombol "Lihat Layanan"
    document.querySelectorAll('.menu-btn').forEach(btn => {
        btn.addEventListener('click', () => showSubMenu(btn.getAttribute('data-target')));
    });

    // Klik tombol "Kembali"
    document.querySelectorAll('.btn-back').forEach(btn => {
        btn.addEventListener('click', showMainMenu);
    });

    /* ═════════════════════════════════════════
       7. NESTED ACCORDION — Level 1 (Banin/Banat)
       Toggle list layanan di dalam sub-admin
    ═════════════════════════════════════════ */
    function closeAllLevel1() {
        document.querySelectorAll('.level1-card').forEach(card => {
            card.classList.remove('open');
            const list = card.querySelector('.level2-list');
            if (list) list.classList.add('hidden');
        });
    }

    document.querySelectorAll('.level1-card-inner').forEach(inner => {
        inner.addEventListener('click', () => {
            const card   = inner.closest('.level1-card');
            const list   = card.querySelector('.level2-list');
            const isOpen = card.classList.contains('open');

            // Tutup yang lain
            closeAllLevel1();

            if (!isOpen) {
                card.classList.add('open');
                list.classList.remove('hidden');
                // Reset animasi
                list.style.animation = 'none';
                void list.offsetWidth;
                list.style.animation = '';
            }
        });
    });

    /* ═════════════════════════════════════════
       8. SEARCH BAR
    ═════════════════════════════════════════ */
    const searchData = [
        // Administrasi Banin
        { icon: '📖', title: 'Pengurusan Tadarruj Dirosi', category: 'Administrasi · Banin', target: 'sub-admin', href: 'tadarruj.html' },
        { icon: '📝', title: 'Pengurusan Mafsul',           category: 'Administrasi · Banin', target: 'sub-admin', href: 'mafsul.html' },
        { icon: '🪪', title: 'Pembuatan Kerneh',             category: 'Administrasi · Banin', target: 'sub-admin', href: 'kerneh.html' },
        { icon: '📅', title: 'Surat Agazah',                 category: 'Administrasi · Banin', target: 'sub-admin', href: 'agazah.html' },
        { icon: '✅', title: 'Legalisir Tadarruj',           category: 'Administrasi · Banin', target: 'sub-admin', href: 'legalisir.html' },
        { icon: '💻', title: 'Tadarruj Elektronik',          category: 'Administrasi · Banin', target: 'sub-admin', href: 'telektronik.html' },
        // Akademik
        { icon: '📚', title: 'Muqorror Mahad',               category: 'Informasi Akademik',   target: 'sub-akademik', href: 'muqorror.html' },
        { icon: '🗓️', title: 'Kalender Akademik',            category: 'Informasi Akademik',   target: 'sub-akademik', href: 'jadwal.html' },
        { icon: '🎥', title: 'Rekaman Mudzakarah',           category: 'Informasi Akademik',   target: 'sub-akademik', href: 'rekaman.html' },
        // Umum
        { icon: '📢', title: 'Pengumuman',                   category: 'Info',                  target: 'pengumuman-link', href: null },
        { icon: '📞', title: 'Hubungi Kami',                  category: 'Kontak',                target: 'kontak-link',    href: null },
    ];

    const searchInput   = document.getElementById('searchInput');
    const searchClear   = document.getElementById('searchClear');
    const searchResults = document.getElementById('searchResults');

    function escRe(str) { return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

    function highlight(text, q) {
        if (!q) return text;
        return text.replace(new RegExp(`(${escRe(q)})`, 'gi'), '<mark>$1</mark>');
    }

    function renderSearch(q) {
        if (!q || q.length < 2) { searchResults.classList.remove('visible'); return; }

        const filtered = searchData.filter(d =>
            d.title.toLowerCase().includes(q.toLowerCase()) ||
            d.category.toLowerCase().includes(q.toLowerCase())
        );

        if (!filtered.length) {
            searchResults.innerHTML = `<p class="search-no-result">Tidak ada hasil untuk "<strong>${q}</strong>"</p>`;
        } else {
            searchResults.innerHTML = filtered.map(d => `
                <button class="search-result-item" data-target="${d.target}" data-href="${d.href || ''}">
                    <span class="ri">${d.icon}</span>
                    <div>
                        <strong>${highlight(d.title, q)}</strong>
                        <span>${d.category}</span>
                    </div>
                </button>
            `).join('');

            searchResults.querySelectorAll('.search-result-item').forEach(btn => {
                btn.addEventListener('click', () => {
                    const t    = btn.getAttribute('data-target');
                    const href = btn.getAttribute('data-href');

                    if (href && href !== 'null') {
                        window.location.href = href;
                    } else if (t === 'pengumuman-link') {
                        document.getElementById('pengumuman')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (t === 'kontak-link') {
                        document.getElementById('kontak')?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                        setTimeout(() => showSubMenu(t), 400);
                    }

                    searchResults.classList.remove('visible');
                    if (searchInput) searchInput.value = '';
                    searchClear?.classList.remove('visible');
                });
            });
        }

        searchResults.classList.add('visible');
    }

    searchInput?.addEventListener('input', () => {
        const v = searchInput.value.trim();
        searchClear?.classList.toggle('visible', v.length > 0);
        renderSearch(v);
    });

    searchInput?.addEventListener('focus', () => {
        if (searchInput.value.trim().length >= 2) searchResults?.classList.add('visible');
    });

    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.classList.remove('visible');
        searchResults?.classList.remove('visible');
        searchInput?.focus();
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.search-wrapper')) searchResults?.classList.remove('visible');
    });

    /* ═════════════════════════════════════════
       9. SCROLL REVEAL
    ═════════════════════════════════════════ */
    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                revealObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

});
