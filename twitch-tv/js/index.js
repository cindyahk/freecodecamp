$(document).ready(function() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  $.each(users, function() {
      addTwitchStreamer(this);
  });
  
  function addTwitchStreamer(user) {
    $.ajax({
      type: "GET",
      url: "https://wind-bow.gomix.me/twitch-api/streams/" + user + "?callback=?",
      dataType: "jsonp",
      success: function(data) {
        if(data.stream !== null) {       
          $("#online").append($("<a>")
                                .attr("class", "list-group-item list-group-item-action")
                                .attr("href", data.stream.channel.url)
                                .attr("target", "_blank")
                                .html(user + "<br/>Playing: " + data.stream.channel.status + "<br/>Language: " + data.stream.channel.language));
        } else {
          $("#offline").append($("<a>")
                                .attr("class", "list-group-item list-group-item-action disabled")
                                .attr("target", "_blank")
                                .html(user + " (offline)"));
        }
        
        
      }
    });
  }

  $('#filter-online').on('change', function() {
    $('#offline').hide();
    $('#online').show();
  });
  
  $('#filter-offline').on('change', function() {
    $('#online').hide();
    $('#offline').show();
  });
  
  $('#filter-all').on('change', function() {
    $('#online').show();
    $('#offline').show();
  })

});