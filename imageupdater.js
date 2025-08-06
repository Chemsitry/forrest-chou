<!--
<script>
  fetch('https://api.microlink.io/?url=https://ecdwebsite.vercel.app&screenshot=true&screenshot.viewport.width=600&screenshot.viewport.height=600&screenshot.fullPage=false')
  .then(res => res.json())
  .then(data => {
    const theproject = document.getElementById('ecdwebsite');
    theproject.innerHTML = `
      <a class = "project" id = "ecdwebsite" href = "https://ecdwebsite.vercel.app/" target = _blank>
        <div class = "projectimagediv">
          <img class = "projectimage"
            src = ${data.data.screenshot.url}
            alt = "phi logo"
          >
        </div>
        <div class = "projecttext">
        <p class = "projecttitle">ECD Website</p>
        <p class = "projectdescription">I coded this website as a project for my Early Childhood Development class.</p>
        </div>
      </a>`;
  });

  console.log("Hi, I got through the script");
</script>
-->
