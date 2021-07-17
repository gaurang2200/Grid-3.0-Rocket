import { readFileSync } from 'fs';

export default (PATH) => {
    var script = readFileSync(PATH, 'utf8');
    script = script.replace(/(?:\\[rn]|[\r\n]+)+/g, " ");
    script = script. replace(/"/g, '\\"');
    // console.log(script);
    return script;
}

// minify("/home/kaguya/Grid-3.0-Rocket/scripts/windows.ps1")