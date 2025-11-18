// 移动端菜单交互
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // 切换图标（菜单↔关闭）
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});
// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        // 关闭移动端菜单（如果打开）
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        }
        // 滚动到目标区域
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 减去导航栏高度，避免遮挡
                behavior: 'smooth'
            });
        }
    });
});
// 技能进度条动画
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.bg-primary.h-3.rounded-full');
let animated = false;

// 监听滚动事件
window.addEventListener('scroll', () => {
    if (!animated) {
        const sectionTop = skillSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        // 当技能区进入视口时，触发动画
        if (sectionTop < windowHeight * 0.8) {
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                // 用setTimeout触发过渡动画
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = width;
                }, 100);
            });
            animated = true; // 只触发一次
        }
    }
});
// 联系表单验证
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;

        // 验证姓名
        if (name === '') {
            alert('请输入您的姓名');
            isValid = false;
        }
        // 验证邮箱格式
        const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(email)) {
            alert('请输入有效的邮箱地址');
            isValid = false;
        }
        // 验证留言
        if (message === '') {
            alert('请输入留言内容');
            isValid = false;
        }
        // 验证通过，可对接邮件接口（如Formspree）
        if (isValid) {
            alert('留言提交成功！我会尽快回复您~');
            contactForm.reset();
        }
    });
}