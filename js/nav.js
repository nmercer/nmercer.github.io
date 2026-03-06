// Keep the fixed bottom nav visible when the user pinch-zooms on mobile.
// The Visual Viewport API tells us where the visible area actually is,
// so we translate the nav to stay at the bottom of what the user sees.
(function () {
  const vv = window.visualViewport;
  if (!vv) return;

  const nav = document.querySelector('.bottom-nav');
  if (!nav) return;

  function reposition() {
    const offset = window.innerHeight - vv.height - vv.offsetTop;
    nav.style.transform = 'translateY(' + (-offset) + 'px)';
    nav.style.left = vv.offsetLeft + 'px';
    nav.style.width = vv.width + 'px';
  }

  vv.addEventListener('resize', reposition);
  vv.addEventListener('scroll', reposition);
}());
