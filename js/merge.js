var currentCitationId = 123;
var similarCitations = [100, 300, 33590];

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
            render({citationId}, "#listItemTemplate", "#tabul");
            render({citationId}, "#tabDivisionTemplate", "#tabdiv");
            render(citationData, "#containerTemplate", "#citation"+citationId);
            $('#citation'+citationId +' :input').attr("disabled", true);
            $(":checkbox").attr("disabled", false);
            console.log($("#citation"+citationId).find(":input").length)
        })
	})
});


$(document).on("click", "#titleCheckBox", function () {
	var prev = $("#titleCheckBox").prev();
	console.log(prev)
});

function render (data, template, container) {
	var templateContent = $(template).html();
	var result = Mustache.render(templateContent, data);
	$(container).append(result);
};