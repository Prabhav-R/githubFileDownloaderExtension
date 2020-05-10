function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild;
}

document.querySelectorAll("tbody tr.js-navigation-item").forEach((row) => {
  if (!row.classList.contains("up-tree")) {
    if (
      !row.cells[0].children[0].classList.contains("octicon-file-directory")
    ) {
      if (row.children.length < 5) {
        let atag = row.children[1].children[0].children[0];

        let route = atag.href.replace(/https?:\/\/[^\/]+/i, "");
        let fname = atag.title;
        row.insertBefore(
          htmlToElement(
            '<td><button data-filename="' +
              fname +
              '" value="' +
              route +
              '"class="script-downloadButton" style="background: none!important;border: none;padding: 0!important;font-family: arial, sans-serif;color: #069;text-decoration: underline;cursor: pointer;" >download</button></td>'
          ),
          row.children[3]
        );
      }
    }
  }
});

document
  .querySelectorAll(".script-downloadButton")
  .forEach((b) => b.addEventListener("click", myfunc));

function myfunc(e) {
  let filename = e.target.getAttribute("data-filename");
  let r = e.target.value.replace("/blob", "");

  fetch("https://raw.githubusercontent.com" + r)
    .then((res) => res.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
}
