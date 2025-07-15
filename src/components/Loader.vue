<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  margin: 0 auto;
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffffff;
  --gradient: conic-gradient(#0000 10%, #000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--gradient);
  mask: var(--gradient);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: rotate 1s infinite linear;
}
@keyframes rotate {
  to {
    transform: rotate(1turn);
  }
}
</style>
