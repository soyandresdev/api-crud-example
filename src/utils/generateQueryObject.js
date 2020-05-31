function generateQueryObject(objectParams, extraQuerySelector) {
  return Object.keys(objectParams).reduce((act, paramQuery) => {
    const editAct = { ...act };
    if (paramQuery && Object.keys(extraQuerySelector).includes(paramQuery)) {
      const getExtraQuerySelector = extraQuerySelector[paramQuery];
      editAct[paramQuery] = {
        [getExtraQuerySelector.q]: getExtraQuerySelector.callback
          ? getExtraQuerySelector.callback(objectParams[paramQuery])
          : objectParams[paramQuery],
      };
      if (getExtraQuerySelector.$options) {
        editAct[paramQuery].$options = getExtraQuerySelector.$options;
      }
    }
    return editAct;
  }, {});
}

module.exports = generateQueryObject;
