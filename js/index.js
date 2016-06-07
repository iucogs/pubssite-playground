var globalData = {};
$("document").ready(function () {
  console.log("In the doc ready func")
  $.getJSON('http://nupubs.cogs.indiana.edu/citation/33590', function (data) {
    globalData = data;
    var template = $("#dataTemplate").html();
    var result = Mustache.render(template, data);
    $("#templateForm").html(result);

    // Setting the publicationType
    var pubType = data.pubtype.toLowerCase();
    $("#pubtype option[value="+pubType+"]").attr("selected", true);

    switch(pubType) {
      case "article": 
        console.log("Article")
        var dynamicTemplate = $("#articleTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "book":
        console.log("Book")
        var dynamicTemplate = $("#bookTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "techreport": 
        console.log("Tech Report")
        var dynamicTemplate = $("#techreportTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "misc":
        console.log("Misc")
        var dynamicTemplate = $("#miscTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "proceedings": 
        console.log("proceedings")
        var dynamicTemplate = $("#proceedingsTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "unpublished":
        console.log("unpublished")
        var dynamicTemplate = $("#unpublishedTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "phdthesis":
      case "mastersthesis":
        console.log("thesis")
        var dynamicTemplate = $("#thesisTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "web_published":
        console.log("web_published")
        var dynamicTemplate = $("#webpublishedTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "incollection":
      case "inproceedings":
      case "conference":
        console.log("Incollection || inproceedings || conference")
        var dynamicTemplate = $("#incollectionTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "manualTemplate":
        console.log("manualTemplate")
        var dynamicTemplate = $("#manualTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break; 

    } 

    // Setting the month
    var publicationMonth = data.month.toLowerCase();
    if(data.month.toLowerCase() == "") {
      $('#month option[value="----"]').attr('selected',true);
    } else {
      $('#month option[value='+publicationMonth+']').attr('selected',true);
    }

  });
  
});


$(document).on("click", "#add", function (){
  console.log("In the addition function");
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

$(document).on("click", "#delete", function () {
  $(".selected").remove();
    $("#contributors-table tr").each(function () {
      $('td', this).each(function () {
      if($(this).find("input.name").val()){
       console.log($(this).find("input.name").val()) 
      }
      })
      
  });  
});

$(document).on("click", "#up", function () {
  console.log($(".selected").find("input.name").val());
  $(".selected").prev().before($(".selected"));
});

$(document).on("click", "#down", function () {
  console.log($(".selected").find("input.name").val());
  $(".selected").next().after($(".selected"));
});

$(document).on("click", "#contributors-table tr", function(event) {
  if($(event.target).is('[type="radio"]')){
         console.log("In this function");
   $(this).addClass("selected").siblings().removeClass("selected");
     }
});

$(document).on("change", "#pubtype", function () {
  var pubType = this.value.toLowerCase();
  var data = globalData;
  switch(pubType) {
      case "article": 
        console.log("Article")
        var dynamicTemplate = $("#articleTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "book":
        console.log("Book")
        var dynamicTemplate = $("#bookTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "techreport": 
        console.log("Tech Report")
        var dynamicTemplate = $("#techreportTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "misc":
        console.log("Misc")
        var dynamicTemplate = $("#miscTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "proceedings": 
        console.log("proceedings")
        var dynamicTemplate = $("#proceedingsTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "unpublished":
        console.log("unpublished")
        var dynamicTemplate = $("#unpublishedTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "phdthesis":
      case "mastersthesis":
        console.log("thesis")
        var dynamicTemplate = $("#thesisTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "web_published":
        console.log("web_published")
        var dynamicTemplate = $("#webpublishedTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "incollection":
      case "inproceedings":
      case "conference":
        console.log("Incollection || inproceedings || conference")
        var dynamicTemplate = $("#incollectionTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break;

      case "manualTemplate":
        console.log("manualTemplate")
        var dynamicTemplate = $("#manualTemplate").html();
        var dynamicResult = Mustache.render(dynamicTemplate, data);
        $("#dynamicUpdate").html(dynamicResult);
        break; 

    } 

});

$("#templateForm").submit(function (e) {

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
  e.stopImmediatePropagation();
});