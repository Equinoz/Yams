$(function() {

	// Fonction vérifiant si la valeur du champ de saisie est correcte
	function checkValue(value) {
		if (value < 0 || value > 50)
			return false;
		else
			return true;
	}

	// Modification du contenu des cellules du tableau
	$(".clickable").on("click", function(e) {
		let cell = $(e.target);
		let cellValue = cell.text();
		cell.html("");
		cell.append("<input type='number' min=0 max=50 style='width:60px' />");
		let input = cell.children();
		input.val(cellValue);
		input.focus();

		input.on("keypress", function(e) {
			if (e.keyCode === 13)
				input.trigger("blur");
		});

		input.on("blur", function() {
			if (checkValue(input.val()))
				cell.text(input.val());
			else
				cell.text(cellValue);
			input.remove();
			$("#grid").trigger("change");
		});
	});

	$("#grid").on("change", function() {
		let rempli = true;
		let total = 0;
		let bonus;
		$("#first-section tr .column-1.clickable").each(function() {
			total += Number($(this).text());
			if ($(this).text() === "") {
				rempli = false;
			}
		});
		if (rempli) {
			if (total > 56 && total < 63)
				bonus = 20;
			else if (total > 62)
				bonus = 35;
			else
				bonus = 0;
		}
		else {
			total = bonus = "";
		}
		$("#first-section #total .column-1").text(total);
		$("#first-section #bonus .column-1").text(bonus);
		$("#first-section #first-total .column-1").text(total + bonus);

		/////
		rempli = true;
		total = 0;
		$("#second-section tr .column-1.clickable").each(function() {
			total += Number($(this).text());
			if ($(this).text() === "") {
				rempli = false;
			}
		});
		if (rempli) {
			$("#second-section #second-total .column-1").text(total);
		}
		else
			$("#second-section #second-total .column-1").text("");

		/////

		if ($("#second-section #second-total .column-1").text() !== "" && $("#first-section #first-total .column-1").text() !== "")
			$("#total-section #main-total .column-1").text(Number($("#first-section #first-total .column-1").text()) + Number($("#second-section #second-total .column-1").text()));
		else
			$("#total-section #main-total .column-1").text("");
	})

	// Remise à zéro de la grille
	$("#reset-button").on("click", function() {
		if (confirm("Etes-vous sûr de vouloir effacer toute la grille?"))
			$(".clickable").each(function() { $(this).html(""); });
	});

});
