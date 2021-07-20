export default class ResponseBody {
  constructor (isError,message) {
    this.message = message
    this.error = isError
  }
}
//React Production + NodeJS
//Front end static
//Both are running on same server

