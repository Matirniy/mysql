export function generate(x, b) {
    var MD5 = require("crypto-js/md5");
    let str = '';
    let first = 0;
    let number = 0;
    let last = 0;
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    first = b+1;
    number = parseInt(x);
    last = first + number;
    for (first; first < last; first++) {
        let leng = Math.round(Math.random() * (10 - 4) + 4);
        let login = '';
        let pass = '';
        for (let i = 0; i < leng; i++) {
            login += characters.charAt(Math.floor(Math.random() * characters.length));
            pass += (Math.round(Math.random() * (10 - 1) + 1));
        }
        pass=MD5(pass);
        str += first + ';' + login + ';' + pass + ';' + '4' + '.';
    }
    
    var FileSaver = require('file-saver');
    var blob = new Blob([str], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "generateData.txt");
}

export default generate;