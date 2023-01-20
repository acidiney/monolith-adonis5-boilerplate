notie.setOptions({
  alertTime: 3,
  dateMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  overlayClickDismiss: true,
  overlayOpacity: 0.75,
  transitionCurve: 'ease',
  transitionDuration: 0.35,
  transitionSelector: 'all',
  classes: {
    container: 'notie-container',
    textbox: 'notie-textbox',
    textboxInner: 'notie-textbox-inner',
    button: 'btn',
    element: 'notie-element',
    elementHalf: 'notie-element-half',
    elementThird: 'notie-element-third',
    overlay: 'notie-overlay',
    backgroundSuccess: 'text-success',
    backgroundWarning: 'text-warning',
    backgroundError: 'text-danger',
    backgroundInfo: 'text-white',
    backgroundNeutral: 'text-white',
    backgroundOverlay: 'notie-overlay',
    alert: 'notie-alert',
    inputField: 'form-control',
    selectChoiceRepeated: 'notie-select-choice-repeated',
    dateSelectorInner: 'notie-date-selector-inner',
    dateSelectorUp: 'notie-date-selector-up'
  },
  ids: {
    overlay: 'notie-overlay'
  },
  positions: {
    alert: 'bottom',
    force: 'bottom',
    confirm: 'bottom',
    input: 'bottom',
    select: 'bottom',
    date: 'bottom'
  }
});
