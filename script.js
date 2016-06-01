$('#add').on('click', function(){
   //$('#contributors-table tr:last').after(tableRow);
  //$('#contributors-table').append(tableRow);
/*   var table=document.getElementById('contributors-table');
  var tableRow = table.rows[1].cloneNode(true);
  $('#contributors-table > tbody:last').append(tableRow); 
  $("#contributors-table tr:last").clone().find('input').val('').end().insertAfter("#contributors-table tr:last"); */
  var tableRow = `
<tr>
						<td>
							<label class="checkbox-label">
								<div class="radio">
									<input type="radio" name="optradio" class="table-radio">
								</div>
							</label>
						</td>
						<td>
							<div class="form-group">
								<select class="form-control input-sm" class="contributor-select">
									<option value="author">Author</option>
			    					<option value="editor">Editor</option>
			    					<option value="translator">Translator</option>
								</select>
							</div>
						</td>
						<td>
							<div class="form-group">
								<input class="form-control input-sm name" type="text">
							</div>
						</td>
						</tr>
`
   $('#contributors-table > tbody:last').append(tableRow); 
});

$("#delete").click(function () {
  $(".selected").remove();
    $("#contributors-table tr").each(function () {
      $('td', this).each(function () {
      if($(this).find("input.name").val()){
       console.log($(this).find("input.name").val()) 
      }
      })
      
  });  
})

$(document).on("click", "#contributors-table tr", function(event) {
  if($(event.target).is('[type="radio"]')){
         console.log("In this function");
   $(this).addClass("selected").siblings().removeClass("selected");
     }
});
 
$("#up").click(function () {
  console.log($(".selected").find("input.name").val());
  $(".selected").prev().before($(".selected"));
});

$("#down").click(function () {
  console.log($(".selected").find("input.name").val());
  $(".selected").next().after($(".selected"));
})

$("#templateForm").submit(function () {
   var authors = [];
    $("#contributors-table tr").each(function () {
      $('td', this).each(function () {
        if($(this).find("input.name").val()){
          // Add authentication to API's
          // Brainstorm on Verify button
          // Throw error message when there are no required authors
          // Check how the editors go to the API
          var author = {
            // Auto completing,write an API for it
          "author_id": "",
            // How is the firstname coming from the API
          "firstname": "",
          "lastname": $(this).find("input.name").val()
         }          
        }

        authors.push(author);
      })
  });
  
var outputJSON = {
  "volume": $("#volume").val(),
  "series": $("#series").val(),
  "abstract": $("#abstract").val(),
  "authors": authors,
  "number": "",
  "month": $("#month").val(),
  "edition": $("#edition").val(),
  "year": $("#year").val(),
  "keywords": $("#keywords").val(),
  "verified": 1,
  "title": $("#title").val(),
  "booktitle": "",
  "citation_id": 43107,
  "institution": "",
  "note": $("#note").val(),
  "editor": "",
  "howpublished": "",
  "type": "",
  "location": $("#city").val(),
  "auth_string": "Boorstin, D.,  ABC, EDF, ",// have to set it
  "journal": "",
  "entryTime": 1463161832,
  "translator": "",
  "last_modified": Date.now(),
  "address": "",
  "pages": "",
  "crossref": "",
  "chapter": "",
  "publisher": $("#publisher").val(),
  "school": "",
  "doi": $("#doi").val(),
  "raw": "Boorstin, D. (1992). The creators: A history of the heroes of the imagination. New York: Random House.",
  "url": $("#url").val(),
  "bibtex_key": "",
  "pubtype": $("#pubtype").val(),
  "organization": ""
};
  console.log(outputJSON);
});

