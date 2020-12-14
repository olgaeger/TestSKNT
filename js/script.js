//страница выбранного тарифа
function getTariffFromId(n){
    switchToDisplay(2);
    var content = document.getElementsByClassName('page2')['0'];
    var thisTariffObj = TariffObj[n];
    var maxPrice = thisTariffObj.maxPrice;
    var thisTarifContent = '<div class="tariff-title"><div onclick="switchToDisplay(1);"><svg class="pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="transform: rotate(180deg)"><path d="M12 30 L24 16 12 2" /></svg></div><div class="center"><p>Тариф "'+ thisTariffObj.title+'"</p></div></div>';
    var concept = '<div class="box">';
    //сортируем по ID и выводим
    thisTariffObj.tarifs.sort(
        function (a, b) {
            if (a.ID > b.ID) {
                return 1;
            }
            if (a.ID < b.ID) {
                return -1;
            }
            return 0;
        }).forEach(function(element){
            concept += 
            '<div>'+
                '<div class="box-items">'+
                    '<p class="title">' + element.pay_period + ' ' + getMounthText(element.pay_period)+ '</p>' +
                    '<div>' +
                        '<div class="option" onclick="getTariffOffer(' + n + ',' + element.ID + ',' + maxPrice +')">'+
                            '<div>'+
                                '<p><span>' + element.price/element.pay_period + ' &#8381;/мес</span></p>' + 
                                '<p>разовый платеж &#8212; ' + element.price + '</p>'+
                                getDiscount(element.price, element.pay_period, maxPrice) +
                            '</div>'+
                            '<div class="arrow">'+
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none" stroke="#4d575d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">'+
                                    '<path d="M12 30 L24 16 12 2" />'+
                                '</svg>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';
        });
    content.innerHTML = 
        thisTarifContent + 
        concept+ 
         '</div>';
}
//Формируем карточку-предложение
function getTariffOffer(n, id, maxPrice){
    switchToDisplay(3);
    var thisTariffOfferObj = TariffObj[n];
    thisTariffOfferObj.tarifs.forEach(function(element){
        if(element.ID==id){
            var content = document.getElementsByClassName('page3')['0'];
            content.innerHTML =  '<div class="tariff-title"><div onclick="switchToDisplay(2);"><svg class="pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="transform: rotate(180deg)"><path d="M12 30 L24 16 12 2" /></svg></div><div class="center"><p>Выбор тарифа</p></div></div>'+
            '<div>'+
                '<div class="box-items">'+
                    '<div>'+
                        '<p class="title">Тариф "'+ thisTariffOfferObj.title+ '"' + '</p>' +
                        '<p><span>Период оплаты  &#8212; '+ element.pay_period + ' месяцев</span></p>'+
                        '<p><span>'+ maxPrice +' &#8381;/мес</span></p>'+
                        '<div class= "option-items">'+
                            '<p>Разовый платеж  &#8212; '+ element.price + ' &#8381;</p>'+
                            '<p>Со счета спишется  &#8212; '+ element.price + ' &#8381;</p>'+
                        '</div>' + 
                        '<div class= "option-items gray">'+
                            '<p>Вступит в силу &#8212; сегодня</p>'+
                            '<p>Активно до '+ getDateFromPayday(element.new_payday) +'</p>'+
                        '</div>' + 
                        '<div class="btn"><span>выбрать</span></div>' +
                    '</div>'+
                '</div>'
			'</div>';
        }
    });
}

function getMounthText(pay_period){
    switch (parseInt(pay_period)) {
        case 1:
            return 'месяц';
            break;
        case 3:
            return 'месяца';
            break;
        case 6:
            return 'месяцев';
            break;
        case 12:
            return 'месяцев';
            break;
        default:
            console.error( "pay_period error" );
    }
}

//Скидка
function getDiscount(price, pay_period, maxPrice){
    var discount = maxPrice * pay_period - price;
    if(discount==0){
        return '';
    }
    return  '<p>скидка &#8212; ' + discount;
}

//Дата 
function getDateFromPayday(d){
    var dateWithOutOffset = new Date((d.split('+')['0'])*1000);
    var d = new Date((d.split('+')['0'])*1000-d.split('+')['1']*60);
    var dd = d.getDate();
    var mm = d.getMonth() + 1; 
    var yyyy = d.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    return dd + '.' + mm + '.' + yyyy;
}

//Переключение страниц
function switchToDisplay(n){
    var displays = Array.from(document.getElementsByClassName('display'));
    displays.forEach(
        function(element){
            if(element.getAttribute('page')==n){
                element.setAttribute("style", "display:block");
            }else{
                element.setAttribute("style", "display:none");
            }
        }
    );
}

window.onload = function(){
    var elements = document.querySelectorAll('.box .box-items .option .speed') ;
    for (var i = 0; i < elements.length; i++) {
        switch (elements[i].innerHTML) {
        case '50 Мбит/с':
            elements[i].style.backgroundColor = '#70603e';
            break;
        case '100 Мбит/с':
            elements[i].style.backgroundColor = '#0075d9';
            break;
        case '200 Мбит/с':
            elements[i].style.backgroundColor = '#e74807';
            break;
        default:
            elements[i].style.backgroundColor = '#111';
        }
    }
}