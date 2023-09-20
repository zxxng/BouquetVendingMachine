class BouquetMachineEvents {
  constructor() {
    // section1
    const vMachine = document.querySelector(".section1");
    this.balance = vMachine.querySelector("#balance");
    this.btnBalance = vMachine.querySelector(".bg-box+.btns");
    this.inputCostEl = vMachine.querySelector("#input-money");
    this.btnDeposit = vMachine.querySelector("#input-money+.btns");
    this.saveList = vMachine.querySelector(".get-list");
    // section2
    const myInfo = document.querySelector(".section2");
    this.myMoney = myInfo.querySelector("#myMoney");
    // section3
    const getInfo = document.querySelector(".section3");
    this.getList = getInfo.querySelector(".get-list");
  }

  // 장바구니 생성 함수
  saveItemGenerator(target) {
    const saveItem = document.createElement("li");
    saveItem.className = "get-item";
    saveItem.dataset.name = target.dataset.name;
    saveItem.dataset.cost = target.dataset.cost;
    saveItem.innerHTML = `
		<div>
			<img src="./images/${target.dataset.img}" alt="${target.dataset.name}">
			<p>${target.dataset.name}</p>
		</div>
		<strong>1</strong>
		`;
    this.saveList.append(saveItem);
  }

  bindEvent() {
    /**
     * [입금 버튼]
     * 1. 잔액 === 기존 잔액 + 입금액
     * 2. 소지금 === 소지금 - 입금액
     * 3. 예외처리
     * 	1) 입금액 > 소지금 : 경고
     * 	2) 입금액 <= 0 : 경고
     * 4. 정상 작동 시 입금창 초기화
     */
    this.btnDeposit.addEventListener("click", () => {
      const inputMoney = parseInt(this.inputCostEl.value);
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));

      if (inputMoney) {
        if (inputMoney > myMoneyVal) {
          alert("소지금이 부족합니다.");
        } else if (inputMoney <= 0) {
          alert("입금액은 1원 이상이어야 합니다.");
        } else {
          this.balance.textContent = new Intl.NumberFormat().format((balanceVal ? balanceVal : 0) + inputMoney) + "원";
          this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal - inputMoney) + "원";
        }
        // 입금액 초기화
        this.inputCostEl.value = "";
      }
    });

    /**
     * [거스름돈 반환 버튼]
     * 1. 소지금 === 소지금 + 잔액
     * 2. 잔액 === 0
     */
    this.btnBalance.addEventListener("click", () => {
      const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
      const myMoneyVal = parseInt(this.myMoney.textContent.replaceAll(",", ""));

      if (this.balance) {
        this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal + balanceVal) + "원";
        this.balance.textContent = 0 + "원";
      }
    });

    /**
     * [장바구니 채우기]
     * 1. 상품 선택
     *  1) 잔액 === 잔액 - 상품 가격
     *  2) 잔액 < 상품가격 : 경고
     * 2. 장바구니 아이템 생성
     * 3. 상품 갯수 1 감소
     * 	1) 재고 0일 경우 품절 표시
     */
    this.btnItems = document.querySelectorAll(".section1 .item");
    this.btnItems.forEach((item) => {
      item.addEventListener("click", (event) => {
        console.log("event 발생!");
        const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
        const targetEl = event.target.closest("button");
        console.log(targetEl);
        const targetElCost = parseInt(targetEl.dataset.cost);
        const saveListItem = this.saveList.querySelectorAll("li");
        let isSave = false;

        if (balanceVal < targetElCost) {
          alert("잔액이 부족합니다.");
        } else {
          this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElCost) + "원";

          for (const i of saveListItem) {
            if (targetEl.dataset.name === i.dataset.name) {
              i.querySelector("strong").textContent = parseInt(i.querySelector("strong").textContent) + 1;

              isSave = true;
              break;
            }
          }
          if (!isSave) {
            this.saveItemGenerator(targetEl);
          }
          targetEl.dataset.count--;
          if (!parseInt(targetEl.dataset.count)) {
            // 품절표시
            console.log("품절");
            targetEl.disabled = "disabled";
          }
        }
      });
    });
  }
}

export default BouquetMachineEvents;
