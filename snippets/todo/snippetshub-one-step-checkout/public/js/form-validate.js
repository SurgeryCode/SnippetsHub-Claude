console.log("form-validate.js START");

$(document).ready(function () { 
    var checkPersonBusiness = $("#checkFormTypePerson, #checkFormTypeBusiness");
    $(checkPersonBusiness).change(function () {
        var formPersonFormGroup = $(".form-person > .form-group:first-child");
        if ($(checkPersonBusiness[1]).is(":checked")) {      
                // formPersonFormGroup.after(htmlInputFirmNip);
                $(".form-firm-address").addClass("show");
            } else {
                // $(".form-firm-address").remove();
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
        }
        console.log("validCompanyNip: " + validCompanyNip);
    });
    /**/
    var validCartPersonEmail = false;
    $('#cartPersonEmail').on('blur', function() {
        var input = $(this);
        var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var is_email = emailPattern.test(input.val());
        if(is_email){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartPersonEmail = true;
        }
        else{
            input.addClass("is-invalid");
            validCartPersonEmail = false;
        }
        console.log("validCartPersonEmail: " + validCartPersonEmail);
    });

    var validCartFormName = false;
    $('#cartFormName').on('blur', function() {
		var input = $(this);
        var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormName = true;
		}
		else {
            input.addClass("is-invalid");
            validCartFormName = false;
        }
        console.log("validCartFormName: " + validCartFormName);
    });
    var validCartFormLastName = false;
    $('#cartFormLastName').on('blur', function() {
		var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
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
		if(name_length >= 3 && isNaN(input.val()) ){
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
		if(name_length >= 3 && isNaN(input.val()) ){
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

		if(name_length >= 3 && is_zip){
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
		if(name_length >= 3 && isNaN(input.val()) ){
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
		if(name_length >= 3 && isNaN(input.val()) ){
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
        console.log("validCartFormNumberShipping: " + validCartFormNumberShipping);
    });
    var validCartFormAddressShipping = false;
    $('#cartFormAddressShipping').on('blur', function() {
        var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressShipping = true;
		}
		else{
            input.addClass("is-invalid");
            validCartFormAddressShipping = false;
            console.log("validCartFormAddressCityShipping: " + validCartFormAddressShipping);
        }
    });
    var validCartFormAddressCityShipping = false;
    $('#cartFormAddressCityShipping').on('blur', function() {
        var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressCityShipping = true;
		}
		else{
            input.addClass("is-invalid");
            validCartFormAddressCityShipping = false;
            console.log("validCartFormAddressCityShipping: " + validCartFormAddressCityShipping);
        }
        
    });
    var validCartFormAddressZipShipping = false;
    $('#cartFormAddressZipShipping').on('blur', function() {
        var input = $(this);
        var zipPattern = /[0-9]{2}-[0-9]{3}/;
        var is_zip = zipPattern.test(input.val());
        var name_length = input.val().length;

		if(name_length >= 3 && is_zip){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
            validCartFormAddressZipShipping = true;
		}
		else{
            input.addClass("is-invalid");
            validCartFormAddressZipShipping = false;
        }
        console.log("validCartFormAddressZipShipping: " + validCartFormAddressZipShipping);
    });
    /**/

    $("form.checkout-form").submit(function(e) { 
        e.preventDefault();

        // validCartPersonEmail && validCartFormName && validCartFormLastName && validCartFormNumber && validCartFormAddress && validCartFormAddressCity && validCartFormAddressZip
        validFormPerson = false;
        if(validCartPersonEmail && validCartFormName && validCartFormLastName && validCartFormNumber && validCartFormAddress && validCartFormAddressCity && validCartFormAddressZip) {
            validFormPerson = true;
            console.log("formularz Pierwszy wysłany: " + validFormPerson);
        } else {
            var checkCartPersonIsValid = $(".step-one-form .form-person input");
            checkCartPersonIsValid.each(function(){
                if($(this).attr("id") == "cartFormAddressNr"){
                } else {
                    var input = $(this);
                    if(input.val().length <= 3) {
                        $(this).addClass("is-invalid");
                    } else {
                        $(this).removeClass("is-invalid");
                    }
                }
            });
            var validFormPerson = false;
            console.log("Popraw błedy w pierwszym formularzu: " + validFormPerson);
        }
        
        var validDifferentShipping = false;
        if ($("#cartFormDifferentShippingAddress").is(":checked")) {
            if(validCartFormLastNameShipping && validCartFormNumberShipping && validCartFormAddressShipping && validCartFormAddressCityShipping && validCartFormAddressZipShipping) {
                validDifferentShipping = true;
                console.log("formularz Drugi wysłany: " + validDifferentShipping);
            } else {
                var checkCartFormLastNameShippingValid = $(".step-one-form .form-different-address input");
                checkCartFormLastNameShippingValid.each(function() {
                    var input = $(this);
                    if($(this).attr("id") == "cartFormAddressNrShipping"){
                    } else {
                        var input = $(this);
                        if(input.val().length <= 3) {
                              $(this).addClass("is-invalid");
                        } else {
                            $(this).removeClass("is-invalid");
                        }
                    }
                    var validDifferentShipping = false;
                    console.log("Popraw błedy w drugim formularzu: " + validDifferentShipping);
                });
                
            }
        }

        var validPersonBusiness = false;
        if ($(checkPersonBusiness[1]).is(":checked")) {
            if(validCompanyNip) {
                validPersonBusiness = true;
                console.log("Walidacja nipu udana " + validPersonBusiness);
            } else {
                var checkPersonBusinessValid = $(".step-one-form .form-firm-address input");
                checkPersonBusinessValid.each(function(){
                    if($(this).attr("id") == "cartFormCompanyName"){
                    } else {
                        var input = $(this);
                        if(input.val().length <= 3) {
                              $(this).addClass("is-invalid");
                        } else {
                            $(this).removeClass("is-invalid");
                        }
                    }
                });
                var validDifferentShipping = false;
                console.log("Błąd walidacji nipu: " + validPersonBusiness);
            }
        }

        
        if(validFormPerson === true) {
            console.log("validFormPerson: " + validFormPerson);
            isValid = true;
            // return true;
        } else {
            console.log("validFormPerson: " + validFormPerson);
            isValid = false;
            // return false;
        }

        if(validDifferentShipping === true && otherAddressChecked === true ) {
            console.log("validDifferentShipping: " + validDifferentShipping + " validDifferentShipping: " +  otherAddressChecked);
            isValid = true;
            // return true;
        } else {
            console.log("validDifferentShipping: " + validDifferentShipping + " validDifferentShipping: " +  otherAddressChecked);
            isValid = false;
            // return false;
        }

        if(validPersonBusiness === true && personBusinessChecked === true ) {
            console.log("validPersonBusiness: " + validPersonBusiness + " personBusinessChecked: " +  personBusinessChecked);
            isValid = true;
            // return true;
        } else {
            console.log("validPersonBusiness: " + validPersonBusiness + " personBusinessChecked: " +  personBusinessChecked);
            isValid = true;
            // return false;
        }
        
        // var allInput = $("#checkout-form input");
        // allInput.each(function(){
        //     console.log($(this).val());
        //     if($(this).val() != "" &&  $(this).attr(required)){
        //         $(this).removeClass("is-invalid");
        //         $(this).addClass("is-valid");
        //         console.log("");
        //     } else {
        //         $(this).addClass("is-invalid");
        //     }
        // });
        // var name = $('#cartFormName');
        // var email = $('#cartPersonEmail');
        
        // if(name.hasClass('valid') && email.hasClass('valid')){
        //     // alert("Pomyślnie wysłano formularz.");	
        // }
        // else {
        //     e.preventDefault();
        //     // alert("Uzupełnij wszystkie pola!");	
        // }
    });

});
console.log("form-validate.js END");
/* end checkout */