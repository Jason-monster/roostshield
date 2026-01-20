// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.querySelector('.contact-form form');
    
    // 响应式导航栏切换功能
    navbarToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('active');
        // 切换汉堡菜单图标样式
        this.classList.toggle('active');
    });
    
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
            // 添加电脑端特有的滚动类
            if (window.innerWidth >= 1200) {
                navbar.classList.add('scroll');
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            // 移除电脑端特有的滚动类
            if (window.innerWidth >= 1200) {
                navbar.classList.remove('scroll');
            }
        }
    });
    
    // 平滑滚动功能
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 关闭移动端导航菜单
            navbarNav.classList.remove('active');
            navbarToggle.classList.remove('active');
            
            // 获取目标区域ID
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // 计算滚动位置（考虑导航栏高度）
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            // 平滑滚动
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // 表单提交处理
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 这里可以添加表单验证逻辑
            const formData = new FormData(this);
            const isValid = true;
            
            // 简单验证示例
            formData.forEach((value, key) => {
                if (value.trim() === '') {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // 模拟表单提交
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = '发送中...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('留言发送成功！我们会尽快与您联系。');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('请填写所有必填字段！');
            }
        });
    }
    
    // 添加滚动动画效果
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加初始样式和观察
    const animatedElements = document.querySelectorAll('.about-item, .feature-item, .product-item, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // 电脑端section滚动动画
    if (window.innerWidth >= 1200) {
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        const sections = document.querySelectorAll('.about, .products, .features, .contact');
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // 数字动画效果
    function animateNumbers() {
        const numberElements = document.querySelectorAll('.stat-number');
        
        numberElements.forEach(el => {
            const target = parseInt(el.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = el.textContent.replace(/\d+/, target.toLocaleString());
                    clearInterval(timer);
                } else {
                    el.textContent = el.textContent.replace(/\d+/, Math.floor(current).toLocaleString());
                }
            }, 16);
        });
    }
    
    // 当统计数字区域进入视口时开始动画
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // 添加产品卡片悬停效果
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// 添加汉堡菜单图标动画
const navbarToggle = document.querySelector('.navbar-toggle');
if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
        this.classList.toggle('active');
    });
}

// CSS for hamburger menu animation
const style = document.createElement('style');
style.textContent = `
    .navbar-toggle {
        position: relative;
        cursor: pointer;
        z-index: 1001;
    }
    
    .navbar-toggle span {
        display: block;
        width: 25px;
        height: 3px;
        background-color: #333;
        margin: 5px 0;
        transition: all 0.3s ease;
    }
    
    .navbar-toggle.active span:nth-child(1) {
        transform: rotate(45deg);
        position: absolute;
        top: 8px;
    }
    
    .navbar-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .navbar-toggle.active span:nth-child(3) {
        transform: rotate(-45deg);
        position: absolute;
        top: 8px;
    }
`;
document.head.appendChild(style);