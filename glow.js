(function(){
  const projects = document.querySelectorAll('.project');

  projects.forEach(area => {
    let raf = null;

    area.addEventListener('mousemove', e => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = area.getBoundingClientRect();
        const x = ((e.clientX - rect.left)  / rect.width)  * 100;
        const y = ((e.clientY - rect.top)   / rect.height) * 100;
        area.style.setProperty('--cx', x + '%');
        area.style.setProperty('--cy', y + '%');
        raf = null;
      });
    });
  });
})();
