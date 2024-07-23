<script lang="ts">
  import { fadeIn, fadeOut } from '$lib/helpers/fade';
</script>

<header>
    TopBar
</header>

<style lang="less">
  header {
    display: flex;
    align-items: center;

    position: relative;

    width: 100%;
    height: 1.8rem;

    background-color: hsla(var(--system-color-light-hsl), 0.3);

    color: var(--system-color-light-contrast);
    fill: var(--system-color-light-contrast);
  }

  header::before {
    content: '';

    width: inherit;
    height: inherit;

    position: fixed;
    left: 0;
    top: 0;

    z-index: 0;
    backdrop-filter: blur(12px);
  }
</style>
