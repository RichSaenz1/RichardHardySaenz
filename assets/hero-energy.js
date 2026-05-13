(function(){
  function createCanvas(className){
    var canvas = document.createElement('canvas');
    canvas.className = className || '';
    return canvas;
  }

  function initPageParticles(options){
    options = options || {};
    var canvas = options.canvas || document.querySelector(options.selector || '#bg-canvas');
    if (!canvas) {
      canvas = createCanvas('tfs-page-particles');
      canvas.setAttribute('aria-hidden', 'true');
      document.body.insertBefore(canvas, document.body.firstChild);
    }

    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var points = [];
    var count = options.count || 55;
    var maxDistance = options.maxDistance || 140;
    var cyan = options.cyan || 'rgba(0,229,204,0.4)';
    var violet = options.violet || 'rgba(155,89,255,0.35)';

    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < count; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - .5) * .35,
        vy: (Math.random() - .5) * .35,
        r: Math.random() * 1.5 + .4,
        cyan: Math.random() > .5
      });
    }

    function tick(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.cyan ? cyan : violet;
        ctx.fill();

        for (var j = i + 1; j < points.length; j++) {
          var q = points[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            var alpha = ((1 - dist / maxDistance) * .08).toFixed(3);
            ctx.strokeStyle = (p.cyan && q.cyan) ? 'rgba(0,229,204,' + alpha + ')' : 'rgba(155,89,255,' + alpha + ')';
            ctx.lineWidth = .7;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(tick);
    }

    tick();
    return canvas;
  }

  function ensureOrbs(hero){
    var orb1 = hero.querySelector('.tfs-energy-orb-1');
    var orb2 = hero.querySelector('.tfs-energy-orb-2');

    if (!orb1) {
      orb1 = document.createElement('div');
      orb1.className = 'tfs-energy-orb tfs-energy-orb-cyan tfs-energy-orb-1';
      hero.insertBefore(orb1, hero.firstChild);
    }

    if (!orb2) {
      orb2 = document.createElement('div');
      orb2.className = 'tfs-energy-orb tfs-energy-orb-violet tfs-energy-orb-2';
      hero.insertBefore(orb2, hero.firstChild);
    }

    if (!hero.querySelector('.tfs-energy-orb-3')) {
      var orb3 = document.createElement('div');
      orb3.className = 'tfs-energy-orb tfs-energy-orb-cyan tfs-energy-orb-3';
      hero.insertBefore(orb3, hero.firstChild);
    }

    return { orb1: orb1, orb2: orb2 };
  }

  function initHeroEnergy(target, options){
    options = options || {};
    var hero = typeof target === 'string' ? document.querySelector(target) : target;
    if (!hero) return null;

    hero.classList.add('tfs-energy-hero');
    var canvas = hero.querySelector('.tfs-energy-canvas') || createCanvas('tfs-energy-canvas');
    if (!canvas.parentNode) hero.insertBefore(canvas, hero.firstChild);

    var ctx = canvas.getContext('2d');
    if (!ctx) return null;

    var orbs = ensureOrbs(hero);
    var orb1 = orbs.orb1;
    var orb2 = orbs.orb2;

    var p1 = { x: 200, y: 150 };
    var p2 = { x: 0, y: 0 };
    var mouse = { x: -9999, y: -9999 };
    var hovering = false;
    var t = 0;
    var fuseP = 0;
    var pulse = 0;

    function resize(){
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
      p2.x = canvas.width - 400;
      p2.y = canvas.height - 400;
    }

    function lerp(a, b, s){
      return a + (b - a) * s;
    }

    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('scroll', function(){
      if (hovering) return;
      var sy = window.scrollY * .18;
      orb1.style.transform = 'translateY(' + sy + 'px)';
      orb2.style.transform = 'translateY(-' + sy + 'px)';
    }, { passive: true });

    hero.addEventListener('mouseenter', function(){
      hovering = true;
      canvas.style.opacity = '1';
      orb1.style.animation = 'none';
      orb2.style.animation = 'none';
      orb1.style.transition = 'none';
      orb2.style.transition = 'none';
      p1 = { x: -150, y: -100 };
      p2 = { x: canvas.width - 400, y: canvas.height - 300 };
    });

    hero.addEventListener('mouseleave', function(){
      hovering = false;
      canvas.style.opacity = '0';
      orb1.style.animation = '';
      orb2.style.animation = '';
      orb1.style.transform = '';
      orb2.style.transform = '';
      orb1.style.left = '';
      orb1.style.top = '';
      orb2.style.left = '';
      orb2.style.top = '';
      orb2.style.bottom = '';
      orb2.style.right = '';
      mouse = { x: -9999, y: -9999 };
    });

    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });

    function loop(){
      requestAnimationFrame(loop);

      if (!hovering) {
        fuseP = lerp(fuseP, 0, .028);
        if (fuseP < .005) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          return;
        }
      }

      t += .010;
      pulse += .032;

      var tx1 = mouse.x - 250 + Math.sin(t * .65) * 130;
      var ty1 = mouse.y - 250 + Math.cos(t * .5) * 100;
      var tx2 = mouse.x - 300 + Math.sin(t * .38 + 2.1) * 220;
      var ty2 = mouse.y - 300 + Math.cos(t * .32 + 1.3) * 150;

      p1.x = lerp(p1.x, tx1, .018);
      p1.y = lerp(p1.y, ty1, .018);
      p2.x = lerp(p2.x, tx2, .011);
      p2.y = lerp(p2.y, ty2, .011);

      if (hovering) {
        orb1.style.left = p1.x + 'px';
        orb1.style.top = p1.y + 'px';
        orb1.style.bottom = 'auto';
        orb1.style.right = 'auto';
        orb2.style.left = p2.x + 'px';
        orb2.style.top = p2.y + 'px';
        orb2.style.bottom = 'auto';
        orb2.style.right = 'auto';
      }

      var cx1 = p1.x + 250;
      var cy1 = p1.y + 250;
      var cx2 = p2.x + 300;
      var cy2 = p2.y + 300;
      var dx = cx2 - cx1;
      var dy = cy2 - cy1;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var midX = (cx1 + cx2) / 2;
      var midY = (cy1 + cy2) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var threshold = options.threshold || 560;
      var targetFuse = dist < threshold ? Math.pow(1 - (dist / threshold), 1.6) * 1.05 : 0;
      if (targetFuse > 1) targetFuse = 1;
      fuseP = lerp(fuseP, hovering ? targetFuse : 0, hovering ? .022 : .028);

      if (fuseP < .005) return;

      var beat = Math.sin(pulse) * .5 + .5;
      var beamAlpha = Math.min(fuseP * 1.8, .55) * (1 - Math.max(0, (fuseP - .7) / .3) * .6);

      if (beamAlpha > .01) {
        var beamGrad = ctx.createLinearGradient(cx1, cy1, cx2, cy2);
        beamGrad.addColorStop(0, 'rgba(0,229,204,' + beamAlpha + ')');
        beamGrad.addColorStop(.4, 'rgba(255,255,255,' + (beamAlpha * .9) + ')');
        beamGrad.addColorStop(.6, 'rgba(255,255,255,' + (beamAlpha * .9) + ')');
        beamGrad.addColorStop(1, 'rgba(155,89,255,' + beamAlpha + ')');
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx1, cy1);
        ctx.lineTo(cx2, cy2);
        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = fuseP * 10 + 2;
        ctx.shadowColor = 'rgba(255,255,255,0.7)';
        ctx.shadowBlur = fuseP * 40;
        ctx.stroke();
        ctx.restore();
      }

      var orbFade = Math.max(0, (fuseP - .18) / .82);
      if (orbFade > .01) {
        var baseR = 50 + orbFade * 180 + (beat * 28 * orbFade);
        var vHalo = ctx.createRadialGradient(midX, midY, baseR * .6, midX, midY, baseR * 2.8);
        vHalo.addColorStop(0, 'rgba(155,89,255,' + (orbFade * .22) + ')');
        vHalo.addColorStop(1, 'rgba(155,89,255,0)');
        ctx.save();
        ctx.fillStyle = vHalo;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        var cHalo = ctx.createRadialGradient(midX, midY, baseR * .4, midX, midY, baseR * 2.2);
        cHalo.addColorStop(0, 'rgba(0,229,204,' + (orbFade * .18) + ')');
        cHalo.addColorStop(1, 'rgba(0,229,204,0)');
        ctx.save();
        ctx.fillStyle = cHalo;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        var midG = ctx.createRadialGradient(midX, midY, 0, midX, midY, baseR * 1.3);
        midG.addColorStop(0, 'rgba(255,255,255,' + (orbFade * .75) + ')');
        midG.addColorStop(.35, 'rgba(0,229,204,' + (orbFade * .55) + ')');
        midG.addColorStop(.7, 'rgba(155,89,255,' + (orbFade * .2) + ')');
        midG.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.save();
        ctx.fillStyle = midG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        var hotR = baseR * (.32 + beat * .08 * orbFade);
        var coreG = ctx.createRadialGradient(midX, midY, 0, midX, midY, hotR);
        coreG.addColorStop(0, 'rgba(255,255,255,' + (orbFade * .98) + ')');
        coreG.addColorStop(.45, 'rgba(200,245,255,' + (orbFade * .65) + ')');
        coreG.addColorStop(1, 'rgba(0,229,204,0)');
        ctx.save();
        ctx.fillStyle = coreG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        var ringR = baseR * (1.1 + beat * .35);
        var ringW = baseR * .12;
        var ringG = ctx.createRadialGradient(midX, midY, ringR - ringW, midX, midY, ringR + ringW);
        ringG.addColorStop(0, 'rgba(255,255,255,0)');
        ringG.addColorStop(.5, 'rgba(255,255,255,' + (orbFade * beat * .35) + ')');
        ringG.addColorStop(1, 'rgba(0,229,204,0)');
        ctx.save();
        ctx.fillStyle = ringG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    }

    loop();
    return { hero: hero, canvas: canvas, orb1: orb1, orb2: orb2 };
  }

  window.TFSHeroEnergy = {
    initPageParticles: initPageParticles,
    initHeroEnergy: initHeroEnergy,
    mount: function(selector, options){
      initPageParticles(options && options.particles);
      return initHeroEnergy(selector, options && options.hero);
    }
  };

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-tfs-hero-energy]').forEach(function(hero){
      window.TFSHeroEnergy.mount(hero);
    });
  });
})();
