var submitFile = function (e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "/",
    contentType: 'application/json',
    data: JSON.stringify({ file: $("#inputField").val() }),
    success: function (data) {
      $("#outputField").html(data);
      $("#download").css("display", "block");
    },
  });
}

