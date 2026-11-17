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
