class BouquetGenerator {
  constructor() {
    this.itemList = document.querySelector(".section1 .item-list");
  }

  async setup() {
    const response = await this.loadData();
    this.bouquetFactory(response);
  }

  async loadData() {
    try {
      const response = await fetch("./items.json");

      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }

  bouquetFactory(data) {
    const docFrag = document.createDocumentFragment();
    data.forEach((el) => {
      const item = document.createElement("li");
      item.className = "item";
      const itemTemplate = `
			<button type="button" data-item="${el.name}" data-count="${el.count}" data-price="${el.cost}" data-img="${el.img}>
				<img src="./images/${el.img}" alt="${el.name}">
				<p>${el.name}</p>
				<strong>${el.cost}</strong>
			</button>
			`;
      item.innerHTML = itemTemplate;
      docFrag.append(item);
    });
    this.itemList.append(docFrag);
  }
}

export default BouquetGenerator;
