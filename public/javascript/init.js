const navList = {
    'Home' : '/',
    'Admin' : '/admin',
    'Contact' : '/contact',
    'About' : '/about',
    'Login' : '/login'
};

let c = getCookie('uid');
let u = getCookie('u');
if (c) {
    delete navList['Login'];
    navList['Exit ('+u+')'] = '/login';
}

document.addEventListener("DOMContentLoaded", () => {

    const ul = document.createElement('ul');
    ul.classList.add('navbar-nav');

    const path = window.location.pathname;

    for(let k in navList) {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        const a = document.createElement('a');
        a.classList.add('nav-link');
        if (path === navList[k]) a.classList.add('active');
        a.href = navList[k];
        a.innerHTML = k;
        li.append(a);
        ul.append(li);
    }

    const div2 = document.createElement('div');
    div2.id = 'navbarNav';
    div2.classList.add('collapse', 'navbar-collapse');

    div2.append(ul);

    const span = document.createElement('span');
    span.classList.add('navbar-toggler-icon');

    const button = document.createElement('button');
    button.classList.add('navbar-toggler');
    button.type = 'button';
    button.setAttribute('data-bs-toggle', 'collapse');
    button.setAttribute('data-bs-target', '#navbarNav');
    button.setAttribute('aria-control', 'navbarNav');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label','Toggle navigation');

    button.append(span);

    const a2 = document.createElement('a');
    a2.href = '#';
    a2.innerHTML = 'IG';
    a2.classList.add('navbar-brand');

    let div3 = document.createElement('div');
    div3.classList.add('container-fluid');

    div3.append(a2);
    div3.append(button);
    div3.append(div2)
    const nav = document.createElement('nav');
    nav.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light', 'mb-3');

    nav.append(div3)

    document.querySelector('.navigation').append(nav);
});

document.addEventListener("DOMContentLoaded", () => {
   
        const footer = document.createElement('footer');
        footer.classList.add('row','row-cols-1', 'row-cols-sm-2', 'row-cols-md-5', 'py-5', 'my-5',  'border-to');

        footer.innerHTML = (`
        <div class="col mb-3">
        <a href="/" class="d-flex align-items-center mb-3 link-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap"></use>
            </svg>
        </a>
        <p class="text-muted">ITGID © 2023</p>
        </div>
        <div class="col mb-3"></div>
        `);

        for (let i = 0; i < 3; i++) {
            const div = document.createElement('div');
            div.classList.add('col', 'mb-3');
        
            const h5 = document.createElement('h5');
            h5.textContent = 'Section';
        
            const ul = document.createElement('ul');
            ul.classList.add('nav', 'flex-column');
    
            for(let k in navList) {
                const li = document.createElement('li');
                li.classList.add('nav-item', 'mb-2');
                const a = document.createElement('a');
                a.classList.add('nav-link','p-0','text-muted');
                a.href = navList[k];
                a.innerHTML = k;
                li.append(a);
                ul.append(li);
            }
    

            div.append(h5);
            div.append(ul);
            footer.append(div);
        }
        document.querySelector('.footer-div').append(footer);
    });

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


