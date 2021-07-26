import { readFileSync } from 'fs'

export default (PATH) => {
    var script = readFileSync(PATH, 'utf8')
    script = script.replace(/(?:\\[rn]|[\r\n]+)+/g, " ")
    script = script. replace(/"/g, '\\"')
    return script
}