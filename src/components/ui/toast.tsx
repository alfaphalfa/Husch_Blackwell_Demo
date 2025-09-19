'use client'

let toastCounter = 0;

export function showToast(message: string, type: 'info' | 'error' | 'success' = 'info') {
  const id = `toast-${++toastCounter}`;

  // Create toast element
  const toast = document.createElement('div');
  toast.id = id;

  // Style based on type
  const baseClasses = 'fixed right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform';
  const typeClasses = {
    info: 'bg-blue-600 text-white',
    error: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white'
  };

  toast.className = `${baseClasses} ${typeClasses[type]}`;
  toast.style.bottom = `${document.querySelectorAll('[id^="toast-"]').length * 80 + 20}px`;
  toast.textContent = message;

  // Add to DOM
  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(0)';
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Export a simpler API
export const toast = {
  info: (msg: string) => showToast(msg, 'info'),
  error: (msg: string) => showToast(msg, 'error'),
  success: (msg: string) => showToast(msg, 'success')
};