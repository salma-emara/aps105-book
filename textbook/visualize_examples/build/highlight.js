const style = document.createElement("style");
style.textContent = `

     td.cod {
    font-family: Menlo, monospace;
    font-size: 11pt;
    background-color: #ffffff;
    border-radius: 4px;
    white-space: nowrap;
  }
  `;

document.head.appendChild(style);

// 等待 DOM 和 visualize 渲染完毕后执行
function highlightCode() {
  const interval = setInterval(() => {
    console.log("Highlight script running");
    // 选中所有在visualize.js中class为td.cod的内容
    const codeCells = document.querySelectorAll("td.cod");
    if (codeCells.length > 0) {
      codeCells.forEach((cell) => {
        const raw = cell.innerText;
        //console.log("Raw content:\n-----\n" + raw + "\n-----");
        const highlighted = Prism.highlight(raw, Prism.languages.c, "c");
        const final = highlighted.replace(/^(\s+)/, (m) =>
          "&nbsp;".repeat(m.length)
        );

        cell.innerHTML = final;
      });
      clearInterval(interval);
    }
  }, 100);
}

window.addEventListener("load", highlightCode);
