/* ===================================================================
   AKSHARA PORTFOLIO — INTERACTIONS
=================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PAGE LOAD ANIMATION ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('done'), 500);
  });
  setTimeout(() => loader.classList.add('done'), 2200);

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouch) {
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });
    function loop() {
      curX += (mouseX - curX) * 0.16;
      curY += (mouseY - curY) * 0.16;
      cursor.style.left = curX + 'px';
      cursor.style.top = curY + 'px';
      requestAnimationFrame(loop);
    }
    loop();

    document.querySelectorAll('a, button, .skill-word, .strength-item, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
    document.querySelectorAll('.skill-word').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover-word'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover-word'));
    });
  }

  /* ---------- MOBILE NAV TOGGLE ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const rail = document.getElementById('rail');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    rail.classList.toggle('open');
  });
  rail.querySelectorAll('.rail-link').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('open');
      rail.classList.remove('open');
    });
  });

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  const railLinks = document.querySelectorAll('.rail-link');
  const navSections = ['about', 'skills', 'work', 'resume', 'contact']
    .map(id => document.getElementById(id)).filter(Boolean);

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        railLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  navSections.forEach(s => navObserver.observe(s));

  /* ---------- HERO PARALLAX ---------- */
  const heroName = document.getElementById('heroName');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroName.style.transform = `translateY(${y * 0.25}px)`;
      heroName.style.opacity = String(1 - y / (window.innerHeight * 0.8));
    }
  }, { passive: true });

  /* ---------- SCROLL REVEAL ---------- */
  const revealTargets = document.querySelectorAll(
    '.about-headline, .about-copy, .skill-group, .timeline-item, .strength-item, .resume-panel, .contact-headline, .contact-email, .contact-form'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        if (entry.target.classList.contains('timeline-item')) entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- TIMELINE DOT ACTIVATION ---------- */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in');
    });
  }, { threshold: 0.5 });
  timelineItems.forEach(el => timelineObserver.observe(el));

  /* ---------- HORIZONTAL PROJECT SCROLL (PINNED) ---------- */
  const workPin = document.querySelector('.work-pin');
  const workTrack = document.getElementById('workTrack');
  const workIndexNums = document.querySelectorAll('.work-index-num');
  let isDesktopScroll = window.innerWidth > 860;

  function updateWorkScroll() {
    if (!isDesktopScroll || !workPin || !workTrack) return;
    const rect = workPin.getBoundingClientRect();
    const total = workPin.offsetHeight - window.innerHeight;
    let progress = -rect.top / total;
    progress = Math.max(0, Math.min(1, progress));
    const maxTranslate = workTrack.scrollWidth - window.innerWidth;
    workTrack.style.transform = `translateX(-${progress * maxTranslate}px)`;

    const idx = Math.min(2, Math.floor(progress * 3));
    workIndexNums.forEach((n, i) => n.classList.toggle('active', i === idx));
  }
  window.addEventListener('scroll', updateWorkScroll, { passive: true });
  window.addEventListener('resize', () => {
    isDesktopScroll = window.innerWidth > 860;
    updateWorkScroll();
  });
  updateWorkScroll();

  /* ---------- AI NODES VISUAL ---------- */
  const aiLinesGroup = document.getElementById('aiNodeLines');
  const aiDotsGroup = document.getElementById('aiNodeDots');
  if (aiLinesGroup && aiDotsGroup) {
    const points = [];
    const cols = 4, rows = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({
          x: 40 + c * (320 / (cols - 1)),
          y: 40 + r * (320 / (rows - 1))
        });
      }
    }
    points.forEach((p, i) => {
      if (Math.random() > 0.55 && i + 1 < points.length) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        const target = points[(i + cols) % points.length];
        line.setAttribute('x1', p.x); line.setAttribute('y1', p.y);
        line.setAttribute('x2', target.x); line.setAttribute('y2', target.y);
        line.setAttribute('stroke', '#2B4EFF');
        line.setAttribute('stroke-opacity', '0.25');
        line.setAttribute('stroke-width', '1');
        aiLinesGroup.appendChild(line);
      }
    });
    points.forEach((p, i) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', p.x); circle.setAttribute('cy', p.y);
      circle.setAttribute('r', i % 3 === 0 ? 6 : 3.5);
      circle.setAttribute('fill', i % 3 === 0 ? '#2B4EFF' : '#16140F');
      circle.style.animation = `nodePulse 2.4s ease-in-out ${i * 0.12}s infinite`;
      aiDotsGroup.appendChild(circle);
    });
    const style = document.createElement('style');
    style.textContent = `@keyframes nodePulse{0%,100%{opacity:0.5;}50%{opacity:1;}}`;
    document.head.appendChild(style);
  }

  /* ---------- INTEREST WORD CYCLE ---------- */
  const interestWords = document.querySelectorAll('.interest-word');
  let interestIdx = 0;
  setInterval(() => {
    interestWords[interestIdx].classList.remove('active');
    interestIdx = (interestIdx + 1) % interestWords.length;
    interestWords[interestIdx].classList.add('active');
  }, 2200);

  /* ---------- PROJECT EXPLORE MODAL ---------- */
  const projectData = {
    aqua: {
      tag: 'Academic Project',
      title: 'AquaPulse — Smart Water Bottle',
      desc: [
        'AquaPulse is a smart water bottle concept designed for university students, developed as part of an academic project.',
        'The work covered the full product-thinking process: a product brief, defining target users, outlining features and benefits, and shaping a unique selling proposition.'
      ],
      list: ['Product brief & target users', 'Features & benefits', 'Unique selling proposition', 'Product visualization', 'Interactive landing page — HTML, CSS, JavaScript']
    },
    web: {
      tag: 'Academic Project',
      title: 'Interactive Web Projects',
      desc: [
        'A collection of academic explorations into modern web interfaces, focused on building attractive layouts and interactive elements.',
        'The emphasis throughout was on creating engaging, user-friendly digital experiences rather than just static pages.'
      ],
      list: ['Modern layout composition', 'Animation & motion', 'Interactive UI elements', 'User-friendly digital experiences']
    },
    ai: {
      tag: 'Academic Project',
      title: 'AI & Emerging Technology',
      desc: [
        'Academic work exploring AI agents, chatbots, and how AI systems make decisions.',
        'This included hands-on practice with prompt engineering, plus thinking through human verification approaches for important AI actions — making sure a person stays in the loop where it matters.'
      ],
      list: ['AI agents & chatbots', 'AI decision-making', 'Prompt engineering', 'Human verification for AI actions']
    }
  };

  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('[data-explore]').forEach(el => {
    el.addEventListener('click', () => {
      const key = el.getAttribute('data-explore');
      const data = projectData[key];
      if (!data) return;
      modalBody.innerHTML = `
        <span class="m-tag">${data.tag}</span>
        <h3>${data.title}</h3>
        ${data.desc.map(p => `<p>${p}</p>`).join('')}
        <ul>${data.list.map(li => `<li>${li}</li>`).join('')}</ul>
      `;
      projectModal.classList.add('open');
    });
  });
  modalClose.addEventListener('click', () => projectModal.classList.remove('open'));
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) projectModal.classList.remove('open');
  });

  /* ---------- RESUME MODAL ---------- */
  const resumeModal = document.getElementById('resumeModal');
  const resumeModalClose = document.getElementById('resumeModalClose');
  const openResumeBtn = document.getElementById('openResumeBtn');
  const resumeFrame = document.getElementById('resumeFrame');
  const RESUME_PATH = 'assets/akshara-resume.pdf';

  openResumeBtn.addEventListener('click', () => {
    resumeFrame.src = RESUME_PATH;
    resumeModal.classList.add('open');
  });
  resumeModalClose.addEventListener('click', () => {
    resumeModal.classList.remove('open');
    resumeFrame.src = '';
  });
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('open');
      resumeFrame.src = '';
    }
  });

  /* close modals on escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      projectModal.classList.remove('open');
      resumeModal.classList.remove('open');
      resumeFrame.src = '';
    }
  });

  /* ---------- CONTACT FORM ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in every field before sending.';
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:akshara.u-29@scds.saiuniversity.edu.in?subject=${subject}&body=${body}`;
    formStatus.textContent = 'Opening your email app to send this message...';
  });

  /* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
