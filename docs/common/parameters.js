const Parameters = (function () {
  //generateSWを使っていてクエリパラメータつけて遷移した場合に
  //別のファイルと判断されてキャッシュから取得できないのでsessionStorageで遷移情報やり取りするようにしている

  const LIST_BASE_DATE = "list:baseDate";
  const DETAIL_PARAM_DATE = "detail:paramDate";

  function getListBaseDate() {
    return sessionStorage.getItem(LIST_BASE_DATE);
  }

  function setListBaseDate(listBaseDate) {
    sessionStorage.setItem(LIST_BASE_DATE, listBaseDate);
  }

  function removeListBaseDate() {
    sessionStorage.removeItem(LIST_BASE_DATE);
  }

  function getDetailParamDate() {
    return sessionStorage.getItem(DETAIL_PARAM_DATE);
  }

  function setDetailParamDate(detailParamDate) {
    sessionStorage.setItem(DETAIL_PARAM_DATE, detailParamDate);
  }

  return {
    getListBaseDate,
    setListBaseDate,
    removeListBaseDate,
    getDetailParamDate,
    setDetailParamDate,
  };
})();
