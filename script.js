$(function() {

	// Modification du contenu des cellules du tableau
	$(".clickable").on("click", function(e) {
		let cell = $(e.target);
		let cellValue = cell.text();
		cell.html("");
		cell.append("<input type='text' size=3 maxlength=2 />");
		let input = cell.children();
		input.val(cellValue);
		input.focus();

		input.on("keypress", function(e) {
			if (e.keyCode === 13)
				input.trigger("blur");
		});

		input.on("blur", function() {
			cell.text(input.val());
			input.remove();
		});
	});


	// Remise à zéro de la grille
	$("#reset-button").on("click", function() {
		if (confirm("Etes-vous sûr de vouloir effacer toute la grille?"))
			$(".clickable").each(function() { $(this).html(""); });
	});

});
