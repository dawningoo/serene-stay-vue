<script setup>
import { navLinks } from '@/data/navLinks'
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__columns">
        <div class="footer__brand">
          <img class="footer__logo" src="@/assets/images/logo.webp" alt="Serene Stay" />
          <p class="footer__slogan">在旅程中，找到屬於自己的寧靜時光。</p>
          <ul class="footer__social">
            <li>
              <a href="#"
                ><img
                  class="footer__social-icon"
                  src="@/assets/images/icons/facebook.svg"
                  alt="Facebook"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  class="footer__social-icon"
                  src="@/assets/images/icons/instagram.svg"
                  alt="Instagram"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img
                  class="footer__social-icon"
                  src="@/assets/images/icons/youtube.svg"
                  alt="YouTube"
              /></a>
            </li>
            <li>
              <a href="#"
                ><img class="footer__social-icon" src="@/assets/images/icons/line.svg" alt="LINE"
              /></a>
            </li>
          </ul>
        </div>
        <div class="footer__links">
          <h3 class="footer__heading">快速連結</h3>
          <ul class="footer__link-list">
            <li v-for="link in navLinks" :key="link.label">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>
        <div class="footer__contact" id="contact">
          <h3 class="footer__heading">聯絡我們</h3>
          <address>
            <ul class="footer__contact-list">
              <li>
                <img class="footer__contact-icon" src="@/assets/images/icons/map.svg" alt="" />
                <p>新竹市東區力行六路8號</p>
              </li>
              <li>
                <img class="footer__contact-icon" src="@/assets/images/icons/phone.svg" alt="" />
                <a href="tel:035636688">03-5636688</a>
              </li>
              <li>
                <img class="footer__contact-icon" src="@/assets/images/icons/mail.svg" alt="" />
                <a href="mailto:hello@serenestay.com">hello@serenestay.com</a>
              </li>
            </ul>
          </address>
        </div>
      </div>
      <p class="footer__note">
        本網站為個人練習作品，內容僅作為學習紀錄與成果展示，無任何商業用途。
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  color: var(--color-text-light);
  background-color: var(--color-primary);
  padding: var(--space-48) 0 var(--space-24);

  &__columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    flex-direction: column;
    text-align: center;
    gap: var(--space-32);

    @include up(sm) {
      flex-direction: row;
      text-align: left;
      gap: 0;
    }
  }

  &__logo {
    width: 200px;
    margin: 0 auto;
    filter: brightness(0) invert(1);

    @include up(sm) {
      margin: 0;
    }
  }

  &__social {
    display: flex;
    justify-content: center;
    gap: var(--space-16);
    margin-top: var(--space-16);

    @include up(sm) {
      justify-content: flex-start;
    }
  }

  &__social-icon {
    height: 32px;
    width: 32px;
    filter: brightness(0) invert(1);
  }

  &__heading {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    margin-bottom: var(--space-8);
  }

  &__links {
    display: none;

    @include up(md) {
      display: block;
    }
  }

  &__link-list li {
    margin: var(--space-8) 0;
  }

  &__contact address {
    font-style: normal;
  }

  &__contact-list li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: var(--space-8) 0;

    @include up(sm) {
      justify-content: flex-start;
    }
  }

  &__contact-icon {
    filter: brightness(0) invert(1);
    margin-right: var(--space-8);
  }

  &__note {
    font-size: var(--font-size-sm);
    text-align: center;
    margin-top: var(--space-24);
    padding-top: var(--space-24);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>
