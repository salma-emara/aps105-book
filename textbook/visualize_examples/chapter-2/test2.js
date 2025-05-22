document.querySelectorAll('iframe[data-code-file="chapter-2/test2.c"]').forEach((iframe) => {
    fetch("/visualize_examples/chapter-2/test2.c")
        .then(res => res.text())
        .then(code => {
            iframe.src = "https://pythontutor.com/iframe-embed.html#code=" + 
                          encodeURIComponent(code) + 
                          "&cumulative=false&py=c&curInstr=0";
        });
});
