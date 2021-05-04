var limitProducts=8;
var basket=[];
var products = [
    {name:'Arbuz',price:2.00,img:'Arbuz.jpg'},
    {name:'Cebula',price:1.50,img:'Cebula.jpg'},
    {name:'Cukinia',price:3.50,img:'Cukinia.jpg'},
    {name:'Ziemniaki',price:1.20,img:'Ziemniaki.jpg'},
    {name:'Ciasto', price:6.00, img:'Ciasto.jpg'},
    {name: 'Kawa',price: 8.00,img: 'Kawa.jpg'},
    {name: 'Chinskie danie',price: 15.00,img: 'Chinskie-danie.jpg'},
    {name: 'Lazania',price: 12.50, img: 'Lazania.jpg'},
    {name: 'Lody',price: 8.50, img: 'Lody.jpg'},
    {name: 'Maliny',price: 6.50, img: 'Maliny.jpg'},
    {name: 'Mleko',price: 2.50, img: 'Mleko.jpg'},
    {name: 'Pestki',price: 10.00, img: 'Pestki.jpg'},
    {name: 'Truskawki',price: 9.00, img: 'Truskawki.jpg'},
    {name: 'Ryba',price: 12.50, img: 'Ryba.jpg'},
    {name: 'Wino',price: 17.50, img: 'Wino.jpg'}



]

$(function () {

    $('.items').on('click','button.btnAdd',function() {
        if (basket.length>=limitProducts) {
            alert('Za dużo. Max ' + limitProducts+ ' produktów');
        } else {
            var name = $(this).data('name');
            var price = $(this).data('price');
            var product = {name: name, price: price};
            basket.push(product);
            renderBasket();
        }
    });

    $('.basket').on('click','button.btnRemove',function() {
        var index = $(this).data('index');
        basket.splice(index,1);
        renderBasket();
    });

    $('.basket').on('click','button.btnClear',function() {
        if (confirm('Czy napewno?')) {
            basket = [];
            renderBasket();
        }
    });

    $('.basket').on('click','button.btnSend',function() {
            var totalPrice=0;
            basket.forEach(function(product,index) {
                totalPrice=totalPrice + product.price;
            });
            alert('Wykonano, wartość: '+formatPrice(totalPrice)+' zł');
            basket = [];
            renderBasket();
    });




    renderProducts();
    renderBasket();
});


function renderBasket() {
    var totalPrice=0;
    var basketTable='<table>';
    basket.forEach(function(product,index) {
        basketTable= basketTable + '<tr><td>'+product.name+'</td><td>'+formatPrice(product.price)+'</td><td><button data-index='+index+' class="btnRemove">Usuń</button></td></tr>';
        totalPrice=totalPrice + product.price;
    });
    basketTable= basketTable + '<tr><td>Razem</td><td>'+formatPrice(totalPrice)+'</td><td>&nbsp;</td></tr>';
    basketTable=basketTable+'<table>';

    if (basket.length>=limitProducts) {
        basketTable = basketTable + '<div style="margin-top:2rem;color:white;font-size:20px">Koszyl jest pełny</div>';
        $('.btnAdd').prop('disabled',true);
    } else {
        $('.btnAdd').prop('disabled',false);
    }

    if (basket.length>0) {
        basketTable = basketTable + '<button style="margin-top:2rem;" class="btnClear">Wyczyść</button>';
        basketTable = basketTable + '<button style="margin-top:2rem;" class="btnSend">Wyślij</button>';
    }

    $('.basket').html(basketTable);
}

function renderProducts() {
    var items='';
    products.forEach(function(product) {
        items= items + itemProduct(product);
    });
    $('.items').html(items);
}


function itemProduct(product) {
    var item='<div class="item">' +
        '<table>'+
            '<tr>' +
                '<td colspan="2">'+
                    '<img src="./img/'+product.img+'" alt="'+product.name+'">' +
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td colspan="2">' + product.name +
                '</td>'+
            '</tr>'+
            '<tr>'+
                '<td colspan="1">'+formatPrice(product.price)+' zł'+
                '</td>'+
                '<td colspan="1">'+
                    '<button data-price="'+product.price+'" data-name="'+product.name+'" class="btn btnAdd">Dodaj</button>'+
                '</td>'+
            '</tr>'+
        '</table>'+
    '</div>';
    return item;
}

function formatPrice(price) {
    return price.toFixed(2);
}