const loanTermVal = [
  {
    "code":12,
    "name": "12期"
  },
  {
    "code":24,
    "name": "24期"
  },
  {
    "code":36,
    "name": "36期"
  }
]
const backgroundMobileVal = {
  'background-image': 'url(../assets/img/pc-background.jpg)',
  'background-size': '100% 100%',
  'width': '100%',
  'height': '40%',
  'position': 'relative'
}
const backgroundPCVal = {
  'background-image': 'url(../assets/img/pc-background.jpg)',
  'background-size': '100% 100%',
  'width': '100%',
  'height': '100%',
}
const normalStyle = {
  'height': '40px',
  'background': '#B81C22',
  'color': '#fff',
  'border-color': '#B81C22'
}
const disableStyle = {
  'height': '40px',
  'background': '#CCCCCC',
  'color': '#fff',
  'border-color': '#CCCCCC'
}

// export default commonParam = {
//   loanTerm: loanTermVal,
//   backgroundMobile: backgroundMobileVal,
//   backgroundPC: backgroundPCVal,
//   normalStyle: normalStyle,
//   disableStyle: disableStyle
// }

var commonParam = (function () {
  return {
    loanTerm: loanTermVal,
    backgroundMobile: backgroundMobileVal,
    backgroundPC: backgroundPCVal,
    normalStyle: normalStyle,
    disableStyle: disableStyle
  }
})()