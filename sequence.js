const { buffer } = require("stream/consumers")

async function showDialogSequence(start, end) {
    for (var i = start; i <= end; i++) {
        await choicePrompt(`dialogo${i}`)
    }
}
async function fetchDialog(path) {
    await fetch(path)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            choices = data
        })
        .catch((error) => {
            console.log(error)
        })
}

var specialQuack
var specialDog

async function sequenceStart() {
    const intro = await choicePrompt("dialogo1")
    if (intro == "Matar!") {
        hideMenu()
        await fetchDialog("./dialogs/genocide.json")
        genocide01()
    }
    if (intro == "Não matar") {
        hideMenu()
        await fetchDialog("./dialogs/pacifistMain.json")
        pacifist01()
    }
}

async function pacifist01() {
    await showDialogSequence(1, 2)
    questText(0)
    trigger = () => {
        if (weapons.m1garand.active == true) { closeBuys(); pacifist02(); trigger = null }
    }
}

async function pacifist02() {
    let escolha02 = await choicePrompt("dialogo3")
    if (escolha02 == 'Se esconder e tentar colher informações.') {
        let escolha021 = await choicePrompt("dialogo4")
        if (escolha021 == "Direita") {
            await showDialogSequence(5, 9)
        } else if (escolha021 == "Esquerda") {
            await showDialogSequence(7, 9)
        }
    }
    if (escolha02 == 'Procurar uma rota de fuga.') {
        await choicePrompt("dialogo10")
    }
    if (escolha02 == "Ameaça-los.") {
        await showDialogSequence(11, 13)
    }
    if (escolha02 == "Você vê algo no chão...") {
        const randomItem = dumbItems.sort((a, b) => 0.5 - Math.random());
        choices.dialogo14.paragraph = [`*P pega o ${randomItem[0]} e usa ele para abrir a porta, após um pequeno estalo a porta está aberta,  ele entra e encontra a cozinha do prédio com uma janela aberta. P passa por está porta e segue em direção para fora da cidade. Saindo da cidade...*`]
        await choicePrompt("dialogo14")
    }
    await showDialogSequence(15, 16)
    questText(1)
    trigger = () => {
        if (points >= 200) {
            pacifist03()
            closeBuys()
            trigger = null
        }
    }
}

async function pacifist03() {
    console.log('test')
    const escolha03 = await choicePrompt("dialogo17")
    if (escolha03 == "Chegar com uma aproximação calma.") {
        await showDialogSequence(18, 20)
    }
    if (escolha03 == "Chegar apontando a pistola e demonstrar a intenção de conversar.") {
        await showDialogSequence(21, 23)
    }
    questText(2)
    trigger = () => {
        setTimeout(() => { pacifist04(); closeBuys() }, 10000)
        trigger = () => { return }
    }
}

async function pacifist04(value) {
    var asked = value
    var escolha04
    if (asked == true) {
        escolha04 = await choicePrompt("dialogo232")
    } else {
        escolha04 = await choicePrompt("dialogo231")
    }
    if (escolha04 == "Vocês já mataram alguém?") {
        await choicePrompt("dialogo24")
        pacifist04(true)
    }
    if (escolha04 == "O que é essa pulseira com números no nosso pulso?") {
        await choicePrompt("dialogo25")
        pacifist04(true)
    }
    if (escolha04 == "Vocês também tem um tipo de voz intrusiva?") {
        await choicePrompt("dialogo26")
        pacifist04(true)
    }
    if (escolha04 == 'Continuar') {
        await choicePrompt("dialogo38")
        questText(2)
        trigger = () => {
            if (weapons.ppsh41.active == true) { closeBuys(); pacifist05(); trigger = null }
        }
    }
}
async function pacifist05() {
    const escolha05 = await choicePrompt("dialogo39")
    if (escolha05 == "Sim") {
        await choicePrompt("dialogo40")
    }
    if (escolha05 == "Não") {
        await choicePrompt("dialogo42")
    }

    const escolha051 = await choicePrompt("dialogo41")
    if (escolha051 == "Escutar a voz e esperar no lado de fora") {
        await choicePrompt("dialogo43")
        questText(2)
        trigger = () => {
            if (weapons.ak74au.active == true) {
                setTimeout(() => {
                    closeBuys(); leftPacifist01();
                    if (weapons.borchardt.active == true) {
                        specialQuack = true
                    }
                }, 1000)
                trigger = null
            }
        }

    }
    if (escolha051 == "Entrar na caverna") {
        await showDialogSequence(45, 46)
        questText(2)
        trigger = () => {
            if (weapons.ak74au.active == true) {
                setTimeout(() => {
                    closeBuys(); rightPacifist01();
                    if (weapons.borchardt.active == true) {
                        specialQuack = true
                    }
                }, 1000)
                trigger = null
            }
        }
    }


}








async function leftPacifist01() {
    const escolha = await choicePrompt("dialogo44")
    if (escolha == "Tentar se afastar da caverna.") {
        await showDialogSequence(48, 49)
    }
    if (escolha == "Correr o mais rápido possível.") {
        await showDialogSequence(50, 51)
    }
    await showDialogSequence(58, 65)
    await fetchDialog('./dialogs/pacifistLeft.json')
    leftPacifist02()
}
async function leftPacifist02() {
    const escolha = await choicePrompt("dialogo1")
    if (escolha == "Em um prédio") {
        await showDialogSequence(2, 3)
        leftPacifist03()
    }
    if (escolha == "Em uma garagem") {
        await showDialogSequence(4, 5)
        leftPacifist08()
    }
}
async function leftPacifist03() {
    const escolha = await choicePrompt("dialogo6")
    if (escolha == "Manter meu código moral de não matar.") {
        await choicePrompt("dialogo7")
        await choicePrompt("dialogo10")
        leftPacifist04()
    }
    if (escolha == "A voz está certa, eu deveria matar eles.") {
        showDialogSequence(35, 36)
        showDialogSequence(11, 12)
        leftPacifist05()
    }
}
async function leftPacifist04() {
    const escolha = await choicePrompt("dialogo10")
    if (escolha == "Deixar os soldados te matar.") {
        await showDialogSequence(14, 16)
    }
    if (escolha == "Não deixar os soldados te matar.") {
        await showDialogSequence(17, 20)
    }
    await choicePrompt("dialogo20")
    if (specialQuack == true) {
        return quackEnding()
    }
    pacifistFinalGood()
    //FINAL

}
async function leftPacifist05() {
    const escolha = await choicePrompt("dialogo13")
    if (escolha == "Vai acabar dessa forma, não é a melhor mas finalmente acabou.") {
        await showDialogSequence(21, 22)
        leftPacifist06()
    }
    if (escolha == "Eu posso morrer, mas não pelas mãos deles.") {
        await showDialogSequence(23, 24)
        leftPacifist07()
    }
}
async function leftPacifist06() {
    const escolha = await choicePrompt("dialogo251")
    if (escolha == "Vão se f@$&!.") {
        await showDialogSequence(25, 26)
    }
    if (escolha == "Não me arrependo de nada.") {
        await showDialogSequence(27, 28)
    }
    //FINAL
    pacifistFinal()
}
async function leftPacifist07() {
    const escolha = await choicePrompt("dialogo251")
    if (escolha == "Vão se f@$&!.") {
        await showDialogSequence(29, 30)
    }
    if (escolha == "Não me arrependo de nada.") {
        await showDialogSequence(31, 32)
    }
    //FINAL
    pacifistFinal()
}
async function leftPacifist08() {
    const escolha = await choicePrompt("dialogo33")
    if (escolha == "Manter meu código moral de não matar.") {
        await choicePrompt("dialogo34")
        leftPacifist09()
    }
    if (escolha == "A voz está certa, eu deveria matar eles.") {
        await showDialogSequence(31, 32)
    }
}
async function leftPacifist08() {
    const escolha = await choicePrompt("dialogo37")
    if (escolha == "Deixar os soldados te matar.") {
    }
    if (escolha == "Não deixar os soldados te matar.") {
    }
    //FINAL
    if (specialQuack == true) {
        return quackEnding()
    }
    pacifistFinalGood()
}






async function rightPacifist01() {
    const escolha = await choicePrompt("dialogo47")
    if (escolha == "Esquerda") {
        await showDialogSequence(52, 53)
    }
    if (escolha == "Direita") {
        await showDialogSequence(54, 55)
    }
    await fetchDialog('./dialogs/pacifistRight.json')
    await showDialogSequence(1, 3)
    rightPacifist02()
}
async function rightPacifist02() {
    const escolha = await choicePrompt("dialogo4")
    if (escolha == "Manter meu código moral de não matar.") {
        await choicePrompt("dialogo5")
        rightPacifist03()
    }
    if (escolha == "A voz está certa, eu deveria matar eles.") {
        await showDialogSequence(6, 7)
        await showDialogSequence(9, 10)
        rightPacifist04()
    }
}
async function rightPacifist03() {
    const escolha = await choicePrompt("dialogo8")
    if (escolha == "Deixar os soldados te matar.") {
        await showDialogSequence(12, 14)
    }
    if (escolha == "Não deixar os soldados te matar.") {
        await showDialogSequence(15, 17)
    }
    await choicePrompt("dialogo22")

    if (specialQuack == true) {
        return quackEnding()
    }
    pacifistFinalGood()
    //FINAKL
}
async function rightPacifist04() {
    const escolha = await choicePrompt("dialogo11")
    if (escolha == "Vai acabar dessa forma, não é a melhor mas finalmente acabou.") {
        await showDialogSequence(18, 18)
        rightPacifist05()
    }
    if (escolha == "Eu posso morrer, mas não pelas mãos deles.") {
        await showDialogSequence(20, 20)
        rightPacifist06()
    }
}
async function rightPacifist05() {
    const escolha = await choicePrompt("dialogo19")
    if (escolha == "Vão se f@$&!.") {
        await showDialogSequence(23, 24)
        //final
    }
    if (escolha == "Não me arrependo de nada.") {
        await showDialogSequence(25, 26)
        //Finall
    }
    pacifistFinal()
}
async function rightPacifist06() {
    const escolha = await choicePrompt("dialogo21")
    if (escolha == "Vão se f@$&!.") {
        await showDialogSequence(27, 28)
        //FINAL
    }
    if (escolha == "Não me arrependo de nada.") {
        await showDialogSequence(29, 30)
        //FINAL
    }
    pacifistFinal()
}



async function pacifistFinal() {
    mainTheme.pause()
    endTheme.play()
    hideMenu()

    var part1 = false

    ending = true
    endingCanvasDraw = () => {
        var objects = []
        for (var i = 0; i < 20; i++) {
            if (part1 == false) {
                this.x = Math.floor(Math.random() * 100) - 50
                this.y = Math.floor(Math.random() * 100) - 50
                this.z = Math.floor(Math.random() * 100) - 50
            }
            if (part1 == true) {
                this.x = Math.floor(Math.random() * 1000) - 500
                this.y = Math.floor(Math.random() * 1000) - 500
                this.z = Math.floor(Math.random() * 1000) - 500
            }
            objects.push({ x: this.x, y: this.y, z: this.z })
        }
        for (var i = 0; i < objects.length; i++) {
            buffer3d.push()
            buffer3d.translate(objects[i].x, objects[i].y - 50, objects[i].z)
            buffer3d.rotateX(millis() * 0.001);
            buffer3d.rotateY(millis() * 0.001);
            buffer3d.box(Math.min((window.innerWidth / 6), 150), Math.min((window.innerWidth / 6), 150))
            buffer3d.pop()
        }

    }
    setTimeout(() => { part1 = true }, 2000)
}
async function pacifistFinalGood() {
    mainTheme.pause()
    endTheme.play()
    hideMenu()
}
async function quackEnding() {
    mainTheme.pause()
    endTheme.play()
    hideMenu()
}











async function genocide01() {
    await showDialogSequence(1, 4)
    const escolha = await choicePrompt("dialogo5")
    if (escolha == "Esperar os soldados no ponto de encontro deles.") {
        await choicePrompt("dialogo6")
        await showDialogSequence(14, 18)
    }
    if (escolha == "Esperar o melhor momento para atacar.") {
        await choicePrompt("dialogo7")
        escolha01 = await choicePrompt("dialogo8")
        if (escolha01 == "Esquerda") {
            await showDialogSequence(19, 22)
        }
        if (escolha01 == "Direita") {
            await showDialogSequence(23, 24)
        }
        await showDialogSequence(25, 28)
    }
    if (escolha == "Ameaçar eles.") {
        await showDialogSequence(9, 11)
    }
    if (escolha == "MATAR ELES!") {
        await showDialogSequence(12, 13)
    }

    questText(1)
    trigger = () => {
        if (weapons.mp40.active == true) {
            setTimeout(() => {
                closeBuys(); genocide02();
            }, 1000)
            trigger = null
        }
    }
}

async function genocide02() {
    await choicePrompt("dialogo29")
    const escolha = await choicePrompt("dialogo30")
    if (escolha == "Eles nos matariam?") {
        await showDialogSequence(31, 35)
    }
    if (escolha == "Eles nos matariam!") {
        await showDialogSequence(36, 43)
    }
    await showDialogSequence(44, 47)
    trigger = () => {
        if (weapons.ak74au.active == true) {
            setTimeout(() => {
                closeBuys(); genocide03();
                if (weapons.borchardt.active == true) {
                    specialDog = true
                }
            }, 1000)
            trigger = null
        }
    }
}

async function genocide03() {
    const escolha = await choicePrompt("dialogo48")
    if (escolha == "Ir para a cidade") {
        await showDialogSequence(49, 51)
    }
    if (escolha == "Fazenda") {
        await showDialogSequence(52, 54)
    }
    if (escolha == "Ir para o campo") {
        await showDialogSequence(55, 57)
    }
    genocide04()
}

async function genocide04() {
    const escolha = await choicePrompt("dialogo575")
    if (escolha == "Eu não sou você") {
        await showDialogSequence(58, 60)
        await showDialogSequence(65, 67)
    }
    if (escolha == "Eu sou você") {
        await showDialogSequence(61, 64)
        await choicePrompt("dialogo68")
    }

    if (specialDog == true) {
        return dogFinal()
    }
    genocideFinal()
}

async function genocideFinal() {
    mainTheme.pause()
    endTheme.play()
    hideMenu()
}
async function dogFinal() {
    mainTheme.pause()
    endTheme.play()
    hideMenu()
}