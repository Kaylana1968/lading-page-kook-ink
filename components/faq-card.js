class FaqCard extends HTMLElement {
	connectedCallback() {
		const question = this.getAttribute("question");
		const answer = this.getAttribute("answer");

		const parentElement = document.createElement("div");
		parentElement.dataset.inactive = "";
		parentElement.className =
			"group rounded-lg overflow-hidden border border-gray-200 shadow-sm";

		const questionElement = document.createElement("div");
		questionElement.className =
			"z-20 relative flex items-center gap-2 justify-between bg-gray-100 p-2 cursor-pointer after:content-['▾'] after:transition-transform after:duration-300 not-group-data-inactive:after:rotate-180";
		questionElement.innerText = question;

		const collapseWrapper = document.createElement("div");
		collapseWrapper.className =
			"grid transition-[grid-template-rows] duration-300 group-data-inactive:grid-rows-[0fr] grid-rows-[1fr]";

		const answerElement = document.createElement("div");
		answerElement.className =
			"overflow-hidden flex gap-2 transition-[border,padding] border-t border-t-gray-200 p-2 group-data-inactive:py-0 group-data-inactive:border-t-0 before:content-['↳']";
		answerElement.innerText = answer;

		collapseWrapper.appendChild(answerElement);

		questionElement.addEventListener("click", () => {
			const isInactive = "inactive" in parentElement.dataset;
			if (isInactive) delete parentElement.dataset.inactive;
			else parentElement.dataset.inactive = "";
		});

		const additionnalClasses = {
			remove: ["cursor-pointer"],
			add: ["pointer-events-none", "cursor-not-allowed"]
		};

		collapseWrapper.addEventListener("transitionstart", () => {
			questionElement.classList.remove(...additionnalClasses.remove);
			questionElement.classList.add(...additionnalClasses.add);
		});

		collapseWrapper.addEventListener("transitionend", () => {
			questionElement.classList.remove(...additionnalClasses.add);
			questionElement.classList.add(...additionnalClasses.remove);
		});

		parentElement.appendChild(questionElement);
		parentElement.appendChild(collapseWrapper);
		this.appendChild(parentElement);
	}
}

export default FaqCard;
