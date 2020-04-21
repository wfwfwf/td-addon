<template>
  <div>
    <!--效果展示-->
    <div class="example-effectHtml">
      <slot name="effectHtml"></slot>
    </div>

    <!--代码描述-->
    <div class="example-codeDescription" v-show="showDemo">
      <div class="example-codeDescription-title">
        <span class="example-codeDescription-title-span">代码描述</span>
      </div>
      <slot name="codeDescription"></slot>
    </div>

    <!--代码展示-->
    <div class="example-codeHighlight" v-show="showDemo">
      <div class="example-codeHighlight-tools" v-if="showCode">
        <span>
          <i v-show="!copyDone" @click="copyCode" title="复制代码" class="copy-code example-codeHighlight-tools-i iconfont icon-fuzhi1"></i>
          <i v-show="copyDone" class="copy-code-done iconfont icon-chenggong" @mouseout.stop="copyCodeMouseout($event)"></i>
        </span>
      </div>

      <slot name="codeHighlight" v-if="showCode"></slot>
      <div class="example-codeHighlight-showCode" @click="showCodeToggle()">
        <i :class="[showCode?'v-icon-up-dir':'v-icon-down-dir']"></i>
        <span>{{showCode ? '收起代码' : '显示代码'}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from "clipboard";
export default {
  name: "demo-box",

  props: {
    showDemo: {
      type: Boolean,
      default: false
    },
    jsfiddle: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      showCode: false,
      copyDone: false // copy done
    };
  },
  methods: {
    showCodeToggle() {
      this.showCode = !this.showCode;
    },

    copyCode() {
      let { html, style, script } = this.jsfiddle;
      style = style ? `<style>${style}</style>\n` : ``;
      script = script ? "<script>" + script +"<" + "/" + "script>" : "";
      const code = (html || "") + style + script;

      const clipboard = new Clipboard(".copy-code", {
        text() {
          return code;
        }
      });

      clipboard.on("success", e => {
        e.clearSelection();
        clipboard.destroy();

        this.copyDone = true;
      });

      clipboard.on("error", function (e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },

    copyCodeMouseout() {
      setTimeout(() => {
        this.copyDone = false;
      }, 2000);
    }
  }
};
</script>