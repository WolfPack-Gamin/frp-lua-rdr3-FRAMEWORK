$('#creatormenu').fadeOut(0);

var currentPage = 'Roupas';

window.addEventListener('message', function(event) {
    if (event.data.action == "show") {
        $("#creatormenu").fadeIn(500);

        gender = event.data.gender;

        if (gender != "mp_male" && gender != "mp_female") {
            
            document.getElementById("button-head").classList.add("disabled");
            document.getElementById("button-creator").classList.add("disabled");
            document.getElementById("button-body").classList.remove("disabled");
            currentPage = 'Ped';
            $("#Roupas").css('display','none');
            $("#Ped").css('display','block');
            $("#Acessorios").css('display','none');
            $("#button-head").css('pointer-events','none');
            $("#button-creator").css('pointer-events','none');

        } else if (gender == "mp_male") {
            document.getElementById("button-head").classList.remove("disabled");
            document.getElementById("button-creator").classList.remove("disabled");
            document.getElementById("button-body").classList.add("disabled");
            $("#button-body").css('pointer-events','none');
            $("#button-head").css('pointer-events','auto');
            $("#button-creator").css('pointer-events','auto');     
            $("#Ped").css('display','none');
            document.getElementById("Saia").classList.add("disabled");  

        } else {
            document.getElementById("button-head").classList.remove("disabled");
            document.getElementById("button-creator").classList.remove("disabled");
            document.getElementById("button-body").classList.add("disabled");
            $("#button-body").css('pointer-events','none');
            $("#button-head").css('pointer-events','auto');
            $("#button-creator").css('pointer-events','auto');   
            $("#Ped").css('display','none');
            document.getElementById("Saia").classList.remove("disabled");           
        } 
        
        
        if (event.data.action == "hide") {
            $("#creatormenu").fadeOut(500);
        }

        if (event.data.myHorsesData) {
            $.event.data.shopData.forEach(element => {});
        }
    }
});

$('.menu-selectb').on('click', function() {
    $(`#${currentPage}`).hide();

    currentPage = $(this).data('target');
    $(`#${currentPage}`).show();

    $('.menu-selectb.active').removeClass('active');
    $(this).addClass('active');
});

$(".button-right").on('click', function() {
    var inputElement = $(this).parent().find('input');
    var component = $(inputElement).attr('id');
    var facefeature = $(inputElement).attr('data-value');
    var step = $(inputElement).attr('step');
    var value = Number($(inputElement).attr('value'));
    // value = Number(String.split(value, '/')[0]);
    var nValue = value + 1;

    if (step != undefined) {
        nValue = value + 0.1;
    }

    var min = $(inputElement).attr('min');
    var max = $(inputElement).attr('max');

    if (nValue > max) {
        nValue = min;
    }

    if (step == undefined) {
        var titleElement = $(this).parent().parent().find('.qtd');
        var text = titleElement.text();
        var namecomp = text.split(' ')[0];
        titleElement.text(nValue + '/' + max);
    }

    nValue = parseFloat(parseFloat(nValue).toFixed(1));

    $(inputElement).attr('value', nValue);

    var id = nValue;

    if (facefeature == undefined) {
        $.post('http://frp_clothes/' + component, JSON.stringify({ id }));
    } else {
        $.post('http://frp_clothes/' + component, JSON.stringify({ facefeature: facefeature, id: id }));
    }

});

$(".button-left").on('click', function() {
    var inputElement = $(this).parent().find('input');
    var component = $(inputElement).attr('id');
    var facefeature = $(inputElement).attr('data-value');
    var step = $(inputElement).attr('step');
    var value = Number($(inputElement).attr('value'));
    // value = Number(String.split(value, '/')[0]);
    var nValue = value - 1;

    if (step != undefined) {
        nValue = value - 0.1;
    }

    var min = $(inputElement).attr('min');
    var max = $(inputElement).attr('max');

    if (nValue < min) {
        nValue = max;
    }

    if (step == undefined) {
        var titleElement = $(this).parent().parent().find('.qtd');
        var text = titleElement.text();
        var namecomp = text.split(' ')[0];
        titleElement.text(nValue + '/' + max);
    }
    
    nValue = parseFloat(parseFloat(nValue).toFixed(1));

    $(inputElement).attr('value', nValue);

    var id = nValue;

    if (facefeature == undefined) {
        $.post('http://frp_clothes/' + component, JSON.stringify({ id }));
    } else {
        $.post('http://frp_clothes/' + component, JSON.stringify({ facefeature: facefeature, id }));
    }

});
function confirm(){
    $.post('http://frp_clothes/Confirm')
    $("#creatormenu").fadeOut(500);
}

function changeoptions(name) {
    var change = document.getElementById(name).value;
    $.post('http://frp_clothes/' + name,  JSON.stringify({ change }));
}


$(".input-number").on("change paste keyup", function() {

    var min = Number($(this).attr('min'));
    var max = Number($(this).attr('max'));

    var value = $(this).val();

    if (value == '' || value < min) {
        value = min;
        $(this).val(value);
    }

    if (value > max) {
        value = max;
        $(this).val(value);
    }

    var titleElement = $(this).parent().parent().find('.grey-text');
    var text = titleElement.text();
    var component = text.split(' ')[0];
    titleElement.text(component + ' ' + value + '/' + max);
});

function buy(element, isGold) {
    if (isGold) {
        // console.log(`Buy Gold ${$(element).parent().parent().attr('id')}`);
    } else {
        // console.log(`Buy Dollar ${$(element).parent().parent().attr('id')}`);
    }
}


const throttle = (func, limit) => {
    let inThrottle
    return (...args) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = setTimeout(() => inThrottle = false, limit)
        }
    }
}

window.addEventListener("keydown", throttle(function (ev) {
    var input = $(ev.target);
    var num = input.hasClass('input-number');
    var _key = false;
    if (ev.which == 68) {
        if (num === false) {
            _key = "left"
        }
        else if (num) {
            input.val(parseInt(input.val()) + 1)
            inputChange(input,true)
        }
    }
    if (ev.which == 65) {
        if (num === false) {
            _key = "right"
        }
        else if (num) {
            input.val(parseInt(input.val()) - 1)
            inputChange(input,false)
        }
    }

    if (_key) {
        $.post('http://frp_clothes/rotate', JSON.stringify({key: _key}))
    }
}, 50))

