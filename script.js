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
		let columnFull = true,
				total = 0, 
				bonus;

		// Parcours de la colonne de la section concernée pour faire le total et déterminer si un champ est vide
		$("#" + section + " tr ." + column + ".clickable").each(function() {
			total += Number($(this).text());
			if ($(this).text() === "")
				columnFull = false;
		});

		if (!columnFull)
			total = bonus = "";

		if (section === "first-section") {
			// Calcul du bonus si tous les champs de la colonne sont remplis
			if (columnFull) {
				if (total > 56 && total < 63)
					bonus = 20;
				else if (total > 62)
					bonus = 35;
				else
					bonus = 0;
			}

 			// Affichage du total et du bonus pour la section supérieure
			$("#total ." + column).text(total);
			$("#bonus ." + column).text(bonus);
			$("#first-total ." + column).text(total + bonus);
		}

		else
			// Affichage du total pour la section inférieure
			$("#second-total ." + column).text(total);

		// Récupération de la valeur des totaux intermédiaires
		let firstTotal = $("#first-total ." + column).text(),
				secondTotal = $("#second-total ." + column).text(),
				mainTotal;

		// Calcul et affichage du total général
		if (firstTotal === "" || secondTotal === "")
			mainTotal = "";
		else
			mainTotal = Number(firstTotal) + Number(secondTotal);
		$("#main-total ." + column).text(mainTotal);
	}

	// Modification du contenu des cellules du tableau

	$(".clickable").on("click", function(e) {
		// Récupération de l'objet représentant la cellule, son label, sa section, sa colonne et son contenu
		let cell = $(this);
		let cellLabel = cell.parent().attr("id"),
				cellSection = cell.parents("table").attr("id"),
				cellColumn = cell.attr("class").split(" ")[0],
				cellValue = cell.text();

		// Insertion d'une zone de saisie dans la cellule
		cell.html("").append("<input type='number' min=0 max=50 style='width:60px' />");
		let input = cell.children();
		input.val(cellValue).focus();

		input.on("keypress", function(e) {
			if (e.keyCode === 13)
				input.trigger("blur");
		});

		input.on("blur", function() {
			// Vérification de la valeur de la zone de saisie par rapport au label associé
			if (checkValue(input.val(), cellLabel)) {
				cell.text(input.val());
				// Mise à jour des totaux
				updateTotals(cellSection, cellColumn);
			}
			else
				cell.text(cellValue);
			input.remove();
		});
	})

	// Remise à zéro de la grille avec confirmation

	$("#reset-button").on("click", function() {
		if (confirm("Etes-vous sûr de vouloir effacer toute la grille?"))
			$("[class *= 'column-']").each(function() { $(this).html(""); });
	});

});
