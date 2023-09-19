class BouquetMachineEvents {
  constructor() {
    // section1
    const vMachine = document.querySelector(".section1");
    this.balance = vMachine.querySelector("#balance");
    this.btnBalance = vMachine.querySelector(".bg-box+.btns");
    this.inputCostEl = vMachine.querySelector("#input-money");
    this.btnDeposit = vMachine.querySelector("#input-money+.btns");
    // section2
    const myInfo = document.querySelector(".section2");
    this.myMoney = myInfo.querySelector("#myMoney");
    // section3
    const getInfo = document.querySelector(".section3");
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

      this.myMoney.textContent = new Intl.NumberFormat().format(myMoneyVal + balanceVal) + "원";
      this.balance.textContent = 0 + "원";
    });
  }
}

export default BouquetMachineEvents;
