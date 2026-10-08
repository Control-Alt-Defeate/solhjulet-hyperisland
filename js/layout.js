const siteRoot = new URL('..', document.currentScript.src);

const pages = [
    { label: 'Home', footerLabel: 'Home', path: 'index.html' },
    { label: 'For Residents', footerLabel: 'Residents', path: 'pages/for_residents.html' },
    { label: 'Facilities and Services', footerLabel: 'Facilities and Services', path: 'pages/facilities_services.html' },
    { label: 'News and Updates', footerLabel: 'News and Updates', path: 'pages/news_updates.html' },
    { label: 'About', footerLabel: 'About Us', path: 'pages/about.html' },
];

function urlFor(path) {
    return new URL(path, siteRoot).href;
}

function normalisePath(pathname) {
    
    return pathname.replace(/\/index\.html$/, '/');
}

function isCurrentPage(path) {
    const pagePath = normalisePath(new URL(path, siteRoot).pathname);

    return pagePath === normalisePath(window.location.pathname);
}

function currentAttribute(path) {
    return isCurrentPage(path) ? ' aria-current="page"' : '';
}

function navTemplate(variant) {
    const navClass = variant === 'home' ? 'navbar-homepage' : 'navbar-other-pages';

    const links = pages
        .map((page) => `
                <li>
                    <a href="${urlFor(page.path)}"${currentAttribute(page.path)}>
                        ${page.label}
                    </a>
                </li>`)
        .join('');

    const nav = `
        <nav class="${navClass}" aria-label="Main navigation">

            <div class="nav-logo-div">
                <a href="${urlFor('index.html')}" aria-label="Solhjulet home">
                    <img
                        id="nav-img-logo"
                        src="${urlFor('assets/logo.png')}"
                        alt="Solhjulet logo"
                    >
                </a>

                <span id="nav-logo-text">SOLHJULET</span>
            </div>

            <input
                type="checkbox"
                id="menu-toggle"
                aria-label="Toggle navigation menu"
                aria-controls="nav-menu"
            >

            <label
                for="menu-toggle"
                class="hamburger"
                aria-label="Toggle navigation menu"
            >
                <span aria-hidden="true">☰</span>
                <span aria-hidden="true">✕</span>
            </label>

            <div class="nav-menu" id="nav-menu">

                <ul class="nav-links">${links}
                </ul>

                <div id="nav-login-button">
                    <button id="navbar-login-button" type="button">
                        LOGIN
                    </button>
                </div>

            </div>

        </nav>`;

    return variant === 'home' ? nav : `<header>${nav}</header>`;
}

function footerTemplate() {
    const links = pages
        .map((page) => `
                <a href="${urlFor(page.path)}">${page.footerLabel}</a>`)
        .join('');

    return `
    <footer class="footer">

        <div class="footer-container">

            <div class="footer-column copyright">
                <p>Copyright Solhjulet</p>
                <p>All rights reserved.</p>
            </div>

            <div class="footer-column">
                <h2>Home</h2>${links}
            </div>

            <div class="footer-column">
                <h2>Support</h2>
                <a href="#">Help Center</a>
                <a href="#">Terms of Service</a>
                <a href="#">Legal</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Status</a>
            </div>

            <div class="footer-column student-project">
                <p>
                    This project is made in the student
                    context of Hyper Island.
                </p>
            </div>

        </div>

    </footer>`;
}

document.querySelectorAll('[data-site-nav]').forEach((placeholder) => {
    placeholder.outerHTML = navTemplate(placeholder.dataset.siteNav);
});

document.querySelectorAll('[data-site-footer]').forEach((placeholder) => {
    placeholder.outerHTML = footerTemplate();
});

const main = document.querySelector('main');

if (main) {
    main.id ||= 'main-content';
    main.tabIndex = -1;

    document.body.insertAdjacentHTML(
        'afterbegin',
        `<a href="#${main.id}" class="skip-link">Skip to main content</a>`
    );
}
