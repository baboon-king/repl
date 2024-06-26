<script setup lang="ts">
import SplitPane from './SplitPane.vue'
import Editor from './editor/Editor.vue'
import Output from './output/Output.vue'
import { Store, ReplStore, SFCOptions } from './store'
import { provide, toRef } from 'vue'
import Preview from './output/Preview.vue'

interface Props {
  store?: Store
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  layout?: string
  onlyOutputPreview?: boolean,
  showNewFile?: boolean
  importMapShimsUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new ReplStore(),
  autoResize: true,
  showCompileOutput: true,
  showImportMap: true,
  clearConsole: true,
  onlyOutputPreview: false,
  showNewFile: true,
  importMapShimsUrl: 'https://unpkg.com/es-module-shims@0.10.1/dist/es-module-shims.min.js',
})

props.store.options = props.sfcOptions

provide('store', props.store)
provide('autoresize', props.autoResize)
provide('import-map', toRef(props, 'showImportMap'))
provide('clear-console', toRef(props, 'clearConsole'))
provide('show-new-file', toRef(props, "showNewFile"))
provide('import-map-shims-url', toRef(props, "importMapShimsUrl"))
</script>

<template>
  <div class="vue-repl">
    <Preview show v-if="onlyOutputPreview" />
    <SplitPane v-else :layout="layout">
      <template #left>
        <Editor />
      </template>
      <template #right>
        <Output :showCompileOutput="props.showCompileOutput" />
      </template>
    </SplitPane>
  </div>
</template>

<style scoped>
.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 38px;

  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  overflow: hidden;
  background-color: var(--bg-soft);
}

.dark .vue-repl {
  --bg: #1a1a1a;
  --bg-soft: #242424;
  --border: #383838;
  --text-light: #aaa;
  --color-branding: #42d392;
  --color-branding-dark: #89ddff;
}

:deep(button) {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
