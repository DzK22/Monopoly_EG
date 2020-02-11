const Constants = require('../lib/constants');

/**
 * Représente un joueur dans une partie
 */
class Player {
    /**
     * @param id ID du joueur
     * @param user L'utilisateur associé au joueur
     * @param money L'argent de base accordé
     */
    constructor (id, user, money) {
        this.cellId = id;
        this.user = user;
        this.money = money;
        this.properties = [];
        this.jailJokerCards = 0;
        this.remainingTurnsInJail = 0;
    }

    /**
     * @return true si le joueur est en prison, false sinon
     */
    get isInPrison () {
        return this.remainingTurnsInJail > 0;
    }

    /**
     * @return le nombre de gares que possède le joueur
     */
    get trainStationsNb () {
        let nb = 0;
        for (const prop of this.properties) {
            if (pop.type === Constants.PROPRERTY_TYPE.TRAIN_STATION)
                nb ++;
        }

        return nb;
    }

    goPrison () {
        this.remainingTurnsInJail = 3;
    }

    /**
     * @param prop La propriété à ajouter au joueur
     */
    addProperty (prop) {
        this.properties.push(prop);
    }

    /**
     * @param prop La propriété à supprimer du joueur
     */
    delProperty (prop) {
        const ind = this.properties.indexOf(prop);
        if (ind !== -1)
            this.properties.splice(ind, 1);
    }

    /**
     * @param color La couleur recherchée de type PROPERTY_COLOR (constants)
     * @return le nombre de rues de couleur color du joueur
     */
    sameStreetColorNb (color) {
        let nb = 0;
        for (const prop of this.properties) {
            if (prop.type === Constants.PROPERTY_TYPE.STREET && prop.color === color)
                nb ++;
        }
        return nb;
    }
}

module.exports = Player;