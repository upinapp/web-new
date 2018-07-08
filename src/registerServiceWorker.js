export default function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/sw.js`).then(() => {
        // eslint-disable-next-line no-console
        console.log('SW registered');
      }).catch(registrationError => {
        console.error('SW registration failed: ', registrationError);
      });
    });
  }
}
