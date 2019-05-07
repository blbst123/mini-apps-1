var submitFile = function(e) {
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "/",
    contentType: 'application/json',
    data: JSON.stringify({file: $("#inputField").val()}),
    success: function(data) {
      // console.log('success1');
      $("#outputField").html(data)
      console.log(data);
    },
  });
}

