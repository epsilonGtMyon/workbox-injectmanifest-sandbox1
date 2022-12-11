(function () {
  const monthRecordElem = document.getElementById("monthRecord");
  const monthRecordElemTbody = monthRecordElem.querySelector("tbody");
  let currentDispMonth;

  const navTitleElem = document.getElementById("navTitle");
  const previousMonthElem = document.getElementById("previousMonth");
  const nextMonthElem = document.getElementById("nextMonth");

  //------------------------------

  /**
   * 日付変換
   * @param {Date} date
   * @returns
   */
  function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = `0${date.getMonth() + 1}`.slice(-2);
    const dd = `0${date.getDate()}`.slice(-2);
    return `${yyyy}${mm}${dd}`;
  }
  function reverseFormattedDate(yyyymmddDate) {
    const yyyy = Number(yyyymmddDate.slice(0, 4));
    const mm = Number(yyyymmddDate.slice(4, 6));
    const dd = Number(yyyymmddDate.slice(6, 8));

    const d = new Date(yyyy, mm - 1, dd);
    return d;
  }

  function firstOfDate(date) {
    const d = new Date(date);
    d.setDate(1);
    return d;
  }

  /**
   * 詳細へ移動
   * @param {*} param0
   */
  function moveToDetail({ formattedDate }) {
    Parameters.setDetailParamDate(formattedDate)
    location.href = `../detail/index.html`;
  }

  /**
   * テーブルクリア
   */
  function clearTable() {
    while (monthRecordElemTbody.firstChild) {
      monthRecordElemTbody.removeChild(monthRecordElemTbody.firstChild);
    }
  }

  /**
   * テーブルへのレコード追加
   * @param {*} param0
   */
  function addRecord({ date, formattedDate, today, holiday, contentText }) {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");

    const dayOfWeekNumber = date.getDay();
    const weekList = ["日", "月", "火", "水", "木", "金", "土"];
    const week = weekList[dayOfWeekNumber];

    const dateText = `${date.getDate()}(${week})`;

    if (dayOfWeekNumber === 0) {
      tr.classList.add("is-sunday");
    } else if (dayOfWeekNumber === 6) {
      tr.classList.add("is-saturday");
    }
    if (today) {
      tr.classList.add("is-today");
    }
    if (holiday) {
      tr.classList.add("is-holiday");
    }

    tr.onclick = () => moveToDetail({ formattedDate });
    td1.textContent = dateText;
    td1.style.width = '100px'
    td2.textContent = contentText;
    tr.append(td1);
    tr.append(td2);
    monthRecordElemTbody.append(tr);
  }

  /**
   * その月の日付を列挙
   * @param {Date} monthDate
   * @returns
   */
  function listDays(monthDate) {
    const resultDays = [];

    for (let i = 0; i < 32; i++) {
      const d = new Date();
      d.setTime(monthDate.getTime());
      d.setDate(1 + i);

      if (d.getMonth() !== monthDate.getMonth()) {
        //月がかわったので月末までいってる
        break;
      }

      d.setHours(0);
      d.setMinutes(0);
      d.setSeconds(0);
      d.setMilliseconds(0);

      resultDays.push(d);
    }
    return resultDays;
  }

  async function load(baseDate) {
    const today = new Date();
    const todayText = formatDate(today);

    const monthFirstDate = firstOfDate(new Date(baseDate));
    const monthLastDate = new Date(monthFirstDate);
    monthLastDate.setMonth(monthLastDate.getMonth() + 1);
    monthLastDate.setDate(monthLastDate.getDate() - 1);
    const monthFirstText = formatDate(monthFirstDate);
    const monthLastText = formatDate(monthLastDate);

    //DB
    const db = DbHolder.getDb();
    const moneys = (
      await db.money
        .where("date")
        .between(monthFirstText, monthLastText, true, true)
        .toArray()
    ).reduce((map, m) => {
      map.set(m.date, m);
      return map;
    }, new Map());

    clearTable();
    const days = listDays(baseDate);
    days.forEach((d) => {
      const yyyymmdd = formatDate(d);
      const money = moneys.get(yyyymmdd);
      const contentText = money ? `￥${money.total}` : "";

      addRecord({
        date: d,
        formattedDate: yyyymmdd,
        today: yyyymmdd === todayText,
        contentText,
      });
    });

    //タイトル更新
    navTitleElem.textContent = `${monthFirstText.slice(
      0,
      4
    )}/${monthFirstText.slice(4, 6)}`;
    Parameters.setListBaseDate(monthFirstText)
  }

  async function previousMonth() {
    const d = new Date(currentDispMonth);
    d.setMonth(d.getMonth() - 1);
    currentDispMonth = d;

    await load(currentDispMonth);
  }

  async function nextMonth() {
    const d = new Date(currentDispMonth);
    d.setMonth(d.getMonth() + 1);
    currentDispMonth = d;

    await load(currentDispMonth);
  }

  previousMonthElem.addEventListener("click", previousMonth);
  nextMonthElem.addEventListener("click", nextMonth);

  //--------------------------

  const paramDate = Parameters.getListBaseDate()
  if (paramDate) {
    currentDispMonth = reverseFormattedDate(paramDate);
  } else {
    currentDispMonth = firstOfDate(new Date());
  }

  load(currentDispMonth);
})();
