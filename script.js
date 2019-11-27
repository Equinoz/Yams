$(function() {

	// Fonction vérifiant si la valeur du champ de saisie est conforme au label correspondant
	function checkValue(value, label) {
	//console.log(label);
		if (value < 0 || value > 50)
			return false;
		else
			return true;
	}

	// Fonction mettant à jour les totaux 
	function updateTotals(section, column) {
		let rempli = true;
		let total = 0;
		let bonus;
		section = "#" + section;
		$(section + " tr ." + column + ".clickable").each(function() {
			total += Number($(this).text());
			if ($(this).text() === "") {
				rempli = false;
			}
		});
		if (section === "#first-section") {
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
			$(section + " #total ." + column).text(total);
			$(section + " #bonus ." + column).text(bonus);
			$(section + " #first-total ." + column).text(total + bonus);
		}
		else if (section === "#second-section") {
			if (rempli)
				$(section + " #second-total ." + column).text(total);
			else
				$(section + " #second-total ." + column).text("");
		}

		/*if ($("#second-section #second-total .column-1").text() !== "" && $("#first-section #first-total .column-1").text() !== "")
			$("#total-section #main-total .column-1").text(Number($("#first-section #first-total .column-1").text()) + Number($("#second-section #second-total .column-1").text()));
		else
			$("#total-section #main-total .column-1").text("");*/
	}

	// Modification du contenu des cellules du tableau
	$(".clickable").on("click", function(e) {
		let cell = $(this);
		let cellLabel = cell.parent().attr("id");
		let cellSection = cell.parents("table").attr("id");
		let cellColumn = cell.attr("class").split(" ")[0];
		let cellValue = cell.text();
		cell.html("").append("<input type='number' min=0 max=50 style='width:60px' />");
		let input = cell.children();
		input.val(cellValue);
		input.focus();

		input.on("keypress", function(e) {
			if (e.keyCode === 13)
				input.trigger("blur");
		});

		input.on("blur", function() {
			if (checkValue(input.val(), cellLabel))
				cell.text(input.val());
			else
				cell.text(cellValue);
			input.remove();
			updateTotals(cellSection, cellColumn);
		});
	})

	// Remise à zéro de la grille
	$("#reset-button").on("click", function() {
		if (confirm("Etes-vous sûr de vouloir effacer toute la grille?"))
			$("[class *= 'column-']").each(function() { $(this).html(""); });
	});

});
