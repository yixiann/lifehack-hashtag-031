const URI = {
  test: 'api/test/'
}

export default URI

export const convertToFormData = (json) => {
  var bodyFormData = new FormData();
  var entries = Object.entries(json)
  console.log("ENT", entries)
  entries.forEach((item)=> {
    bodyFormData.append(item[0], item[1])
  })
  return bodyFormData
}