$(document).ready(function() {
   $('#btn-search').on('click', function() {
     var page = 'https://en.wikipedia.org/?curid=';
     var link = "https://en.wikipedia.org/w/api.php?exintro&explaintext";

     $.ajax({
        url: link,
        data: {
          format: "json",
          action: "query",
          prop: "pageimages|extracts",
          generator: "search",
          gsrnamespace: 0,
          gsrlimit: 10,
          pilimit: "max",
          exsentences: 1,
          exlimit: "max",
          gsrsearch:  $('input[name=search]').val()
        },
        dataType: "jsonp",
        success: function(data) {
          $('#content').empty();
          if(data.query != null) {
            var results = data.query.pages;
            $.each(results, function(id, content) {
              var result = $('<div>').attr('class', 'result');
              $(result).append($('<h5>').attr('class', 'title'))
                       .append($('<div>').html(content.extract));
              $(result).find('h5').append($('<a>')
                                          .html(content.title)
                                          .attr("href", page + content.pageid)
                                          .attr("target", "_blank"))
              $('#content').append(result);
             });
          } else {
            $('#content').append($('<div>').html("No results found"));
          }
        }
     });
  });

  $('#content').on('click', '.result', function() {
    $(this).find('a')[0].click();
  })

  $('#btn-random').on('click', function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  });
});
