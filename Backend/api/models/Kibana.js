const KibanaModel = {
  get
}

export default KibanaModel

async function get() {
  return { status:200, isError:false, message:process.env.KIBANA_URL }
}
