const URI = {
  test: 'api/test/',
  signIn: 'token-auth/',
  createUser: 'api/user/',

  signInRefresh: 'token-auth-refresh/'
}

export default URI

export const convertToFormData = (json) => {
  var bodyFormData = new FormData();
  var entries = Object.entries(json)
  entries.forEach((item)=> {
    bodyFormData.append(item[0], item[1])
  })
  return bodyFormData
}