// console.log(cart);
// console.log(customer);
// console.log(product_collections);

/* start checkout */
$(document).ready(function () { 
    // var $ul = $('#products-info');
	
	// for(var i = 0; i < cart.items.length; i++) {
	// 	if (cart.items[i].quantity == 1) var quanType = 'szt';
	// 	else if (cart.items[i].quantity < 5) var quanType = 'szt';
	// 	else var quanType = 'szt';
	// 	var li = '<li class="d-flex justify-content-between">';
    //     li += '<div class="image-content">';
    //     li += '<img src="' + cart.items[i].image + '" style="max-width : 100px; max-height : 100px">';
    //     li += '</div>';
	// 	li += '<div class="title d-flex align-items-center"><h6>' + cart.items[i].title + '</h6></div>';
	// 	li += '<div class="list-price-content">';
	// 	li += ' <div class="price"><h5>' + (cart.items[i].price / 100).toFixed(2) + ' zł</h5></div>';
    //     li += '<div class="quantity"><h6> ' + cart.items[i].quantity + ' ' + quanType +'</h6></div>';              
    //     li += '</div>';              
    //     li += '</li>';              
	// 	$ul.append(li);
	// }
	
	// if (customer != null) {
	// 	$('.login').hide();
	// 	$('#cartPersonEmail').val(customer.email);
	// 	var phoneDigits = customer.phone.replace(/\D/g,'');
	// 	var validatedPhone = phoneDigits.slice(phoneDigits.length - 9);
	// 	$('#cartFormNumber').val(validatedPhone);
	// 	$('#cartFormName').val(customer.first_name);
	// 	$('#cartFormLastName').val(customer.last_name);
	// 	$('#cartFormAddress').val(customer.address1);
	// 	$('#cartFormAddressNr').val(customer.address2);
	// 	$('#cartFormAddressCity').val(customer.city);
	// 	$('#cartFormAddressZip').val(customer.zip);
	// }
	
	// var deliveryCost = 0;
	// var discountVal = 0;
	// var totalCost = cart.items_subtotal_price/100;
	
	// function setPrices (){
	// 	totalCost = cart.items_subtotal_price / 100 + deliveryCost + discountVal;
	// 	if (discountVal < 0) {
	// 		$('#discount-cost').html('Rabat: <span>' + discountVal.toFixed(2) + ' zł</span>');
	// 		$('#discount-cost').show();
	// 	} else {
	// 		$('#discount-cost').hide();
	// 	}
	// 	$('#total-cart').html('Suma: <span>' + (cart.items_subtotal_price / 100).toFixed(2) + ' zł</span>');
	// 	$('#delivery-cost').html('Koszt dostawy: <span>' + deliveryCost.toFixed(2) + ' zł</span>');
	// 	$('#total-to-pay').html('Do zapłaty: <span>' + totalCost.toFixed(2) + ' zł</span>');
	// }
	
	// setPrices();
	// $('input[type=radio][name=checkFormDeliveryPrice]').change(function() {
	// 	deliveryCost = parseFloat(this.value.split('|')[0]);
	// 	setPrices();
    // });
    
    var checkPersonBusiness = $("#checkFormTypePerson, #checkFormTypeBusiness");
    $(checkPersonBusiness).change(function () {
        var formPersonFormGroup = $(".form-person > .form-group:first-child");
        if ($(checkPersonBusiness[1]).is(":checked")) {      
                $(".form-firm-address").addClass("show");
            } else {
                $(".form-firm-address").removeClass("show");
        }
    });

    var cartFormDifferentShippingAddress = $("#cartFormDifferentShippingAddress");
    var formPersonGroup = $(".form-person");
    $(cartFormDifferentShippingAddress).change(function () {
        if ($(this).is(":checked")) {      
            $(".form-different-address").addClass("show");
        } else {
            $(".form-different-address").removeClass("show");
        }
    });
    
    $("#checkAgreementAll").change(function () {
        var summaryCheckbox = $("#checkAgreementOffer, #checkAgreementTerms, #checkAgreementAll");

        if ($(summaryCheckbox[0]).is(":checked")) {      
            summaryCheckbox.each(function(){
                $(this).prop("checked", true);
            });
        } else 
            summaryCheckbox.each(function(){
                $(this).prop("checked", false);
            });
    });
    $("#checkAgreementOffer, #checkAgreementTerms").change(function () {
        var summaryUnCheckbox = $("#checkAgreementAll");
        summaryUnCheckbox.prop("checked", false);
    });

    var customeControlCustomRadioPayMethods = $(".select-pay-methods .custom-control.custom-radio");
    var customeControlCustomRadioDeliveryPay = $(".select-delivery-methods .custom-control.custom-radio");
    
    shopCloseOpenDeliveryMethod(customeControlCustomRadioPayMethods);
    shopCloseOpenDeliveryMethod(customeControlCustomRadioDeliveryPay);

    function shopCloseOpenDeliveryMethod() {  
        $(".select-pay-methods .custom-control.custom-radio").click(function() {
            $($(".select-pay-methods .custom-control.custom-radio")).next(".show-content").removeClass('show');
            $(this).next(".show-content").addClass('show');
        });

        $(".select-delivery-methods .custom-control.custom-radio").click(function() {
             if ($('.delivery-choice').length || $('#locationAddres').length){
                $('.delivery-choice').remove();
               $('#locationAddres').remove();
            }            
            $(".select-delivery-methods .custom-control.custom-radio").next(".show-content").removeClass('show');
            $(this).next(".show-content").addClass('show');
        });
    }

    function checkDeliveryAddres() {
        isChecked = $('#checkFormDeliveryRuch').prop('checked') ? true : false || $('#checkFormDeliveryInPost').prop('checked') ? true : false;
        if(isChecked) {
            isChecked = true;
            if($('.delivery-choice').length) {
                isChecked = true;
            } else {
                isChecked = false;
                alert("Wybierz punkt odbioru");
            }
            return isChecked;
        }else {
            return true;
        }
    }

    $(customeControlCustomRadioDeliveryPay).click(function() {
        if ($("#checkFormDeliveryUps").is(":checked")) {      
            $(".select-delivery-methods").each(function(){
                $("#contentFormPayCard").addClass("show");
            });
        } else {
            $("#contentFormPayCard").removeClass("show");
        }       
    });

    function submitedDone() {
        $("button.perf-btn.perf-btn__pink").attr('disabled', 'disabled');
        $("#ajaxCircle").show();
        $(".submited-done").fadeIn();
    }

    /*validate steps*/
    function checkFirstStep() {
        var checkCartPersonIsValid = $(".step-one-form .form-person input");

        checkCartPersonIsValid.each(function(){
            if(!$(this).is("[type=radio]") == true && !$(this).is("[type=checkbox]") == true && !$(this).val() == "" && !$(this).hasClass("is-invalid") && !$(this).hasClass("is-valid" )) {
                $(this).addClass("is-valid");
            }
        });
/** */
    /*form-person*/
    var validCompanyNip = false;
    $('#cartFormCompanyNip').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        
        if(name_length == 10 && !isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCompanyNip = true;
        }
        else{
            input.addClass("is-invalid");
            validCompanyNip = false;
        }
        console.log("validCompanyNip: " + validCompanyNip);
    });
    var validCartPersonEmail = false;
    $('#cartPersonEmail').on('blur', function() {
        var input = $(this);
        var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var is_email = emailPattern.test(input.val());
        if(is_email){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            // validCartPersonEmail = true;
            localStorage.setItem(validCartPersonEmail, true);
        }
        else{
            input.addClass("is-invalid");
            // validCartPersonEmail = false;
            localStorage.setItem(validCartPersonEmail, false);
        }
        console.log("validCartPersonEmail: " + validCartPersonEmail);
    });
    var validCartFormName = false;
    $('#cartFormName').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        // console.log(input.attr("id"));
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormName = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormName = false;
        }
        console.log("validCartFormName: " + validCartFormName);
    });
    var validCartFormLastName = false;
    $('#cartFormLastName').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormLastName = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormLastName = false;
        }
        console.log("validCartFormLastName: " + validCartFormLastName);
    });
    var validCartFormNumber = false;
    $('#cartFormNumber').on('blur', function() {
        var removeDashSpace = $(this).val().replace(/-/g,'').replace(/ /g,'');
        var input = $(this).val(removeDashSpace);
        var name_length = input.val().length;
        if(name_length == 9 && !isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormNumber = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormNumber = false;
        }
        console.log("validCartFormNumber: "  + validCartFormNumber);
    });
    var validCartFormAddress = false;
    $('#cartFormAddress').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddress = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormAddress = false;
        }
        console.log("validCartFormAddress: " + validCartFormAddress);
    });
    var validCartFormAddressCity = false;
    $('#cartFormAddressCity').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressCity = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormAddressCity = false;
        }
        console.log("validCartFormAddressCity: " + validCartFormAddressCity);
    });
    var validCartFormAddressZip = false;
    $('#cartFormAddressZip').on('blur', function() {
        var input = $(this);
        var zipPattern = /[0-9]{2}-[0-9]{3}/;
        var is_zip = zipPattern.test(input.val());
        var name_length = input.val().length;

        if(name_length >= 2 && is_zip){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressZip = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormAddressZip = false;
        }
        console.log("validCartFormAddressZip: " + validCartFormAddressZip);
    });
    /*form-different-address*/
    var validCartFormNameShipping = false;
    $('#cartFormNameShipping').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormNameShipping = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormNameShipping = false;
        }
        console.log("validCartFormNameShipping: " + validCartFormNameShipping) 
    });
    var validCartFormLastNameShipping = false;
    $('#cartFormLastNameShipping').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormLastNameShipping =  true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormLastNameShipping = false;
        }
        console.log("validCartFormLastNameShipping:" + validCartFormLastNameShipping);
    });
    var validCartFormNumberShipping = false;
    $('#cartFormNumberShipping').on('blur', function() {
        var removeDashSpace = $(this).val().replace(/-/g,'').replace(/ /g,'');
        var input = $(this).val(removeDashSpace);
        var name_length = input.val().length;
        if(name_length == 9 && !isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormNumberShipping = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormNumberShipping = false;
        }
    });
    var validCartFormAddressShipping = false;
    $('#cartFormAddressShipping').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressShipping = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormAddressShipping = false;
        }
    });
    var validCartFormAddressCityShipping = false;
    $('#cartFormAddressCityShipping').on('blur', function() {
        var input = $(this);
        var name_length = input.val().length;
        if(name_length >= 2 && isNaN(input.val()) ){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressCityShipping = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormAddressCityShipping = false;
        }
    });
    var validCartFormAddressZipShipping = false;
    $('#cartFormAddressZipShipping').on('blur', function() {
        var input = $(this);
        var zipPattern = /[0-9]{2}-[0-9]{3}/;
        var is_zip = zipPattern.test(input.val());
        var name_length = input.val().length;

        if(name_length >= 2 && is_zip){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressZipShipping = true;
        }
        else{
            input.addClass("is-invalid");
            validCartFormAddressZipShipping = false;
        }
    });
/** */
        var isValid = false;
        validFormPerson = false;
        if(validCartPersonEmail && validCartFormName && validCartFormLastName && validCartFormNumber && validCartFormAddress && validCartFormAddressCity && validCartFormAddressZip) {
            validFormPerson = true;
            isValid = true;
        } else {
            validFormPerson = false;
            isValid = false;
            checkCartPersonIsValid.each(function(){
                var input = $(this);
                if($(this).attr("id") == "cartFormAddressNr"){
                } else if($(this).val() == "" && $(this).attr("id") == "#cartFormCompanyNip" || $(this).attr("id") == "cartFormNumber" || $(this).attr("id") == "cartFormNumberShipping"){
                    if(input.val().length >= 2 && !isNaN(input.val())) {
                        $(this).removeClass("is-invalid");
                    } else {
                        $(this).addClass("is-invalid");
                    }
                } else {
                    if(input.val().length >= 2 && isNaN(input.val())) {
                        $(this).removeClass("is-invalid");
                    } else {
                        $(this).addClass("is-invalid");
                    }
                }
            });
        }

        var validDifferentShipping = false;
        var otherAddressChecked = false;
        if ($("#cartFormDifferentShippingAddress").is(":checked")) {
            isValid = false;
            console.log("zaznaczone: " + isValid);
            if(validCartFormNameShipping && validCartFormLastNameShipping && validCartFormNumberShipping && validCartFormAddressShipping && validCartFormAddressCityShipping && validCartFormAddressZipShipping) {
                isValid = true;
                console.log("zaznaczony wypełniony: " + isValid);
            } else {
                var checkCartFormLastNameShippingValid = $(".step-one-form .form-different-address input");
                checkCartFormLastNameShippingValid.each(function() {
                    var input = $(this);
                    if($(this).attr("id") == "cartFormAddressNrShipping"){
                    } else {
                        var input = $(this);
                        if(input.val().length <= 2) {
                              $(this).addClass("is-invalid");
                        } else {
                            $(this).removeClass("is-invalid");
                        }
                    }
                });
                isValid = false;
                console.log("zaznaczone błąd: " + isValid);
            }
        }
        
        var validPersonBusiness = false;
        var personBusinessChecked = false;
        if ($(checkPersonBusiness[1]).is(":checked")) {
            isValid = false;
             if(validCompanyNip) {
                isValid = true;
            } else {
                var checkPersonBusinessValid = $(".step-one-form .form-firm-address input");
                checkPersonBusinessValid.each(function(){
                    if($(this).attr("id") == "cartFormCompanyName"){
                    } else {
                        var input = $(this);
                        if(input.val().length <= 2) {
                              $(this).addClass("is-invalid");
                        } else {
                            $(this).removeClass("is-invalid");
                        }
                    }
                });
                isValid = false;
            }
        }

        if(validFormPerson === true && isValid === true) {
            return true;
        } else {
            return false;
        }
        
    }

    function topNavStatus(){
        var topNavList = $(".checkout-steps ul li");
 
        $(topNavList).click(function() {
    
            if($(this).is("li:first-child")) {
                
                    console.log("klik w pierwszy");
                    $(this).addClass("active");
                    $(this).next().removeClass("active");
                    $(this).next().next().removeClass("active");
    
                    $(".user-data.c-m-step-one").addClass('openStepOne');
                    $(".user-data.c-m-step-one").removeClass('hiddenStepOne');
                    $(".delivery-pay-content.c-m-step-two").removeClass('openStepTwo');
                    $(".summary.c-m-step-thre").removeClass('openStepThre');

            } else if($(this).is("li:nth-child(2)")) {
                if(checkFirstStep() == true){ 
                    console.log("klik w drugi");
                    $(this).addClass("active");
                    $(this).prev().removeClass("active");
                    $(this).next().removeClass("active");

                    $(".user-data.c-m-step-one").addClass('hiddenStepOne');
                    $(".user-data.c-m-step-one").next().addClass('openStepTwo');
                    $(".summary.c-m-step-thre").removeClass('openStepThre');
                }
            } else {
                if(checkSecondStep() == true){
                    console.log("klik w trzeci element");
                    $(this).addClass("active");   
                    $(this).prev().removeClass("active");
                    $(this).prev().prev().removeClass("active");

                    $(".delivery-pay-content.c-m-step-two").removeClass('openStepTwo');
                    $(".summary.c-m-step-thre").addClass('openStepThre');
                    $(".user-data.c-m-step-one").addClass('hiddenStepOne');
                }
            }

        });

    };
    topNavStatus();

    $(".b-m-step-one .perf-btn").click(function(e){
        e.preventDefault();

         if(checkFirstStep() == true){
            $(this).parent().parent().addClass('hiddenStepOne');
            $(this).parent().parent().next().addClass('openStepTwo');

            $(".checkout-steps ul li:first-child").removeClass("active");
            $(".checkout-steps ul li:nth-child(2)").addClass("active");
            
        } else {
        }
    });

    function checkSecondStep() {
        var checkDeliveryPay = false;
        $(".select-delivery-methods input[type=radio]").each(function() {
            var name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length == 0){
                $(this).addClass("is-invalid");
                checkDeliveryPay = false;
            } else {
                $(this).removeClass("is-invalid");
                $(this).addClass("is-valid");
                checkDeliveryPay = true;
            }
        });
        var checkPayMethods = false;
        $(".select-pay-methods input[type=radio]").each(function() {
            
            var name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length == 0){
                $(this).addClass("is-invalid");
                checkPayMethods = false;
            } else {
                $(this).removeClass("is-invalid");
                $(this).addClass("is-valid");
                checkPayMethods = true;
            }
        });

         if(checkDeliveryPay && checkPayMethods){
            return true
        }else{
            return false
        }
    }

    $(".b-m-step-two .perf-btn").click(function(e){
        e.preventDefault();
        // var topNavListEl = $(".checkout-steps ul li:nth-child(2)");
         if(checkSecondStep() == true){
            $(this).parent().parent().removeClass('openStepTwo');
            $(this).parent().parent().addClass('hiddenStepTwo');
            $(this).parent().parent().next().addClass('openStepThre');

            $(".checkout-steps ul li:nth-child(2)").removeClass("active");
            $(".checkout-steps ul li:nth-child(3)").addClass("active");

        } else {
        }
    });

    function summaryAgreement() {
        var checkSummaryAgreement = false;

        $(".summary-agreement input[type=checkbox]").each(function(){
            $(this).removeClass("is-valid");
            if($("#checkAgreementTerms").prop('checked')) {
                $("#checkAgreementTerms").addClass("is-valid");
                $("#checkAgreementTerms").removeClass("is-invalid");
                checkSummaryAgreement = true;
            }
            else {
                $("#checkAgreementTerms").addClass("is-invalid");
                $("#checkAgreementTerms").removeClass("is-valid");
                checkSummaryAgreement = false;
            }
        });
        return checkSummaryAgreement;
    }
	checkFirstStep();
    /*validate steps*/
    $("form.checkout-form").submit(function(e) { 
        e.preventDefault();
         checkFirstStep();
         if(checkFirstStep() == true && checkSecondStep() == true && summaryAgreement() == true && checkDeliveryAddres() == true) {
			// $("#submitButton").hide();
			// $("#ajaxCircle").show();
            // submitedDone();

            console.log("formularz wysłany: " + checkFirstStep() + " " + checkSecondStep() + " " + summaryAgreement() + " " + checkDeliveryAddres());
            return false;
            // var request = {};
            // request.order = {};
			// request.order.note_attributes = [];
            // request.order.email = $('#cartPersonEmail').val();
            // request.order.billing_address = {};
            // request.order.billing_address.first_name = $('#cartFormName').val();
            // request.order.billing_address.last_name = $('#cartFormLastName').val();
            // request.order.billing_address.address1 = $('#cartFormAddress').val();
            // request.order.billing_address.address2 = $('#cartFormAddressNr').val();
            // request.order.billing_address.phone = $('#cartFormNumber').val();
            // request.order.billing_address.city = $('#cartFormAddressCity').val();
            // request.order.billing_address.country = 'Polska';
            // request.order.billing_address.zip = $('#cartFormAddressZip').val();
			// if ($('#checkFormTypeBusiness').is(":checked")) {   
			// 	request.order.billing_address.company = $('#cartFormCompanyName').val();
			// 	var note_vat = {};
			// 	note_vat.name = 'vat_number';
			// 	note_vat.value = $('#cartFormCompanyNip').val().replace( /-/g, '');
			// 	request.order.note_attributes.push(note_vat);
			// }
            // if ($("#cartFormDifferentShippingAddress").is(":checked")) { 
			// 	request.order.shipping_address = {};
			// 	request.order.shipping_address.first_name = $('#cartFormNameShipping').val();
			// 	request.order.shipping_address.last_name = $('#cartFormLastNameShipping').val();
			// 	request.order.shipping_address.address1 = $('#cartFormAddressShipping').val();
			// 	request.order.shipping_address.address2 = $('#cartFormAddressNrShipping').val();
			// 	request.order.shipping_address.phone = $('#cartFormNumberShipping').val();
			// 	request.order.shipping_address.city = $('#cartFormAddressCityShipping').val();
			// 	request.order.shipping_address.country = 'Polska';
			// 	request.order.shipping_address.zip = $('#cartFormAddressZipShipping').val();
			// } else {
			// 	request.order.shipping_address = request.order.billing_address;
			// }
			// if ($('input[type=radio][name=checkFormPay]:checked').val() == 'Płatność za pobraniem' ) {
			// 	var note_cod = {};
			// 	note_cod.name = 'cash_on_delivery';
			// 	note_cod.value = true;
			// 	request.order.note_attributes.push(note_cod);
			// }
            // request.order.send_receipt = true;
            // request.order.currency = 'PLN';
            // request.order.financial_status = 'pending';
            // request.order.line_items = [];
            // for(var i = 0; i < cart.items.length; i++) {
            //     checkoutItem = {};
            //     checkoutItem.variant_id = cart.items[i].variant_id;
            //     checkoutItem.id = cart.items[i].product_id;
            //     checkoutItem.quantity = cart.items[i].quantity;
            //     request.order.line_items.push(checkoutItem);
            // }
            // request.order.shipping_lines = [];
            // request.order.shipping_lines[0] = {};
            // request.order.shipping_lines[0].code = $('input[type=radio][name=checkFormDeliveryPrice]:checked').val().split('|')[1];
            // request.order.shipping_lines[0].title = $('input[type=radio][name=checkFormDeliveryPrice]:checked').val().split('|')[1];
            // request.order.shipping_lines[0].price = deliveryCost;
            // request.order.shipping_lines[0].discounted_price = deliveryCost;
			// if (request.order.shipping_lines[0].code == 'Paczkomat'){
			// 	var note_location_id = {};
			// 	note_location_id.name = 'easypack_location_id';
			// 	note_location_id.value = inpostDetails.name;
			// 	request.order.note_attributes.push(note_location_id);
			// 	var note_destination = {};
			// 	note_destination.name = 'destination_description';
			// 	note_destination.value = inpostDetails.location_description + '--' + inpostDetails.opening_hours;
			// 	request.order.note_attributes.push(note_destination);
			// 	var note_address = {};
			// 	note_address.name = 'destination_address';
			// 	note_address.value = inpostDetails.name + '--' + inpostDetails.address.line1 + '--' + inpostDetails.address.line2;
			// 	request.order.note_attributes.push(note_address);
			// } else if (request.order.shipping_lines[0].code == 'Paczka w Ruchu'){
			// 	var note_location_id = {};
			// 	note_location_id.name = 'ruch_destination_code';
			// 	note_location_id.value = ruchDetails.DestinationCode;
			// 	request.order.note_attributes.push(note_location_id);
			// 	var note_destination = {};
			// 	note_destination.name = 'destination_description';
			// 	note_destination.value = ruchDetails.OpeningHours;
			// 	request.order.note_attributes.push(note_destination);
			// 	var note_address = {};
			// 	note_address.name = 'destination_address';
			// 	note_address.value = ruchDetails.DestinationCode + '--' + ruchDetails.StreetName + '--' + ruchDetails.City;
			// 	request.order.note_attributes.push(note_address);
			// }
            // /*request.order.customer = {};
            // request.order.customer.email = request.order.email;
            // request.order.customer.first_name = request.order.billing_address.first_name;
            // request.order.customer.last_name = request.order.billing_address.last_name;
            // request.order.customer.phone = request.order.billing_address.phone.replace(/-/g, '');
            // request.order.customer.default_address = request.order.billing_address;
            // */
            // if ($('#checkAgreementOffer').prop('checked')) {
			// 	request.order.buyer_accepts_marketing = true;
			// }
			// if (discountVal < 0) {
			// 	request.order.discount_codes = [];
			// 	request.order.discount_codes[0] = {};
			// 	request.order.discount_codes[0].code = $("#inputDiscountCode").val();
			// 	request.order.discount_codes[0].amount = -discountVal;
			// 	request.order.discount_codes[0].type = "fixed_amount";
			// }
			// request.order.transactions = [];
			// request.order.transactions[0] = {};
			// request.order.transactions[0].currency = 'PLN';
			// request.order.transactions[0].kind = 'capture';
			// request.order.transactions[0].source = 'external';
			// request.order.transactions[0].amount = totalCost;
			// request.order.transactions[0].status = 'pending';
			// request.order.transactions[0].gateway = $('input[type=radio][name=checkFormPay]:checked').val();
			// console.log(request);
					
			
			// $.post("/cart/clear.js");
                
            // $.post("/a/checkout/scripts/post_order.php",
            //     request,
            //     function(data, status){
            //         console.log(data);
            //         console.log(JSON.parse(data).order.order_status_url);
            //         var order_url = JSON.parse(data).order.order_status_url;
            //         var order_id = JSON.parse(data).order.id;
            //         var order_no = JSON.parse(data).order.name;
            //         //var order_token = JSON.parse(data).order.token;
			// 		if ($('input[type=radio][name=checkFormPay]:checked').val() == 'paylane_polskie_epłatności') {
			// 			hashRequest = {};
			// 			hashRequest.description = order_id;
			// 			hashRequest.amount = totalCost;
			// 			$.post("/a/checkout/scripts/paylane.php",
			// 				hashRequest,
			// 				function (hashResponse, status){
			// 					var hash = hashResponse;
			// 					var url = 'https://secure.paylane.com/order/cart.html';
			// 					var form = $('<form action="' + url + '" method="post">' +
			// 					  '<input type="hidden" name="merchant_id" value="49b7f5a8e8ac0d605e24ba2ee832478b" />' +
			// 					  '<input type="hidden" name="description" value="' + order_id + '" />' +
			// 					  '<input type="hidden" name="transaction_description" value="Zamówienie ' + order_no + '" />' +
			// 					  '<input type="hidden" name="amount" value="' + totalCost + '" />' +
			// 					  '<input type="hidden" name="currency" value="PLN" />' +
			// 					  '<input type="hidden" name="transaction_type" value="S" />' +
			// 					  '<input type="hidden" name="back_url" value="'+ shop_url + '/a/checkout/scripts/payment.php?t=' + order_url + '" />' +
			// 					  '<input type="hidden" name="hash" value="' + hash + '" />' +
			// 					  '<input type="hidden" name="language" value="pl" />' +
			// 					  '<input type="hidden" name="customer_name" value="' + request.order.shipping_address.first_name + ' ' + request.order.shipping_address.last_name + '" />' +
			// 					  '<input type="hidden" name="customer_email" value="' + request.order.shipping_address.email + '" />' +
			// 					  '<input type="hidden" name="customer_address" value="' + request.order.shipping_address.address1 + '" />' +
			// 					  '<input type="hidden" name="customer_zip" value="' + request.order.shipping_address.zip + '" />' +
			// 					  '<input type="hidden" name="customer_city" value="' + request.order.shipping_address.city + '" />' +
			// 					  '<input type="hidden" name="customer_country" value="PL" />' +
			// 					  '</form>');
			// 					$('body').append(form);
			// 					$(form).submit();
								
		
			// 				}
			// 			);
			// 		} else {
		
			// 			window.location.replace(order_url);
					
			// 		}
            //     });
                
            //createForDataJson(); 
            //var data = $(this).serializeFormJSON();
            //console.log(data);
        } else { 
            console.log("formularz FAIL: " + checkFirstStep() + " " + checkSecondStep() + " " + summaryAgreement() + " " + checkDeliveryAddres());
            return false;
        }
    });

	// function deactivateDiscount(message){
	// 	$("#discount-error").html(message);
	// 	$("#discount-error").show();
	// 	discountVal = 0;
	// 	setPrices();
	// 	$("#discount-button").html('Zastosuj');
	// }
	
	// function activateDiscount(){
	// 	setPrices();
	// 	$("#discount-error").hide();
	// 	$("#discount-button").html('Zastosuj');
	// }
	
    // $("#inputDiscountCode").bind('blur keyup',function(e) {  
    //     if (e.type === 'blur' || e.keyCode === 13) { 
	// 		$("#discount-button").html('<img src="checkout/images/white_spinner.svg" width="50" height="50" />');
	// 		$.getJSON("/a/checkout/scripts/get_discount.php?d=" + $("#inputDiscountCode").val(),
    //         '',
    //         function(response){
    //             if (response.status === true) {
	// 				getDiscountDetails(response.price_rule);
    //             } else {
	// 				deactivateDiscount('Nie istnieje aktywny kod rabatowy o tej nazwie');
    //             }
	// 		})
    //     }
    // });
	
	// function sortByKey(array, key) {
	// 	return array.sort(function(a, b) {
	// 		var x = a[key]; var y = b[key];
	// 		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	// 	});
	// }
    
    // function getDiscountDetails (price_rule) {
    //             discount = price_rule;
	// 			console.log(discount);
	// 			var entitledItems = [];
	// 			var entitledItemsCount = 0;
	// 			var entitledItemsPrice = 0;
	// 			if ((discount.ends_at != null && discount.ends_at <= Date.now()) || 
	// 			(discount.starts_at != null && discount.starts_at >= Date.now())) {
	// 				deactivateDiscount('Nie istnieje aktywny kod rabatowy o tej nazwie');
	// 				return;
	// 			}
	// 			if (discount.entitled_product_ids.length > 0) {
	// 				for (i = 0; i < cart.items.length; i++) {
	// 					if (discount.entitled_product_ids.indexOf(cart.items[i].product_id) > -1 ) {
	// 						entitledItems.push(cart.items[i]);
	// 						entitledItemsCount += cart.items[i].quantity;
	// 						entitledItemsPrice += cart.items[i].quantity * cart.items[i].price;
	// 					}
	// 				}
	// 			} else if (discount.entitled_collection_ids.length > 0) {
	// 				for (i = 0; i < cart.items.length; i++) {
	// 					for (j = 0; j < product_collections[cart.items[i].product_id].length; j++) {
	// 						if (discount.entitled_collection_ids.indexOf(product_collections[cart.items[i].product_id][j] * 1) > -1 ) {
	// 							entitledItems.push(cart.items[i]);
	// 							entitledItemsCount += cart.items[i].quantity;
	// 							entitledItemsPrice += cart.items[i].quantity * cart.items[i].price;
	// 						}
	// 					}
	// 				}
	// 			} else {
	// 				entitledItems = cart.items;
	// 				entitledItemsCount = cart.item_count;
	// 				entitledItemsPrice = cart.items_subtotal_price;
	// 			} 	
	// 			if (entitledItemsCount == 0) {
	// 				deactivateDiscount('Koszyk nie spełnia wymagań dla wpisanego kodu');
	// 				return;
	// 			}
	// 			if (discount.prerequisite_to_entitlement_quantity_ratio.prerequisite_quantity != null) {
	// 				if (discount.prerequisite_to_entitlement_quantity_ratio.prerequisite_quantity > entitledItemsCount) {
	// 					console.log('aa');
	// 					deactivateDiscount('Koszyk nie spełnia wymagań dla wpisanego kodu');
	// 					return;
	// 				} else {
	// 					console.log('hhk');
	// 					entitledQuantity = Math.floor(entitledItemsCount / (discount.prerequisite_to_entitlement_quantity_ratio.prerequisite_quantity + discount.prerequisite_to_entitlement_quantity_ratio.entitled_quantity));
	// 					entitledItemsPrice = 0;
	// 					sortByKey(entitledItems, 'price')
	// 					for (i = 0; i < entitledItems.length; i++) {
	// 						if (entitledQuantity >= entitledItems[i].quantity) {
	// 							entitledItemsPrice += entitledItems[i].quantity * entitledItems[i].price;
	// 							entitledQuantity -= entitledItems[i].quantity;
	// 						} else {
	// 							entitledItemsPrice += entitledQuantity * entitledItems[i].price;
	// 							entitledQuantity = 0;
	// 						}
	// 					}
	// 					discountVal = entitledItemsPrice / 100 * (discount.value / 100);
	// 					activateDiscount();
	// 					return;
	// 				}
	// 			}
	// 			if ((discount.prerequisite_quantity_range != null && discount.prerequisite_quantity_range.greater_than_or_equal_to > entitledItemsCount) || 
	// 				(discount.prerequisite_subtotal_range != null && discount.prerequisite_subtotal_range.greater_than_or_equal_to > entitledItemsPrice / 100) ) {
	// 				deactivateDiscount('Koszyk nie spełnia wymagań dla wpisanego kodu');						
	// 			} else {
	// 				if (discount.value_type == 'percentage') {
	// 					discountVal = entitledItemsPrice / 100 * (discount.value / 100);
	// 					activateDiscount();
	// 				} else if (discount.value_type == 'fixed_amount') {
	// 					discountVal = discount.value / 1;
	// 					activateDiscount();
	// 				} 
	// 			}		
    // }
	
});

/* end checkout */