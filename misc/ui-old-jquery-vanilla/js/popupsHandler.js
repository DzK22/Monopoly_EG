$(document).ready(function () {
    $('.popup').hide();
})

$('.player-list').on('click', '.player-entry', function (e) {
    const popup = $(this).find('.popup');
    if (popup.is(':visible')) {
        popup.toggle();
    }
    else {
        $('.popup').hide();
        popup.show();
    }
    e.stopPropagation();
});

$('.player-list').on('mouseenter', '.property', function (e) {
    $(this).children().hide();
    const propContain = $(this).parent();
    const propertyId = $(this).attr('data-id');
    if (!propertyId) {
        console.log("id_property==null");
        return;
    }
    let property = getPropertyById(propertyId);
    if (!property)
        return;


    const isMine = (property.ownerID == ID);
    const isMortgage = property.isMortgage;

    var build = '';
    var gProp;

    if (!(propContain.find('.blank-property').length || propContain.hasClass('station') || propContain.hasClass('company') || propContain.parent().parent().attr('data-id') != ID)) {
        build = `<button class="minus">-</button>
                <i class="fas fa-home">1</i>
                <button class="plus">+</button>`
    }

    if (isMine) {
        gProp = `<button class="sellProp" onclick="openSellModal($(this).parent().parent().attr('data-id'));" >VENDRE</button>`
        if (isMortgage) {
            gProp += `<button class="rebuyProp" onclick="rebuyProp(this)" >RACHETER</button>`
        }
        else {
            gProp += `<button class="mortgageProp" onclick="mortgageProp(this)" >HYPOTHEQUER</button>`
        }
    }
    else {
        gProp = `<button class="buyProp"  onclick="openBuyModal($(this).parent().parent().attr('data-id'));">ACHETER</button>`
    }

    const html = `<div id="houseOption">`
        + build + gProp +
        `</div>`
    $(this).append(html);

    //overview card
    displayPropertyInfos(property);

});

$('.player-list').on('mouseleave', '.property', function (e) {
    $(this).find('#houseOption').remove();
    $(this).children().show();

    var oc = $(".overview-card");
    oc.hide();
});

$('.player-list').on('click', '.minus', function (e) {
    const nbHouse = parseInt($(this).parent().find('.fa-home').text());
    if (nbHouse > 1) {
        $(this).parent().find('.fa-home').text(nbHouse - 1);
    }

    e.stopPropagation();
});

$('.player-list').on('click', '.plus', function (e) {
    const nbHouse = parseInt($(this).parent().find('.fa-home').text());
    if (nbHouse < 4) {
        $(this).parent().find('.fa-home').text(nbHouse + 1);
    }

    e.stopPropagation();
});

$('.player-list').on('click', '.popup', function (e) {
    e.stopPropagation();
});


$(document).on('click', function (e) {
    var container = $(".popup");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

function initProperty() {
    const html = `
        <div class="properties-container yellow">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container red">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container blue">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container orange">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container purple">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container brown">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container cyan">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container green">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container station">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
        <div class="properties-container company">
            <div class="blank-property"></div>
            <div class="blank-property"></div>
        </div>
    `;
    $('.popup').each(function () {
        $(this).prepend(html);
    });
}

function createProperty(playerID, type, roadName, roadID) {
    const roadHtml = `<div class="property-name">` + roadName + `</div>`
    if (roadName == "Syndicat Des Eaux et de l'Assainissement") {
        html = `<div class="property eau" data-id="` + roadID + `">`
            + roadHtml +
            `</div>`;
    }
    else if (roadName == 'El??ctricit?? de Strasbourg') {
        html = `<div class="property electricite" data-id="` + roadID + `">`
            + roadHtml +
            `</div>`;
    }
    else {
        html = `<div class="property" data-id="` + roadID + `">`
            + roadHtml +
            `</div>`;
    }
    $('.player-entry[data-id="' + playerID + '"]').find('.' + type).find('.blank-property').first().remove();;
    $('.player-entry[data-id="' + playerID + '"]').find('.' + type).prepend(html);
    $('.player-entry[data-id="' + playerID + '"]').find('.' + type).show();
}

function delProperty(roadID) {
    html = '<div class="blank-property"></div>';
    $('.property[data-id="' + roadID + '"]').parent().append(html);
    $('.property[data-id="' + roadID + '"]').remove();

    $('.properties-container').each(function () {
        if (!($('.property', this).length > 0)) {
            $(this).hide();
        }
    });
}

function createSaleCard(propertyID, type, roadName, price, disabled) {
    let newType;
    if (type == 'company') {
        if (roadName == "Syndicat Des Eaux et de l'Assainissement") {
            newType = 'company eau';
        } else if (roadName == 'El??ctricit?? de Strasbourg') {
            newType = 'company electricite';
        }
    } else {
        newType = type;
    }

    let html = `<div class="card notification sale` + (disabled ? ' disabled' : '') + `" data-property-id="` + propertyID + `" style="display: none;">
                    <div class="card-header ` + newType + `">
                        <div class="title">` + roadName + `</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 text-center value">
                                <p class="state">?? VENDRE</p>
                                <p>` + price + `???</p>
                            </div>
                        </div>
                        <button class="btn btn-primary` + (disabled ? '' : ' accept') + `">ACHETER</button>
                        <button class="btn btn-secondary` + (disabled ? '' : ' reject') + `"">NE RIEN FAIRE</button>
                    </div>
                </div>`;

    $(html).appendTo('.notification-container > .col-md-12').fadeIn('fast');
}

function createUpgradeCard(propertyID, type, roadName, disabled) {
    let newType;
    if (type == 'company') {
        if (roadName == 'Eau') {
            newType = 'company eau';
        }
        else if (roadName == '??lectricit??') {
            newType = 'company electricite';
        }
    }
    else {
        newType = type;
    }

    let html = `<div class="card notification upgrade` + (disabled ? ' disabled' : '') + `" data-property-id="` + propertyID + `" style="display: none;">
                    <div class="card-header ` + newType + `">
                        <div class="title">` + roadName + `</div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 text-center value">
                                <p class="state">AM??LIORER</p>
                                <p>Vous pouvez am??liorer votre propri??t?? :</p>
                                <input class="property-upgrade-level" value="` + propertyLevel + `" type="number">
                            </div>
                        </div>
                        <button class="btn btn-primary` + (disabled ? '' : ' accept') + `">AMELIORER</button>
                        <button class="btn btn-secondary` + (disabled ? '' : ' reject') + `"">NE RIEN FAIRE</button>
                    </div>
                </div>`;

    $(html).appendTo('.notification-container > .col-md-12').fadeIn('fast');
}

function createTextCard(text, disabled, type, title) {
    let html;
    if (title == undefined) {
        html = `<div class="card notification event ` + (disabled ? ' disabled' : '') + `" style="display: none;">
                    <div class="card-body no-header">
                        <div class="col-md-12 text-center value">
                            <p>` + text + `</p>
                        </div>
                        ` + (disabled ? '' : '<button class="btn btn-primary reject">OK</button>') + `
                    </div>
                </div>`;
    } else {
        html = `<div class="card notification event ` + (disabled ? ' disabled' : '') + `" style="display: none;">
                    <div class="card-header ` + type + `">
                        <div class="title">` + title + `</div>
                    </div>
                    <div class="card-body">
                        <div class="col-md-12 text-center value">
                            <p>` + text + `</p>
                        </div>
                        ` + (disabled ? '' : '<button class="btn btn-primary reject">OK</button>') + `
                    </div>
                </div>`;
    }

    $(html).appendTo('.notification-container > .col-md-12').fadeIn('fast');
}

/**
 * G??n??re une popup pour la gestion d'une ench??re
 * @param {int} id id de la popup d'ench??re !DOIT ??TRE UNIQUE!
 * @param {string} playername nom du vendeur
 * @param {string} streetname nom de la rue mise en ench??res
 * @param {int} startingprice prix minimal de l'ench??re si d??clench??e par un eutre joueur
 */
function openBidPopup(id, playername, streetname, startingprice) {
    if (playername == "undefined") {
        var html =
            `<div class="bid-popup" data-bidID="` + id + `">
            <div class="bid-form">
                <div class="content">Une ench??re est lanc??e pour ` + streetname + `</div>
                <div class="bid-input">
                    <input type="text" placeholder="Prix"></input>???
                    <button disabled='disabled' class="bid-validation" >Ench??rir</button>
                    <button class="bid-cancel">Passer</button>
                </div>
            </div>
        </div>`;
    }
    else {
        var html =
            `<div class="bid-popup" data-bidID="` + id + `">
            <div class="bid-form">
                <div class="content">` + playername + ` lance une ench??re pour ` + streetname + `. Prix de d??part : ` + startingprice + `</div>
                <div class="bid-input">
                    <input type="text" placeholder="Prix"></input>???
                    <button disabled='disabled' class="bid-validation" >Ench??rir</button>
                    <button class="bid-cancel" >Passer</button>
                </div>
            </div>
        </div>`;
    }

    $(html).prependTo('#bid-popup-container').fadeIn(500);
}

/**
 * Valide la saisie
 * @param {int} id id de la popup d'ench??re ?? valider
 */
function validateBid(id) {
    $('*[data-bidID="' + id + '"]').find('input').prop('disabled', true);
    $('*[data-bidID="' + id + '"]').find('button').prop('disabled', true);

}

/**
 * Ferme la popup poss??dant l'identifiant id
 * @param {int} id id de la popup d'ench??re ?? fermer
 */
function closeBidPopup(id) {
    $('*[data-bidID="' + id + '"]').fadeOut(500, function () { $(this).remove(); });
}

/**
 * Ajoute un message d'information ?? une popup d'ench??res
 * @param {*} id id de la popup
 * @param {*} message message ?? afficher
 */
function addBidInfo(id, message) {
    var html = `<div class="bid-info">` + message + `</div>`;
    $('*[data-bidID="' + id + '"]').append(html);
}

/**
 * Active ou d??sactive le bouton "ench??rir" en fonction de l'input
 */
$('#bid-popup-container').on('keyup', '.bid-input input', function (e) {
    let empty = false;

    empty = $(this).val().length == 0;

    if (empty)
        $(this).parent().find('.bid-validation').attr('disabled', 'disabled');
    else
        $(this).parent().find('.bid-validation').attr('disabled', false);
});

$('#bid-popup-container').on('keypress', '.bid-input input', function (e) {
    if (e.which < 48 || e.which > 57)
    {
        e.preventDefault();
    }
});
