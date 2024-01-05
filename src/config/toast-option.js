export const toastOption = (darkMode) => {
  if (darkMode) {
    return {
      // Define default options
      className: '',
      duration: 5000,
      style: {
        background: '#181818',
        borderRadius: '10px',
        color: 'var(--cl-text-primary)',
      }
    }
  }
  return {
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#fff',
      borderRadius: '10px',
      color: 'var(--cl-text-primary)',
    }
  }
}
