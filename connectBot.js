//fichier contenant les infos d'authentification
var conf = require(__dirname + '\\conf.json')

//on recherche la solution cible
var solution = ""
conf.solutions.forEach(function (val, index, array){
    if(process.argv[2] === conf.solutions[index].name){ solution = conf.solutions[index] }
    }
)

//lancement du bot

const puppeteer = require("puppeteer")

const launchAction = async () => {
  
    const browser = await puppeteer.launch({ 
      headless: false, 
      defaultViewport: null,
      args: ['--start-maximized']
  })

  //authentification
  const page = await browser.newPage()
  await page.goto(solution.url)
  await page.waitFor('input[name="uid"]')
  await page.click('input[name="uid"]')
  await page.keyboard.sendCharacter(solution.id)
  await page.click('input[name="pwd"]')
  await page.keyboard.sendCharacter(solution.mdp)
  await page.click('button[name="LogIn"]')

  //débloquer builder
  await page.goto(solution.url + "/go.aspx?u=/adm/builder&btm=1")
  if(solution.socle === "8.2"){ await page.click('a[href="#"]') }
  await page.waitFor('input[id="pwd"]')
  await page.keyboard.sendCharacter('igrekheu')
  await page.click('button[type="BUTTON"]')

  //débloquer dev mode
  await page.waitFor('a[href="go.aspx?u=/Adm/builder&su=adm%21%2D1&pm=0&sbm=13&Action=dvlpwd"]')
  await page.click('a[href="go.aspx?u=/Adm/builder&su=adm%21%2D1&pm=0&sbm=13&Action=dvlpwd"]')
  await page.waitFor('input[type="PASSWORD"]')
  await page.click('input[type="PASSWORD"]')
  await page.keyboard.sendCharacter('easiCRM.42')
  await page.click('button[type="BUTTON"]')
}

launchAction()