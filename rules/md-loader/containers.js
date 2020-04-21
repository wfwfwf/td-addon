const container = require('markdown-it-container')
var striptags = require('./strip-tags');
function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}
/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */


module.exports = md => {
  md.use(...createContainer('tip', 'TIP'))
    .use(...createContainer('warning', 'WARNING'))
    .use(...createContainer('danger', 'WARNING'))
    // explicitly escape Vue syntax
    .use(container, 'demo', {
      // render: (tokens, idx) => {
      //   console.log('-----------------------------')
      //   return tokens[idx].nesting === 1
      //   ? `<div v-pre>\n`
      //   : `</div>\n`
      // } 
      render: function (tokens, idx) {
        console.log(tokens, idx)
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
          // let result = `<template>\n` +
          //   `<demo-box
          //       :jsfiddle="${jsfiddle}"
          //       :showDemo="${showDemo}">
          //     <div slot="effectHtml">${effectHtml}</div>
          //     <div slot="codeDescription">${codeDescription}</div>
          //     <div slot="codeHighlight"></div></demo-box>\n` +
          //   `</template>\n`
          // if (style) {
          //   result = result  + `<style>\n${style}</style>\n`
          // }  
          // if (script) {
          //   result = result + `<script>\n${script}</script>\n`
          // }  
          // return result
        } else {
          return '</div></demo-box>\n';
        }

      }
    })
}

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