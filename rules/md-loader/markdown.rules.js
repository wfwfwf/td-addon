var striptags = require('./strip-tags')
const container = require('markdown-it-container')
var hljs = require('highlight.js')
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str, true).value;
      } catch (__) {
      }
    }

    return ''; // use external default escaping
  }
})

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

var wrap = function (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code v-pre class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};

function createContainer(klass, defaultTitle) {
  return [container, klass, {
    render(tokens, idx) {
      const token = tokens[idx]
      const info = token.info.trim().slice(klass.length).trim()
      if (token.nesting === 1) {
        return `<div class="${klass} custom-block"><p class="custom-block-title">${info || defaultTitle}</p>\n`
      } else {
        return `</div>\n`
      }
    }
  }]
}

exports.getMarkDownSetting = function () {
  return {
    raw: true,
    preprocess: function (MarkdownIt, source) {
      MarkdownIt.renderer.rules.table_open = function () {
        return '<table class="example-table">';
      };
      MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence);
      return source;
    },
    use: [
      [container, 'tip', {
        render(tokens, idx) {
          const token = tokens[idx]
          const info = token.info.trim().slice(4).trim()
          if (token.nesting === 1) {
            return `<div class="tip custom-block"><p class="custom-block-title">${info}</p>\n`
          } else {
            return `</div>\n`
          }
        }
      }],
      createContainer('tip', 'TIP'),
      createContainer('warning', 'WARNING'),
      createContainer('danger', 'WARNING'),
      [container, 'demo', {
        validate: function (params) {
          return params.trim().match(/^demo/);
        },
        render: function (tokens, idx) {
          var m = tokens[idx].info.trim().match(/^demo\s*(.*)$/),
            showDemo = (m && m != 'demo,') ? true : false;

          if (tokens[idx].nesting === 1) {
            // opening tag
            var content = tokens[idx + 1].content;
            var effectHtml = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1');
            //var codeDescription = showDemo ? md.utils.escapeHtml(m[1]) : '';
            var codeDescription = '';
            if (showDemo) { // 换行显示
              var descArr = m[1].split('<br>');
              // console.log("descArr ---", descArr)
              descArr.forEach(item => {
                codeDescription += md.render(item);
              })
            }

            var script = striptags.fetch(content, 'script'),
              style = striptags.fetch(content, 'style'),
              jsfiddle = { html: effectHtml, script: script, style: style };

            jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle));

            return `<demo-box
                            :jsfiddle="${jsfiddle}"
                            :showDemo="${showDemo}">
                            <div slot="effectHtml">${effectHtml}</div>
                            <div slot="codeDescription">${codeDescription}</div>
                            <div slot="codeHighlight">
                            `
          } else {
            // closing tag
            return '</div></demo-box>\n'
          }
        }

      }]
    ]
  }
}


