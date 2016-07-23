var currentCitationId = 123;
var similarCitations = [100, 300, 33590];
var activeCitation;

$(document).ready(function () {
	$("#tabul").tab();

	/*
	Getting the data for the templates
	*/

	similarCitations.forEach(function (citationId) {
		$.ajax({
			type:"GET",
			datatype: "jsonp",
			url: "https://inpho.cogs.indiana.edu/pubs/citation/" + citationId
		}).done(function (citationData) {
			citationData = JSON.parse(citationData);
			citationId = citationData.citation_id;
			currentDivision = "#citation"+citationId;
			render({citationId}, "#listItemTemplate", "#tabul");
			render({citationId}, "#tabDivisionTemplate", "#tabdiv");
			render(citationData, "#containerTemplate", currentDivision);
			renderDynamicTemplate(citationData, "techreport", currentDivision);
			//$('#citation'+citationId +' :input').attr("disabled", true);
			$(":checkbox").attr("disabled", false);
			$('#tabul a:first').tab('show')
		});
	});
	$.ajax({
		type:"GET",
		datatype: "jsonp",
		url: "https://inpho.cogs.indiana.edu/pubs/citation/" + currentCitationId
	}).done(function (citationData) {
		citationData = JSON.parse(citationData);
		citationId = citationData.citation_id;
		currentDivision = "#citation"+citationId;
		render({citationId}, "#listItemTemplate", "#tabul");
		render({citationId}, "#tabDivisionTemplate", "#tabdiv");
		render(citationData, "#containerTemplate", currentDivision);
		renderDynamicTemplate(citationData, "techreport", currentDivision);
		$("#citation" + currentCitationId + " .checkbox").hide();
	});

	
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