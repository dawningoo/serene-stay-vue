<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <img src="@/assets/images/logo.png" alt="Serene Stay" class="footer-logo" />
          <p>在旅程中，找到屬於自己的寧靜時光。</p>
          <ul>
            <li>
              <a href="#"><img src="@/assets/images/icons/facebook.svg" alt="Facebook" /></a>
            </li>
            <li>
              <a href="#"><img src="@/assets/images/icons/instagram.svg" alt="Instagram" /></a>
            </li>
            <li>
              <a href="#"><img src="@/assets/images/icons/youtube.svg" alt="YouTube" /></a>
            </li>
            <li>
              <a href="#"><img src="@/assets/images/icons/line.svg" alt="LINE" /></a>
            </li>
          </ul>
        </div>
        <div class="footer-links">
          <h3>快速連結</h3>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/#rooms">Rooms</RouterLink></li>
            <li><RouterLink to="/#facilities">Facilities</RouterLink></li>
            <li><RouterLink to="/#contact">Contact</RouterLink></li>
          </ul>
        </div>
        <div id="contact" class="footer-contact">
          <h3>聯絡我們</h3>
          <address>
            <ul>
              <li>
                <img src="@/assets/images/icons/map.svg" alt="" />
                <p>新竹市東區力行六路8號</p>
              </li>
              <li>
                <img src="@/assets/images/icons/phone.svg" alt="" />
                <a href="tel:035636688">03-5636688</a>
              </li>
              <li>
                <img src="@/assets/images/icons/mail.svg" alt="" />
                <a href="mailto:hello@serenestay.com">hello@serenestay.com</a>
              </li>
            </ul>
          </address>
        </div>
      </div>
      <p class="footer-note">
        本網站為個人練習作品，內容僅作為學習紀錄與成果展示，無任何商業用途。
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
/* Footer */
.footer {
  color: var(--color-text-light);
  background-color: var(--color-primary);
  padding: var(--space-48) 0 var(--space-24);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.footer-content h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-8);
}

.footer-logo {
  width: 200px;
  filter: brightness(0) invert(1);
}

.footer-brand ul {
  display: flex;
  gap: var(--space-16);
  margin-top: var(--space-16);
}

.footer-brand ul img {
  height: 32px;
  width: 32px;
  filter: brightness(0) invert(1);
}

.footer-links ul li {
  margin: var(--space-8) 0;
}

.footer-contact address {
  font-style: normal;
}

.footer-contact ul li {
  display: flex;
  align-items: center;
  margin: var(--space-8) 0;
}

.footer-contact ul li img {
  filter: brightness(0) invert(1);
  margin-right: var(--space-8);
}

.footer-note {
  font-size: var(--font-size-sm);
  text-align: center;
  margin-top: var(--space-24);
  padding-top: var(--space-24);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

/* RWD */

@media (max-width: 799px) {
  .footer-links {
    display: none;
  }
}

@media (max-width: 499px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-32);
  }

  .footer-logo {
    margin: 0 auto;
  }

  .footer-brand ul,
  .footer-contact ul li {
    justify-content: center;
  }
}
</style>
