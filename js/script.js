tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Poppins', 'sans-serif'],
        },
        colors: {
          primary: {
            50: '#eef5ff',
            100: '#d8e7ff',
            200: '#b9d3ff',
            300: '#8ab5ff',
            400: '#548bff',
            500: '#2e65ff',
            600: '#1b43f5',
            700: '#1532e1',
            800: '#182bb6',
            900: '#1a2a90',
          },
          accent: '#0fd9b6',
        },
        animation: {
          'fade-in': 'fadeIn 0.6s ease-in-out',
          'slide-up': 'slideUp 0.6s ease-out',
          'float': 'float 3s ease-in-out infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        }
      }
    }
  }

// Dark Mode Toggle
    const darkToggle = document.getElementById('darkToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    }
    
    darkToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    document.querySelectorAll('#mobileMenu a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
      } else {
        navbar.classList.remove('shadow-lg');
      }
    });

    // Back to top button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
      } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simulate form submission
      formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
      formMessage.classList.remove('hidden', 'text-red-500');
      formMessage.classList.add('text-green-500');
      
      contactForm.reset();
      
      setTimeout(() => {
        formMessage.classList.add('hidden');
      }, 5000);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section > div').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

(function(){document.addEventListener("click",function(e){var a=e.target.closest("[data-product-id]");if(!a)return;e.preventDefault();var pid=a.getAttribute("data-product-id");if(pid)parent.postMessage({type:"ecto-artifact-link-click",productId:pid},"*")})})();
// Contact form with DB
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMessage');
  if(form){
    form.addEventListener('submit', async e=>{
      e.preventDefault();
      const data={name:document.getElementById('name').value,email:document.getElementById('email').value,subject:document.getElementById('subject').value,message:document.getElementById('message').value,date:new Date().toISOString()};
      try{await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); msg.textContent='Message saved to database!';}catch{const subs=JSON.parse(localStorage.getItem('contactSubmissions')||'[]'); subs.push(data); localStorage.setItem('contactSubmissions',JSON.stringify(subs)); msg.textContent='Saved locally.';}
      msg.classList.remove('hidden'); msg.style.color='green'; e.target.reset();
    });
  }
});
