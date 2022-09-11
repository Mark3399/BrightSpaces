#!/usr/bin/env node

import chalk from "chalk"
import chalkAnimation from 'chalk-animation'


const sleepLong = (ms = 1000) => new Promise((r) => setTimeout(r, ms))


let hero = {
    health: getRandomValue(70, 100),
    strength: getRandomValue(70, 80),
    defence: getRandomValue(45, 55),
    speed: getRandomValue(40, 50),
    luck: getRandomValue(10, 30),
}

let resilenceUsed = false;

async function start() {
    chalkAnimation.rainbow('Let the game begin... \n')
    let turnsLeft = 20;
    let villain = getVillain();

    await sleepLong();

    while (turnsLeft !== 0) {
        console.log(chalk.bgBlue(`Turns left: ${turnsLeft}`))
        console.log(chalk.bgYellow('Hero health: ' + hero.health))
        console.log(chalk.bgGrey('Villain health: ' + villain.health))


        let resilence = getRandomValue(1, 10) > 2 ? false : true;
        let critical = getRandomValue(1, 10) > 1 ? false : true;
        let superCritical = critical ? (getRandomValue(1, 100) > 1 ? false : true) : false
        let heroLuck = getRandomValue(1, 100) > hero.luck ? false : true;
        let villainLuck = getRandomValue(1, 100) > villain.luck ? false : true;

        if (resilenceUsed) {
            resilenceUsed = false;
            resilence = false;
        }

        if (resilence) {
            resilenceUsed = true;
        }


        handleBattle(hero, villain, resilence, critical, superCritical, heroLuck, villainLuck);


        await sleepLong();


        if (hero.health < 0) {
            break;
        }

        if (villain.health < 0) {
            hero = {
                health: getRandomValue(70, 100),
                strength: getRandomValue(70, 80),
                defence: getRandomValue(45, 55),
                speed: getRandomValue(40, 50),
                luck: getRandomValue(10, 30),
            }

            villain = getVillain();
            console.log('A new Villain has appeared!')
        }
        turnsLeft -= 1;
        console.log('\n')
    }

    if (turnsLeft === 0 && hero.health > 0) {
        console.log(chalk.bgMagentaBright('You won ! ( pretty much impossible )'))
    }

}

await start();

async function handleBattle(hero, villain, resilence, critical, superCritical, heroLuck, villainLuck) {
    const heroAttack = superCritical ? (hero.strength - villain.defence) * 3 : critical ? (hero.strength - villain.defence) * 2 : (hero.strength - villain.defence)
    const villainAttack = resilence ? (villain.strength - hero.defence) / 2 : (villain.strength - hero.defence)

    if (hero.speed > villain.speed) {
        if (critical) {
            console.log('Critical strike was used!')
        }
        if (!villainLuck) {
            villain.health = villain.health - heroAttack
            console.log(chalk.bgGreen(`Hero dealt ${heroAttack} damage`))
        }
        else {
            console.log('Villain was lucky and dodged the attack!')

        }
        if (villain.health < 0) {
            console.log(chalk.bgCyan(`Villain died !`))

            return;
        }

        if (resilence) {
            console.log('Resilence was used!')
        }

        if (!heroLuck) {

            hero.health = hero.health - villainAttack
            console.log(chalk.bgRed(`Villain dealt ${(villainAttack)} damage`))
        } else {
            console.log('Hero was lucky and dodged the attack!')

        }
        if (hero.health < 0) {

            console.log(chalk.bgRed(`You died !`))

            return;
        }
        return;
    }

    if (hero.speed < villain.speed) {
        if (resilence) {
            console.log('Resilence was used!')
        }
        if (!heroLuck) {

            hero.health = hero.health - villainAttack
            console.log(chalk.bgRed(`Villain dealt ${(villainAttack)} damage`))
        } else {
            console.log('Hero was lucky and dodged the attack!')

        }
        if (hero.health < 0) {

            console.log(chalk.bgRed(`You died !`))

            return;
        }
        if (critical) {
            console.log('Critical strike was used!')
        }
        if (!villainLuck) {
            villain.health = villain.health - heroAttack
            console.log(chalk.bgGreen(`Hero dealt ${heroAttack} damage`))
        }
        else {
            console.log('Villain was lucky and dodged the attack!')

        }
        if (villain.health < 0) {
            console.log(chalk.bgCyan(`Villain died !`))

            return;
        }

        return;
    }

    if (hero.speed === villain.speed) {
        if (hero.luck > villain.luck) {
            if (critical) {
                console.log('Critical strike was used!')
            }
            if (!villainLuck) {
                villain.health = villain.health - heroAttack
                console.log(chalk.bgGreen(`Hero dealt ${heroAttack} damage`))
            }
            else {
                console.log('Villain was lucky and dodged the attack!')

            }
            if (villain.health < 0) {
                console.log(chalk.bgCyan(`Villain died !`))

                return;
            }

            if (resilence) {
                console.log('Resilence was used!')
            }
            if (!heroLuck) {

                hero.health = hero.health - villainAttack
                console.log(chalk.bgRed(`Villain dealt ${(villainAttack)} damage`))
            } else {
                console.log('Hero was lucky and dodged the attack!')
                return;
            }
            if (hero.health < 0) {

                console.log(chalk.bgRed(`You died !`))


            }
            return;
        }

        if (hero.luck < villain.luck) {
            if (resilence) {
                console.log('Resilence was used!')
            }
            if (!heroLuck) {

                hero.health = hero.health - villainAttack
                console.log(chalk.bgRed(`Villain dealt ${(villainAttack)} damage`))
            } else {
                console.log('Hero was lucky and dodged the attack!')

            }
            if (hero.health < 0) {

                console.log(chalk.bgRed(`You died !`))

                return;
            }


            if (critical) {
                console.log('Critical strike was used!')
            }

            if (!villainLuck) {
                villain.health = villain.health - heroAttack
                console.log(chalk.bgGreen(`Hero dealt ${heroAttack} damage`))
            }
            else {
                console.log('Villain was lucky and dodged the attack!')

            }
            if (villain.health < 0) {
                console.log(chalk.bgCyan(`Villain died !`))

                return;
            }

            return;
        }
    }

}





function getRandomValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getVillain() {
    return {
        health: getRandomValue(60, 90),
        strength: getRandomValue(60, 90),
        defence: getRandomValue(40, 60),
        speed: getRandomValue(40, 60),
        luck: getRandomValue(25, 40),
    }
}