var currentData = {};
var globalConstants = {};

$("document").ready(function () {
  console.log("In the doc ready func")
  $.getJSON('http://nupubs.cogs.indiana.edu/citation/33590', function (data) {
    currentData = data;
    // Setting global constants
    globalConstants.citation_id = data.citation_id;
    globalConstants.entryTime = data.entryTime;

    // Displaying the dynamic template
    render(data, "#dataTemplate", "#wholeTemplateContainer");

    // Setting the publicationType
    var pubType = data.pubtype.toLowerCase();
    $("#pubtype option[value="+pubType+"]").attr("selected", true);
    changeTemplate(data, pubType);

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
          <tr class="author">
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
  changeTemplate(currentData,pubType);
});

$(document).on("click", "#save", function () {

    var authors = [];
    var authString = "";
    $("#contributors-table tr.author").each(function () {
      var fullName = $(this).find("input.name").val();
      var firstName; var lastName;
      [lastName, firstName] = fullName.split(",");
      lastName = lastName.trim();
      firstName = firstName.trim();
      var author = {
        lastname: lastName,
        author_id: "",
        firstname: firstName
      }
      authString = authString + fullName + ", ";
      authors.push(author);
    });
  
    var outputJSON = {
      "volume": $("#volume").val() || "",
      "series": $("#series").val() || "",
      "abstract": $("#abstract").val() || "",
      "authors": authors,
      "number": $("#number").val() || "",
      "month": $("#month").val() || "",
      "edition": $("#edition").val() || "",
      "year": $("#year").val() || "",
      "keywords": $("#keywords").val() || "",
      "verified": 1, // Have to check this
      "title": $("#title").val() || "",
      "booktitle": $("#booktitle").val() || "",
      "citation_id": globalConstants.citation_id,
      "institution": $("#institution").val() || "",
      "note": $("#note").val() || "",
      "editor": "",
      "howpublished": "",
      "type": "",
      "location": $("#city").val(),
      "auth_string": authString,// have to set it
      "journal": "",
      "entryTime": globalConstants.entryTime,
      "translator": "",
      "last_modified": Date.now(),
      "address": "",
      "pages": "",
      "crossref": "",
      "chapter": "",
      "publisher": $("#publisher").val(),
      "school": "",
      "doi": $("#doi").val(),
      "raw": $("#preview-rawtext").text(),
      "url": $("#url").val(),
      "bibtex_key": "",
      "pubtype": $("#pubtype").val(),
      "organization": ""
    };
    // Line 130 citation_update
  console.log(outputJSON);
});

var changeTemplate = function (data, pubType) {
  
    switch(pubType) {
      case "article": 
        console.log("Article")
        render(data, "#articleTemplate", "#dynamicTemplateContainer");
        render(data, "#journalTemplate", "#journalContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#volumeTemplate", "#volumeContainer");
        render(data, "#numberTemplate", "#numberContainer");
        render(data, "#pagesTemplate", "#pagesContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "book":
        console.log("Book")
        render(data, "#bookTemplate", "#dynamicTemplateContainer");
        render(data, "#bookTitleTemplate", "#bookTitleContainer");
        render(data, "#publisherTemplate", "#publisherContainer");
        render(data, "#chapterTemplate", "#chapterContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#volumeTemplate", "#volumeContainer");
        render(data, "#seriesTemplate", "#seriesContainer");
        render(data, "#editionTemplate", "#editionContainer");
        render(data, "#pagesTemplate", "#pagesContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "techreport": 
        console.log("Tech Report")
        render(data, "#techreportTemplate", "#dynamicTemplateContainer");
        render(data, "#institutionTemplate", "#institutionContainer");
        render(data, "#numberTemplate", "#numberContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "misc":
        console.log("Misc")
        render(data, "#miscTemplate", "#dynamicTemplateContainer");
        render(data, "#howPublishedTemplate", "#howPublishedContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "proceedings": 
        console.log("proceedings")
        render(data, "#proceedingsTemplate", "#dynamicTemplateContainer");
        render(data, "#publisherTemplate", "#publisherContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#organizationTemplate", "#organizationContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "unpublished":
        console.log("unpublished")
        render(data, "#unpublishedTemplate", "#dynamicTemplateContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "phdthesis":
      case "mastersthesis":
        console.log("thesis")
        render(data, "#thesisTemplate", "#dynamicTemplateContainer");
        render(data, "#schoolTemplate", "#schoolContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "webpub":
        console.log("web_published")
        render(data, "#webpublishedTemplate", "#dynamicTemplateContainer");
        render(data, "#dateRetrievedTemplate", "#dateRetrievedContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer"); 
        break;

      case "incollection":
      case "inproceedings":
      case "conference":
        console.log("Incollection || inproceedings || conference")
        render(data, "#incollectionTemplate", "#dynamicTemplateContainer");
        render(data, "#bookTitleTemplate", "#bookTitleContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#organizationTemplate", "#organizationContainer");
        render(data, "#publisherTemplate", "#publisherContainer");  
        render(data, "#pagesTemplate", "#pagesContainer");
        render(data, "#noteTemplate", "#noteContainer");            
        break;

      case "manual":
        console.log("manualTemplate")
        render(data, "#manualTemplate", "#dynamicTemplateContainer");
        render(data, "#organizationTemplate", "#organizationContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#editionTemplate", "#editionContainer");
        render(data, "#noteTemplate", "#noteContainer");  
        break;

      case "editedbook":
        console.log("Edited Book");
        render(data, "#editedBookTemplate", "#dynamicTemplateContainer");
        render(data, "#publisherTemplate", "#publisherContainer"); 
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#volumeTemplate", "#volumeContainer");
        render(data, "#seriesTemplate", "#seriesContainer");
        render(data, "#editionTemplate", "#editionContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "inbook":
        console.log("In book");
        render(data, "#inBookTemplate", "#dynamicTemplateContainer");
        render(data, "#bookTitleTemplate", "#bookTitleContainer");
        render(data, "#publisherTemplate", "#publisherContainer");
        render(data, "#chapterTemplate", "#chapterContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#volumeTemplate", "#volumeContainer");
        render(data, "#seriesTemplate", "#seriesContainer");
        render(data, "#editionTemplate", "#editionContainer");
        render(data, "#pagesTemplate", "#pagesContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;

      case "translatedbook":
        console.log("translatedbook");
        render(data, "#translatedBookTemplate", "#dynamicTemplateContainer");
        render(data, "#publisherTemplate", "#publisherContainer");
        render(data, "#cityTemplate", "#cityContainer");
        render(data, "#seriesTemplate", "#seriesContainer");
        render(data, "#editionTemplate", "#editionContainer");
        render(data, "#volumeTemplate", "#volumeContainer");
        render(data, "#monthTemplate", "#monthContainer");
        render(data, "#noteTemplate", "#noteContainer");
        break;
    }
}

var render = function (data, template, container) {
  var templateContent = $(template).html();
  var result = Mustache.render(templateContent, data);
  $(container).html(result);
};
