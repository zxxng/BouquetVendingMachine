class BouquetMachineEvents {
  constructor() {
    // section1
    const vMachine = document.querySelector(".section1");
    this.balance = vMachine.querySelector("#balance");
    this.btnBalance = vMachine.querySelector(".bg-box+.btns");
    this.inputPriceEl = vMachine.querySelector("#input-money");
    this.btnDeposit = vMachine.querySelector("#input-money+.btns");
    this.saveList = vMachine.querySelector(".get-list");
    this.btnGet = vMachine.querySelector(".get-list+.btns");
    // section2
    const myInfo = document.querySelector(".section2");
    this.myMoney = myInfo.querySelector("#myMoney");
    // section3
    const getInfo = document.querySelector(".section3");
    this.getList = getInfo.querySelector(".get-list");
    this.total = getInfo.querySelector(".total");
  }

  // 장바구니 생성 함수
  saveItemGenerator(target) {
    const saveItem = document.createElement("li");
    saveItem.className = "get-item";
    saveItem.dataset.name = target.dataset.name;
    saveItem.dataset.price = target.dataset.price;
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
      const inputMoney = parseInt(this.inputPriceEl.value);
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
        this.inputPriceEl.value = "";
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
        const balanceVal = parseInt(this.balance.textContent.replaceAll(",", ""));
        const targetEl = event.target.closest("button");
        const targetElPrice = parseInt(targetEl.dataset.price);
        const saveListItem = this.saveList.querySelectorAll("li");
        let isSave = false;

        if (balanceVal < targetElPrice) {
          alert("잔액이 부족합니다.");
        } else {
          event.target.closest("li").className = "item active";
          this.balance.textContent = new Intl.NumberFormat().format(balanceVal - targetElPrice) + "원";

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
            targetEl.insertAdjacentHTML(
              "beforeEnd",
              `
								<strong class="soldout">
									<span>품절</span>
								</strong>
							`
            );
            targetEl.disabled = "disabled";
          }
        }
      });
    });

    /**
     * [획득 버튼]
     * 1. 획득한 상품 리스트 추가
     * 2. 장바구니 초기화
     * 3. 총 금액 업데이트
     */
    this.btnGet.addEventListener("click", () => {
      const saveItemList = this.saveList.querySelectorAll("li");
      const getItemList = this.getList.querySelectorAll("li");

      for (const saveItem of saveItemList) {
        let isGet = false;
        for (const getItem of getItemList) {
          if (saveItem.dataset.name === getItem.dataset.name) {
            // 획득한 상품 카운트 증가
            getItem.querySelector("strong").textContent = parseInt(getItem.querySelector("strong").textContent) + parseInt(saveItem.querySelector("strong").textContent);

            isGet = true;
            break;
          }
        }
        if (!isGet) {
          this.getList.append(saveItem);
        }
      }
      // 장바구니 초기화
      this.saveList.innerHTML = null;
      // 총금액 계산
      let totalPrice = 0;
      this.getList.querySelectorAll("li").forEach((getItem) => {
        totalPrice += parseInt(getItem.dataset.price) * parseInt(getItem.querySelector("strong").textContent);
      });
      this.total.textContent = `총금액 : ${new Intl.NumberFormat().format(totalPrice)} 원`;
    });
  }
}

export default BouquetMachineEvents;
