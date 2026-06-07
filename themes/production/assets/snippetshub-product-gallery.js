(function () {
  function initGallery(galleryRoot) {
    if (!galleryRoot || galleryRoot.dataset.galleryInitialized === 'true') return;

    const stages = Array.from(galleryRoot.querySelectorAll('[data-gallery-stage]'));
    const thumbs = Array.from(galleryRoot.querySelectorAll('[data-gallery-thumb]'));
    const prevBtn = galleryRoot.querySelector('[data-gallery-prev]');
    const nextBtn = galleryRoot.querySelector('[data-gallery-next]');
    const mainImageContainer = galleryRoot.querySelector('.main-image-container');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!stages.length) return; 

    galleryRoot.dataset.galleryInitialized = 'true';

    const setupVideoStage = (stage) => {
      const video = stage.querySelector('video');
      if (!video || video.dataset.galleryControlsReady === 'true') return;

      const playBtn = stage.querySelector('[data-gallery-video-play]');
      const muteBtn = stage.querySelector('[data-gallery-video-mute]');
      const playLabel = stage.querySelector('[data-gallery-video-play-label]');
      const muteLabel = stage.querySelector('[data-gallery-video-mute-label]');
      const progressInput = stage.querySelector('[data-gallery-video-progress]');

      video.dataset.galleryControlsReady = 'true';
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.setAttribute('muted', 'muted');
      video.setAttribute('playsinline', 'playsinline');

      const syncControls = () => {
        const isPaused = video.paused || video.ended;

        if (playBtn) {
          playBtn.setAttribute('aria-pressed', isPaused ? 'false' : 'true');
          playBtn.setAttribute('aria-label', isPaused ? 'Play video' : 'Pause video');
        }
        if (playLabel) {
          playLabel.textContent = isPaused ? 'Play' : 'Pause';
        }

        if (muteBtn) {
          muteBtn.setAttribute('aria-pressed', video.muted ? 'true' : 'false');
          muteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
        }
        if (muteLabel) {
          muteLabel.textContent = video.muted ? 'Unmute' : 'Mute';
        }

        if (progressInput) {
          const duration = Number.isFinite(video.duration) ? video.duration : 0;
          const progress = duration > 0 ? (video.currentTime / duration) * 100 : 0;
          progressInput.value = String(progress);
          progressInput.style.setProperty('--progress-percent', `${progress}%`);
        }
      };

      playBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        if (video.paused || video.ended) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
        } else {
          video.pause();
        }
        syncControls();
      });

      muteBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        video.muted = !video.muted;
        syncControls();
      });

      progressInput?.addEventListener('input', () => {
        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        if (duration <= 0) return;

        const nextTime = (parseFloat(progressInput.value || '0') / 100) * duration;
        video.currentTime = nextTime;
        progressInput.style.setProperty('--progress-percent', `${progressInput.value}%`);
      });

      video.addEventListener('play', syncControls);
      video.addEventListener('pause', syncControls);
      video.addEventListener('ended', syncControls);
      video.addEventListener('volumechange', syncControls);
      video.addEventListener('timeupdate', syncControls);
      video.addEventListener('loadedmetadata', syncControls);
      video.addEventListener('durationchange', syncControls);

      stage.syncVideoControls = syncControls;
      syncControls();
    };

    stages.forEach((stage) => setupVideoStage(stage));

    const pauseStageMedia = (stage) => {
      const video = stage.querySelector('video');
      if (video) {
        video.pause();
        stage.syncVideoControls?.();
        return;
      }

      const iframe = stage.querySelector('iframe');
      if (!iframe) return;

      try {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        iframe.contentWindow?.postMessage('{"method":"pause"}', '*');
      } catch (error) {
        // Cross-origin iframe access can fail silently; no extra handling needed.
      }
    };

    const playStageMedia = (stage) => {
      const video = stage.querySelector('video');
      if (!video) return;

      setupVideoStage(stage);
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay may be blocked; controls stay available for manual play.
        });
      }
      stage.syncVideoControls?.();
    };

    const activateThumb = (thumb) => {
      const mediaId = thumb.getAttribute('data-media-id');
      const nextStage = stages.find((stage) => stage.getAttribute('data-media-id') === mediaId);
      if (!nextStage) return;

      const activeStage = stages.find((stage) => stage.classList.contains('is-active'));
      const stageWillChange = activeStage !== nextStage;

      stages.forEach((stage) => {
        const isActive = stage === nextStage;
        stage.classList.toggle('is-active', isActive);
        stage.hidden = !isActive;
        if (!isActive) pauseStageMedia(stage);
      });

      thumbs.forEach((t) => {
        const isActive = t === thumb;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      if (mainImageContainer && stageWillChange) {
        if (prefersReducedMotion) {
          mainImageContainer.classList.remove('is-changing');
        } else {
          mainImageContainer.classList.add('is-changing');
          window.setTimeout(() => {
            mainImageContainer.classList.remove('is-changing');
          }, 220);
        }
      }

      playStageMedia(nextStage);
    };

    const getActiveIndex = () => {
      const activeIndex = thumbs.findIndex((thumb) => thumb.classList.contains('active'));
      return activeIndex >= 0 ? activeIndex : 0;
    };

    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => activateThumb(thumb));
      thumb.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        const nextIndex =
          event.key === 'ArrowRight' ? (index + 1) % thumbs.length : (index - 1 + thumbs.length) % thumbs.length;
        thumbs[nextIndex].focus();
        activateThumb(thumbs[nextIndex]);
      });
    });

    prevBtn?.addEventListener('click', () => {
      const activeIndex = getActiveIndex();
      const prevIndex = (activeIndex - 1 + thumbs.length) % thumbs.length;
      activateThumb(thumbs[prevIndex]);
    });

    nextBtn?.addEventListener('click', () => {
      const activeIndex = getActiveIndex();
      const nextIndex = (activeIndex + 1) % thumbs.length;
      activateThumb(thumbs[nextIndex]);
    });

    const featuredMediaId = galleryRoot.getAttribute('data-featured-media-id');
    if (featuredMediaId) {
      const initialThumb = thumbs.find((thumb) => thumb.getAttribute('data-media-id') === featuredMediaId);
      if (initialThumb) activateThumb(initialThumb);
    }

    if (!thumbs.length) {
      const initialStage = stages.find((stage) => stage.classList.contains('is-active')) || stages[0];
      if (initialStage) {
        setupVideoStage(initialStage);
        playStageMedia(initialStage);
      }
    }

    galleryRoot.activateMediaById = (mediaId) => {
      const thumb = thumbs.find((item) => item.getAttribute('data-media-id') === String(mediaId));
      if (thumb) activateThumb(thumb);
    };
  }

  function initAll() {
    document.querySelectorAll('[data-product-gallery]').forEach((galleryRoot) => {
      initGallery(galleryRoot);
    });
  }

  window.SnippetsHubProductGallery = window.SnippetsHubProductGallery || {};
  window.SnippetsHubProductGallery.initAll = initAll;
})();
