// Utility to activate sidebar items. Exported for use in React components.
// This file avoids depending on jQuery so it can be used with React.
function removeClassFromSelector(selector, className) {
    const nodes = Array.from(document.querySelectorAll(selector));
    nodes.forEach(n => n.classList.remove(className));
}

function addClassToSelector(selector, className) {
    const nodes = Array.from(document.querySelectorAll(selector));
    nodes.forEach(n => n.classList.add(className));
}

export function activateCurrentModule(currentPage) {
    if (!currentPage) currentPage = window.location.pathname.split('/').pop();

    // Remover activo de todos los elementos
    removeClassFromSelector('.nav-item', 'active');
    removeClassFromSelector('.collapse-item', 'active');
    removeClassFromSelector('.collapse', 'show');

    // Helper to mark a .collapse as shown and its parent .nav-item active
    function showCollapse(id) {
        const collapse = document.getElementById(id);
        if (collapse) collapse.classList.add('show');
        // find closest .nav-item ancestor
        const navItem = collapse ? collapse.closest('.nav-item') : null;
        if (navItem) navItem.classList.add('active');
    }

    // Helper to activate a nav-item that has a link to href
    function activateNavLink(href) {
        const link = document.querySelector(`.nav-item a[href="${href}"]`);
        if (link) link.closest('.nav-item')?.classList.add('active');
    }

    switch (currentPage) {
        case 'index.html':
            activateNavLink('index.html');
            break;
        case 'listado-estudiantes.html':
        case 'crear-estudiante.html':
            showCollapse('collapseIngreso');
            addClassToSelector(`.collapse-item[href="${currentPage}"]`, 'active');
            break;
        case 'listado-notas.html':
        case 'crear-nota.html':
            showCollapse('collapseNotas');
            addClassToSelector(`.collapse-item[href="${currentPage}"]`, 'active');
            break;
        case 'listado-historial.html':
        case 'crear-historial.html':
            showCollapse('collapseHistorial');
            addClassToSelector(`.collapse-item[href="${currentPage}"]`, 'active');
            break;
        case 'listado-familiares.html':
        case 'crear-familiar.html':
            showCollapse('collapseFamiliar');
            addClassToSelector(`.collapse-item[href="${currentPage}"]`, 'active');
            break;
        case 'listado-asistencias.html':
        case 'crear-asistencia.html':
            showCollapse('collapseAsistencias');
            addClassToSelector(`.collapse-item[href="${currentPage}"]`, 'active');
            break;
        case 'listado-bienestar.html':
        case 'crear-bienestar.html':
            showCollapse('collapseBienestar');
            addClassToSelector(`.collapse-item[href="${currentPage}"]`, 'active');
            break;
        case 'estadisticas.html':
            activateNavLink('estadisticas.html');
            break;
        case 'perfil.html':
            activateNavLink('perfil.html');
            break;
    }
}

// Note: the original jQuery-based code dynamically loaded an external HTML file into
// a wrapper. In the React app the sidebar markup is already rendered by NavBar.jsx,
// so we only export the activation function for the component to call on mount.