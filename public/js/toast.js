/**
 * Toast Notification System
 * Usage: showToast('Message', 'success'|'error'|'warning'|'info')
 */

function showToast(message, type = 'info', duration = 5000) {
    const container = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Icons for different types
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    const colors = {
        success: 'text-green-500',
        error: 'text-red-500',
        warning: 'text-yellow-500',
        info: 'text-blue-500'
    };
    
    toast.innerHTML = `
        <div class="flex items-start">
            <i class="fas ${icons[type]} ${colors[type]} text-xl mr-3 mt-0.5"></i>
            <div class="flex-1">
                <p class="font-medium text-gray-900 dark:text-white">${message}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to container
    container.appendChild(toast);
    
    // Auto remove after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Auto-show flash messages as toasts
document.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(msg => {
        const type = msg.dataset.type || 'info';
        const text = msg.textContent.trim();
        if (text) {
            showToast(text, type);
            msg.remove();
        }
    });
});
