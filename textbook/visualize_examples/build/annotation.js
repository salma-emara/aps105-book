window.stepNotes = {};

fetch("annotation.json")
  .then((res) => res.json())
  .then((notes) => {
    window.stepNotes = notes;
    //console.log(notes);
  });

window.showStepNote = function (stepIndex, lineNumber, domRoot) {
  //console.log("Calling showStepNote on step", stepIndex, "line", lineNumber);

  const allCodeCells = domRoot.find("td.cod");

  allCodeCells.each(function () {
    if (this._tippy) {
      this._tippy.destroy();
    }
  });

  const targetTd = allCodeCells.get(lineNumber - 1);
  const note = window.stepNotes[lineNumber];

  //console.log("targetTd is", targetTd);
  //console.log("tooltip content is", note);

  if (targetTd && note) {
    const tip = tippy(targetTd, {
      content: note,
      showOnCreate: true,
      placement: "right",
      theme: "light-border",
      trigger: "manual",
      hideOnClick: false,
      interactive: true,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //console.log(" rootBounds:", entry.rootBounds);
          if (entry.isIntersecting) {
            targetTd._tippy?.show();
          } else {
            targetTd._tippy?.hide();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(targetTd);
  }
};
