document.querySelectorAll('iframe[data-code-file="chapter-3/test3.c"]').forEach((iframe) => {
    fetch("../../visualize_examples/chapter-3/test3.c")
        .then(res => res.text())
        .then(code => {
            iframe.src = "https://pythontutor.com/iframe-embed.html#code=" + 
                          encodeURIComponent(code) + 
                          "&cumulative=false&py=c&curInstr=0";
        });
});
