var currentCitationId = 123;
var similarCitations = [100, 300, 33590];
var activeCitation;
var similarData = [];
var currentData;

$(document).ready(function () {
	$("#tabul").tab();

	/*
	1. Making iframes for the rest three
	4. Ask Jaimie about the style issue's, add extra css page
	2. First getting the data for the 3 citations - Done
	3. Experiment with the titleContainer button - Done
	*/

	/*	Storing all the data in the similarData array */


	$.getJSON("https://inpho.cogs.indiana.edu/pubs/citation/" + currentCitationId).then(function(citationData) {
		currentData = citationData;
		citationId = citationData.citation_id;
		currentDivision = "#citation"+citationId;
		render({citationId}, "#listItemTemplate", "#tabul");
		render({citationId}, "#tabDivisionTemplate", "#tabdiv");
		// Put that in the current citation tab
		render(citationData, "#containerTemplate", currentDivision);
		// Templating for the title
		renderDropDown("title", citationData);
		renderDropDown("year", citationData);
		/*render(citationData, "#dropDownTemplate", ".titleButtonContainer");
		render({fieldValue: citationData.title}, "#listItemTemplateDr", ".titleButtonContainer .dropdown-menu");*/
		

		similarCitationLinks = similarCitations.slice();
		for(var i=0; i<similarCitationLinks.length; i++){
			similarCitationLinks[i] = "https://inpho.cogs.indiana.edu/pubs/citation/" + similarCitationLinks[i]
		}
		return similarCitationLinks;
	}).then(function(similarCitationLinks) {
    //similarCitationLinks = similarCitationLinks.map($.getJSON);
    
    return Promise.all(similarCitationLinks.map($.getJSON))
    .then(function(similarCitationDataArray) {
    	Promise.resolve(similarCitationDataArray);
    	similarCitationDataArray.forEach(function(citationData){
    		similarData.push(citationData);
    	})
    }).then(function () {
    	renderListItem("title", similarData)
    	renderListItem("year", similarData)
    	renderDynamicTemplate(currentData, "techreport", currentDivision);
    })
});
});

function renderListItem(field, data) {
	data.forEach(function (data) {
		if(data[field]!= "") {
			renderOptions ={}
			renderOptions.fieldName = field
			renderOptions.fieldValue = data[field];
			render(renderOptions, "#listItemTemplateDr", "." + field + "-ButtonContainer .dropdown-menu");
		}
	})	
}

function renderDropDown(field, data) {
	render(data, "#dropDownTemplate", "." + field + "-ButtonContainer");
	if (data[field]!= " ") {
		renderOptions ={}
		renderOptions.fieldName = field
		renderOptions.fieldValue = data[field];
		console.log(renderOptions)
		render(renderOptions, "#listItemTemplateDr", "." + field + "-ButtonContainer .dropdown-menu");	
	}
}

$(document).on("click", ".item", function () {
	value = $(this).text();
	className = $(this).attr("class").split(" ")[1].split("-")[1]
	$("." + className).val(value)
  /*
  ul->dropDown->col-sm-1->col-sm-7->input->value .val(value); .prev().find("input")
  */
  /*console.log($(this))
  console.log($(".item").parent().parent().parent().attr("class").split(" ")[1].split("-")[0])*/
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

function renderTemplateDropDown(data, similarData,currentDivision, field) {
	render(data, "#" + field + "Template", currentDivision + " #"+ field +"Container");
	renderDropDown(field, data);
	renderListItem(field, similarData)
}

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
		renderTemplateDropDown(data, similarData, currentDivision, "institution")
		renderTemplateDropDown(data, similarData, currentDivision, "number")
		renderTemplateDropDown(data, similarData, currentDivision, "city")
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
