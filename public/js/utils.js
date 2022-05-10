function CopyToClipboard(id) {
  var r = document.createRange();
  r.selectNode(document.getElementById(id));

  console.log(r);

  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
}
