var currentCitationId = 123;
var similarCitations = [100, 300, 33590];
var activeCitation;
var similarData = [];
var citationData;

$(document).ready(function () {
	$("#tabul").tab();

	/*
	1. Making iframes for the rest three
	4. Ask Jaimie about the style issue's, add extra css page
	2. First getting the data for the 3 citations - Done
	3. Experiment with the titleContainer button - Done
	*/

	/*	Storing all the data in the similarData array */


	getJSON("https://inpho.cogs.indiana.edu/pubs/citation/" + currentCitationId).then(function(citationData) {
		citationId = citationData.citation_id;
		currentDivision = "#citation"+citationId;
		render({citationId}, "#listItemTemplate", "#tabul");
		render({citationId}, "#tabDivisionTemplate", "#tabdiv");
		// Put that in the current citation tab
		render(citationData, "#containerTemplate", currentDivision);
		// Templating for the title
		render(citationData, "#dropDownTemplate", ".titleButtonContainer");
		render({fieldValue: citationData.title}, "#listItemTemplateDr", ".titleButtonContainer .dropdown-menu");

		renderDynamicTemplate(citationData, "techreport", currentDivision);

		similarCitationLinks = similarCitations.slice();
		for(var i=0; i<similarCitationLinks.length; i++){
			similarCitationLinks[i] = "https://inpho.cogs.indiana.edu/pubs/citation/" + similarCitationLinks[i]
		}
		console.log(similarCitationLinks)
		return Promise.all(
			similarCitationLinks.map(getJSON));
	}).then(function(similarCitationDataArray) {
		similarCitationDataArray.forEach(function(citationData){
			similarData.push(citationData);
		})
	}).then(function () {
		/*The similar Data array should contain data before this method is called, but similar data is empty when the renderDropDown method is called*/
		renderDropDown("title", similarData)
	})
});


function getJSON(url) {
	return $.getJSON(url)
}

function renderDropDown(field, similarData) {
	similarData.forEach(function (data) {
		console.log(data.field)
		render({fieldValue: data.field}, "#listItemTemplateDr", "." + field + "titleButtonContainer .dropdown-menu");
	})
}

$(document).on("click", ".item", function () {
	value = $(this).text();
  /*
  ul->dropDown->col-sm-1->col-sm-7->input->value
  */
  $(".item").parent().parent().parent().prev().find("input").val(value);
});

$(document).on("click", ".checkTextArea", function () {
	var prevClass = $(this).val();
	activeCitation = $(".nav-tabs .active").attr("id");
	currentValue = $("#citation" + activeCitation + " ." + prevClass).text();
	$("#citation" + currentCitationId + " ." + prevClass).text(currentValue);
});

$(document).on("click", ".checkInput", function () {
	var prevClass = $(this).val();
	activeCitation = $(".nav-tabs .active").attr("id");
	currentValue = $("#citation" + activeCitation + " ." + prevClass).val();
	$("#citation" + currentCitationId + " ." + prevClass).val(currentValue);
});

function render (data, template, container) {
	var templateContent = $(template).html();
	var result = Mustache.render(templateContent, data);
	$(container).append(result);
};

function renderDynamicTemplate (data, pubType, currentDivision) {

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
		render(data, "#techreportTemplate", currentDivision + " #dynamicTemplateContainer");
		render(data, "#institutionTemplate", currentDivision + " #institutionContainer");
		render(data, "#numberTemplate", currentDivision + " #numberContainer");
		render(data, "#cityTemplate", currentDivision + " #cityContainer");
		render(data, "#monthTemplate", currentDivision + " #monthContainer");
		render(data, "#noteTemplate", currentDivision + " #noteContainer");
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

		case "web_published":
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

		case "edited_book":
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

		case "translated_book":
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
