$(() => {
  // load input endpoint
  $("input").each((i, element) => {
    const rest = $(element).attr("data-uri");
    $(element).val(`${window.location.origin}${rest}`);
  });

  // handle click copy endpoint
  $("button[title='Copy']").click(e => {
    let inputId = $(e.currentTarget)
      .closest(".input-group")
      .find("input")
      .attr("id");

    CopyToClipboard(inputId);
  });

  // tooltip bootstrap
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
});
