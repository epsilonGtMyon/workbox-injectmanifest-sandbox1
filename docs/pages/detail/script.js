(function () {
  // ================================
  // constants
  const cardTemplate = `
<div class="col s12 m6 moneyDetail">
  <div class="card hoverable blue darken-4">
    <div class="card-content white-text">
      <span class="card-title moneyDetail-title"></span>
      <p>金額：<span class="moneyDetail-amount"></span></p>
      <p>メモ：<span class="moneyDetail-memo"></span></p>
    </div>
    <div class="card-action">
      <a href="#" class="moneyDetail-modify">修正</a>
      <a href="#" class="moneyDetail-delete">削除</a>
    </div>
  </div>
</div>
  `;

  // ================================
  // parameter
  const formattedDateText = Parameters.getDetailParamDate();

  // ================================
  // DOM
  
  const navTitleElem = document.getElementById("navTitle");
  const moneyDetailContainerElem = document.getElementById(
    "moneyDetailContainer"
  );
  const addRecordElem = document.getElementById("addRecord");
  // ----modal----
  const detailInputTitleElem = document.getElementById("detailInputTitle");
  const detailInputAmountElem = document.getElementById("detailInputAmount");
  const detailInputMemoElem = document.getElementById("detailInputMemo");
  const detailInputOkElem = document.getElementById("detailInputOk");
  const detailInputCancelElem = document.getElementById("detailInputCancel");


  // ================================
  // state

  let moneyRecord = {
    date: formattedDateText,
    records: [],
    total: 0,
  };
  let modalInstance;
  let currentEditingIndex = -1;

  async function init() {
    navTitleElem.textContent = `${formattedDateText.slice(0, 4)}/${formattedDateText.slice(4, 6)}/${formattedDateText.slice(6)}`
    
    const elems = document.querySelectorAll(".modal");
    modalInstance = M.Modal.init(elems, {
      // specify options here
    })[0];

    const db = DbHolder.getDb();

    const dbMoneyRecord = await db.money.get(formattedDateText);
    if (dbMoneyRecord == null) {
      return;
    }
    moneyRecord = dbMoneyRecord;

    rerender();
  }

  function rerender() {
    while (moneyDetailContainerElem.firstChild) {
      moneyDetailContainerElem.removeChild(moneyDetailContainerElem.firstChild);
    }

    let index = 0;
    for (let record of moneyRecord.records) {
      const scopedIndex = index;
      const div = document.createElement("div");
      moneyDetailContainerElem.append(div);
      div.outerHTML = cardTemplate;

      const div2 = moneyDetailContainerElem.lastElementChild;
      div2.querySelector(".moneyDetail-title").textContent = record.title;
      div2.querySelector(".moneyDetail-amount").textContent = record.amount;
      div2.querySelector(".moneyDetail-memo").textContent = record.memo;

      div2
        .querySelector(".moneyDetail-modify")
        .addEventListener("click", (e) => {
          e.preventDefault();

          currentEditingIndex = scopedIndex;
          applyModalValue(record.title, record.amount, record.memo);
          modalInstance.open();
          M.updateTextFields();
        });
      div2
        .querySelector(".moneyDetail-delete")
        .addEventListener("click", async (e) => {
          e.preventDefault();
          if (!confirm("削除しますか？")) {
            return;
          }
          
          moneyRecord.records.splice(scopedIndex, 1);
          moneyRecord.total = moneyRecord.records.reduce(
            (sum, c) => sum + c.amount,
            0
          );

          //DB保存&再描画
          await registerDb();
          rerender();
        });

      index++;
    }
  }

  async function registerDb() {
    const db = DbHolder.getDb();
    await db.money.put(moneyRecord);
  }

  // 新規追加
  addRecordElem.addEventListener("click", () => {
    currentEditingIndex = -1;
    modalInstance.open();
    M.updateTextFields();
  });

  // --------------------
  // モーダル
  function applyModalValue(title, amount, memo) {
    detailInputTitleElem.value = title;
    detailInputAmountElem.value = String(amount);
    detailInputMemoElem.value = memo;
  }
  function clearModal() {
    detailInputTitleElem.value = "";
    detailInputAmountElem.value = "";
    detailInputMemoElem.value = "";
  }

  // 登録
  detailInputOkElem.addEventListener("click", async (e) => {
    e.preventDefault();

    const title = detailInputTitleElem.value;
    const amountText = detailInputAmountElem.value;
    const memo = detailInputMemoElem.value;

    //バリデーション
    const errors = [];
    if (title === "") {
      errors.push("タイトルを入れてください");
    }
    if (amountText === "") {
      errors.push("金額を入れてください");
    } else if (!/-?[0-9]+/g.test(amountText)) {
      errors.push("金額は数値を入れてください");
    }
    if (errors.length > 0) {
      alert(errors.join("\r\n"));
      return;
    }

    //モーダル閉じる
    clearModal();
    modalInstance.close();

    //状態を反映
    const record = {
      title,
      amount: Number(amountText),
      memo,
    };

    if (currentEditingIndex >= 0) {
      moneyRecord.records[currentEditingIndex] = record;
    } else {
      moneyRecord.records.push(record);
    }
    moneyRecord.total = moneyRecord.records.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    //DB保存&再描画
    await registerDb();
    rerender();
  });

  // キャンセル
  detailInputCancelElem.addEventListener("click", (e) => {
    e.preventDefault();

    clearModal();
    modalInstance.close();
  });

  init();
})();
