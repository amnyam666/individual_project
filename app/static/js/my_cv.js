// ============================================
// КОСМЕТИЧЕСКИЕ УЛУЧШЕНИЯ ДЛЯ САЙТА АРТЁМА
// (чёрно-фиолетовый неон-стиль, волейбол + CS2)
// ============================================

document.addEventListener('DOMContentLoaded', function() {

  // ---------- 1. Плавное появление элементов при скролле (fade-in) ----------
  const fadeElements = document.querySelectorAll('.card, .hobby-item, .hero-content, .hero-avatar, .contacts');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

  fadeElements.forEach(el => {
    el.classList.add('fade-in-hidden');
    observer.observe(el);
  });

  // Добавляем CSS для анимации (динамически)
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-hidden {
      opacity: 0;
      transform: translateY(25px);
      transition: opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s ease;
    }
    .fade-in-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

  // ---------- 2. Динамический год в футере ----------
  const footerParagraph = document.querySelector('.footer p:first-child');
  if (footerParagraph) {
    const currentYear = new Date().getFullYear();
    footerParagraph.innerHTML = footerParagraph.innerHTML.replace(/\d{4}/, currentYear);
  }

  // ---------- 3. Эффект для кнопок (микродвижение + неон) ----------
  const btns = document.querySelectorAll('.btn-primary, .btn-outline');
  btns.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-3px)';
      if (btn.classList.contains('btn-primary')) {
        btn.style.boxShadow = '0 0 20px #c084fc';
      } else {
        btn.style.boxShadow = '0 0 12px #a855f7';
      }
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      if (btn.classList.contains('btn-primary')) {
        btn.style.boxShadow = '0 0 8px #b77cff';
      } else {
        btn.style.boxShadow = '';
      }
    });
  });

  // ---------- 4. Плавная прокрутка к якорям (меню и кнопки) ----------
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Корректировка для sticky header
        setTimeout(() => {
          window.scrollBy(0, -20);
        }, 400);
      }
    });
  });

  // ---------- 5. Усиление неон-эффекта для карточек при наведении ----------
  const cardHoverStyle = document.createElement('style');
  cardHoverStyle.textContent = `
    .card:hover, .hobby-item:hover, .neon-card:hover {
      box-shadow: 0 0 22px rgba(168, 85, 247, 0.6);
      transition: all 0.25s ease;
    }
    .social-links a {
      transition: all 0.2s ease;
    }
  `;
  document.head.appendChild(cardHoverStyle);

  // ---------- 6. Анимация статистики (только для числовых значений) ----------
  const statNumbers = document.querySelectorAll('.stat-num');
  const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const originalText = el.innerText.trim();
        // Проверяем, начинается ли текст с числа (цифры)
        const match = originalText.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!match) {
          numberObserver.unobserve(el);
          return;
        }
        
        let targetNumber = parseFloat(match[1]);
        let suffix = match[2];   // например "+", " лет", " часов" и т.д.
        let current = 0;
        
        // Настройки скорости (плавное появление)
        const totalSteps = 60;
        const step = targetNumber / totalSteps;
        const intervalTime = 30;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
          }
          el.innerText = Math.floor(current) + suffix;
        }, intervalTime);
        
        numberObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(num => numberObserver.observe(num));

  // ---------- 7. Параллакс для аватара (3D-наклон при движении мыши) ----------
  const avatarBox = document.querySelector('.avatar-box');
  if (avatarBox) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      avatarBox.style.transform = `perspective(500px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    document.addEventListener('mouseleave', () => {
      avatarBox.style.transform = '';
    });
  }

  // ---------- 8. Изменение прозрачности шапки при скролле ----------
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 2, 10, 0.95)';
        header.style.backdropFilter = 'blur(16px)';
      } else {
        header.style.background = 'rgba(5, 2, 10, 0.85)';
        header.style.backdropFilter = 'blur(12px)';
      }
    });
  }

  // ---------- 9. Всплывающие подсказки для социальных ссылок ----------
  const socialLinks = document.querySelectorAll('.social-links a');
  socialLinks.forEach(link => {
    const platform = link.innerText.trim();
    link.setAttribute('title', platform);
  });

  // ---------- 10. Добавляем класс для body (опционально) ----------
  document.body.classList.add('js-enabled');

  // Консольное приветствие
  console.log('🎮🏐 Сайт Артёма загружен. Неон-улучшения активны!');
});