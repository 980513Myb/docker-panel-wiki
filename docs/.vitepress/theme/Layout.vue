<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { nextTick, onMounted, watch } from 'vue'
import HomePage from './HomePage.vue'

const { frontmatter, page } = useData()

function decorateScreenshotSlots() {
  document.querySelectorAll('blockquote').forEach((element) => {
    const text = element.textContent?.trim() ?? ''
    if (!text.startsWith('截图：') || element.classList.contains('screenshot-slot')) return

    element.className = 'screenshot-slot'
    element.innerHTML = `
      <span class="screenshot-slot__index">SCREENSHOT SLOT</span>
      <strong>${text.replace(/^截图：/, '')}</strong>
      <small>产品截图位置已预留，后续替换时请隐藏域名、密钥、Token 与个人信息。</small>
    `
  })
}

onMounted(decorateScreenshotSlots)
watch(() => page.value.relativePath, () => nextTick(decorateScreenshotSlots))
</script>

<template>
  <HomePage v-if="frontmatter.layout === 'custom-home'" />
  <DefaultTheme.Layout v-else />
</template>
