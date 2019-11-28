$(function() {

	// ******* Fonctions *******
	// Fonction vérifiant si la valeur du champ de saisie est conforme au label correspondant

	function checkValue(value, label, column) {
		value = Number(value);
		let scores = allowedScores[label],
				otherChanceValue;

		// Si le label dispose d'un tableau de scores possibles on vérifie la validité de la valeur
		if (Array.isArray(scores)) {
			if (~scores.indexOf(value))
				return true;
			return false;
		}

		// Si il n'y a pas de tableau on vérifie que la saisie se trouve dans l'intervalle de score possible
		else if (value >= 5 && value <= 30 || value === 0) {
			// Vérification des valeurs des champs "chances"
			switch (label) {
				case "chance1":	
					otherChanceValue = $("#chance2 ." + column).text();
					if (otherChanceValue <= value && otherChanceValue !== "" && otherChanceValue != 0)
						return false;

				case "chance2":	
					otherChanceValue = $("#chance1 ." + column).text();
					if (otherChanceValue >= value && otherChanceValue !== "" && value != 0)
						return false;
			}
			return true;
		}
		else
			return false;
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
	// **************

	// Objet contenant les scores possibles selon les labels
	let allowedScores = {
		one: [0, 1, 2, 3, 4, 5],
		two: [0, 2, 4, 6, 8, 10],
		three: [0, 3, 6, 9, 12, 15],
		four: [0, 4, 8, 12, 16, 20],
		five: [0, 5, 10, 15, 20, 25],
		six: [0, 6, 12, 18, 24, 30],
		two_pair: null,
		brelan: null,
		full: [0, 25],
		straight: [0, 15],
		big_straight: [0, 20],
		poker: [0, 40],
		yams: [0, 50],
		chance1: null,
		chance2: null
	};

	// Saisie prénom utilisateur

	let user = prompt("Veuillez entrer le prénom du joueur").substring(0, 12);
	if (user !== "") {
		$("#userName").text("Partie de " + user);
		document.title = document.title + ": " + user;
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
			if (checkValue(input.val(), cellLabel, cellColumn)) {
				cell.text(input.val());
				// Mise à jour des totaux
				updateTotals(cellSection, cellColumn);
			}
			else {
				cell.text(cellValue);
				// Affichage du message d'aide si la saisie n'est pas conforme
				cell.parent().next().fadeIn(600, function() {$(this).delay(3000).fadeOut(1000)});
			}
			input.remove();
		});
	})

	// Remise à zéro de la grille avec confirmation

	$("#reset-button").on("click", function() {
		if (confirm("Etes-vous sûr de vouloir effacer toute la grille?")) {
			$("[class *= 'column-']").each(function() { $(this).html(""); });
			$(".help").hide();
		}
	});

});
