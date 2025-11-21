// SISTEMA DE MODALES
function showModal(options) {
    const {
        title = '¿Estás seguro?',
        message = '¿Deseas continuar con esta acción?',
        confirmText = 'Confirmar',
        cancelText = 'Cancelar',
        type = 'info', // 'info', 'warning', 'danger'
        onConfirm = () => {}
    } = options;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    
    const btnClass = type === 'danger' ? 'btn-danger' : 'btn-primary';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
            </div>
            <div class="modal-body">
                <p>${message}</p>
            </div>
            <div class="modal-actions">
                <button class="btn-secondary" onclick="closeModal(this)">
                    ${cancelText}
                </button>
                <button class="${btnClass}" onclick="confirmModal(this)">
                    ${confirmText}
                </button>
            </div>
        </div>
    `;
    
    // Store callback
    modal.dataset.callback = onConfirm.toString();
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);
    
    return modal;
}

function closeModal(button) {
    const modal = button.closest('.modal-overlay');
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}

function confirmModal(button) {
    const modal = button.closest('.modal-overlay');
    const callbackStr = modal.dataset.callback;
    
    // Execute callback
    try {
        eval(`(${callbackStr})()`);
    } catch (e) {
        console.error('Error executing callback:', e);
    }
    
    closeModal(button);
}

// SHORTCUTS
function confirmDelete(message, onConfirm) {
    return showModal({
        title: '⚠️ Eliminar',
        message: message,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger',
        onConfirm: onConfirm
    });
}

function confirmLogout(onConfirm) {
    return showModal({
        title: '🚪 Cerrar Sesión',
        message: '¿Estás seguro que deseas salir de tu cuenta?',
        confirmText: 'Cerrar Sesión',
        cancelText: 'Cancelar',
        type: 'warning',
        onConfirm: onConfirm
    });
}
