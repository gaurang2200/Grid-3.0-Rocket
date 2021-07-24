const KibanaModel = {
  get
}

export default KibanaModel

async function get() {
  return { status:200, error:false, message:process.env.ELASTICSEARCH_NODE }
}
