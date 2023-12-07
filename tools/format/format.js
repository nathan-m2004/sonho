const fs = require('fs')

var text
var obj = {}
const dialogo = {
    image: '',
    buttons: [{ text:'Continuar' }]
}

fs.readFile('input.txt', (err, data) => {
    if (err) throw err;
 
    text = data.toString();
    format()
})

function format() {
    text = [...text.split('\r\n')]
    console.log(text.length)
    obj['dialogo1'] = Object.create(dialogo)
    var id = 2

    text.forEach((element, index) => {
        if ([...element][0] == '*') {
            text[index] = '<br>' + element + '<br>'
            //text.splice(index, 1)
        }
        }
    )

    for (var index = 0; index < text.length; index++){
        element = text[index]
        if (element == '') {
            obj[`dialogo${id}`] = Object.create(dialogo)
            obj[`dialogo${id-1}`].paragraph = text.slice(0, index)
            text.splice(0, index+1)
            id++
            index = 0
        }
    }

    Object.keys(obj).forEach((element, index) => {
        obj[element] = Object.assign(obj[element], dialogo)
    })

    write()
}

function write() {
    fs.writeFile("./output.json", JSON.stringify(obj, null, 2), (error) => {
        if (error) {
          console.log('An error has occurred ', error);
          return;
        }
        console.log('Data written successfully to disk');
      });
}