

export default function responseBody(isError=false,message='') {
  return {error:isError,message:message}
}