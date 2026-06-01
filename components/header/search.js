const searchElements = [
	{
		label: "Télécharger l'application",
		link: "index.html#download"
	},
	{
		label: "Nous contacter",
		link: "index.html#contact"
	},
	{
		label: "La page d'accueil",
		link: "home.html"
	},
	{
		label: "Naviguer dans la page d'accueil",
		link: "home.html#navigate"
	},
	{
		label: "Les recettes",
		link: "recipe.html"
	},
	{
		label: "Voir une recette",
		link: "recipe.html#view"
	},
	{
		label: "Créer une recette",
		link: "recipe.html#create"
	},
	{
		label: "Les posts",
		link: "post.html"
	},
	{
		label: "Voir un post",
		link: "post.html#view"
	},
	{
		label: "Créer un post",
		link: "post.html#create"
	},
	{
		label: "Complémentaire sur les posts et les recettes",
		link: "post-and-recipe"
	},
	{
		label: "Commenter un post ou une recette",
		link: "post-and-recipe.html#comment"
	},
	{
		label: "Sauvegarder un post ou une recette",
		link: "post-and-recipe.html#save"
	},
	{
		label: "Le forum",
		link: "forum.html"
	},
	{
		label: "Répondre à une question du forum",
		link: "forum.html#ask"
	},
	{
		label: "Poser une question sur le forum",
		link: "forum.html#answer"
	},
	{
		label: "Le profil",
		link: "profile.html"
	},
	{
		label: "Se connecter",
		link: "login.html"
	},
	{
		label: "Se déconnecter",
		link: "login.html#logout"
	},
	{
		label: "FAQ",
		link: "faq.html"
	},
	{
		label: "Les prix",
		link: "pricing.html"
	},
	{
		label: "Les minis",
		link: "mini.html"
	}
];

function normalize(string) {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
}

function getFilteredElements(searchValue) {
	const normalizedSearchValue = normalize(searchValue);

	return searchElements.filter(({ label }) => {
		const normalizedLabel = normalize(label);

		let elementIndex = 0;

		for (const char of normalizedSearchValue) {
			elementIndex = normalizedLabel.indexOf(char, elementIndex);

			if (elementIndex === -1) return false;
		}

		return true;
	});
}

function getListElement({ label, link }) {
	return `
		<li>
			<a
				href="${link}"
				class="flex items-center gap-3 p-2 cursor-pointer size-full hover:bg-gray-100 focus:bg-gray-200 rounded transition-colors"
				onclick="document.getElementById('search-input').value = ''"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="shrink-0"
				>
					<path d="m21 21-4.34-4.34" />
					<circle cx="11" cy="11" r="8" />
				</svg>
			
				${label}
			</a>
		</li>
	`;
}

function onSearch(e, targetElement) {
	const searchValue = e.target.value;
	const filteredElements = searchValue ? getFilteredElements(searchValue) : []; // empty list if no searchValue

	targetElement.innerHTML =
		filteredElements.length === 0
			? "<li><no-result></no-result></li>"
			: filteredElements.slice(0, 5).map(getListElement).join(""); // limit of 5 elements
}

export default onSearch;
