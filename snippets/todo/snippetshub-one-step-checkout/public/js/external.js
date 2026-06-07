$(document).ready(function () { 

    easyPack.init({            
        instance: 'pl',
        mapType: 'osm',
        searchType: 'osm',
        points: {
            types: ['parcel_locker'],
        },
        map: {
            useGeolocation: true,
            initialTypes: ['parcel_locker']
        }
    })
    window.onload = function() {
    easyPack.dropdownWidget('easypack-widget', function(point) {
        var inpostModaData =  "Adres dostawy: " + point.address.line2 + " " + point.address.line1 + " " + point.name;

        addDeliveryData(inpostModaData)
    });
    }
    
    function closeEasypackDropdown() {
        if($(".easypack-dropdown").attr("data-open") == "true"){

                $("#checkout-form").click(function(){
                    // console.log("klik w wybierz punkt");
                    // $(".easypack-dropdown").attr("data-open", "false");       
                });

        } else {  
        }
    }
    $("#easypack-widget").click(function(){
        closeEasypackDropdown();
    });
    

    window.easyPackAsyncInit = function () {
        easyPack.init({
            defaultLocale: 'pl',
            mapType: 'osm',
            searchType: 'osm',
            points: {
                types: ['parcel_locker']
            },
            map: {
                initialTypes: ['parcel_locker']
            }
        });
    };

    /*inpost map add background*/
    $( "#checkout-form" ).click(function() {
        var widgetModalParent = $("#widget-modal").parent();
        widgetModalParent.addClass("widget-modal-background");  
    });
    /*inpost-layer*/
    $("#easypack-widget").click(function(){
        var deliveryLayer = '<div class="delivery-layer"></div>';
        if($(".delivery-layer").length) {
            $(".easypack-dropdown").attr("data-open", false);
            $(".delivery-layer").remove();
            console.log("remove");
        } else {
            console.log("add");
            $(".easypack-dropdown").after().append(deliveryLayer);
        }
    });
});

function openModalRuch() {
    $('#deliveryRuchMap').pwrgeopicker('popup',{
        'popup': true,
        'onselect': function(data){
            var deliveryRuchModalData = "Adres dostawy: " + data.City + " " + data.DestinationCode + " " +  data.Location + " ";
            addDeliveryData(deliveryRuchModalData);
        }
        
    });
};

function openModal() {
    easyPack.modalMap(function(point, modal) {
        modal.closeModal("modal");
        console.log(point);
        var deliveryInPostDataModal = point.address.line2 + " " + point.address.line1 + " " + point.name  ;
        addDeliveryData("Adres dostawy: " + deliveryInPostDataModal)
    }, { width: 500, height: 600 });
};

function addDeliveryData(deliveryData) {
    var deliveryMethodBox= $(".select-delivery-methods");
    var inputDeliveryAddres = '<input type="hidden" id="locationAddres" name="locationAddres" value="'+deliveryData+'"></input>';
    if ($('.delivery-choice' || $('#locationAddres')).length){
        $('.delivery-choice').remove();
        $('#locationAddres').remove();
    }
    deliveryMethodBox.last().append('<div class="delivery-choice"><div class="alert alert-success" role="alert">'+deliveryData+'</div></div>' + inputDeliveryAddres);
}

openModalRuch();