console.log("form-validate.js START");

$(document).ready(function () { 
    // var htmlBusinessForm = '<div class="form-different-address"><div class="form-group"><label class="h6">Imię</label><input type="text" class="form-control" id="cartFormNameShipping" name="personName" placeholder="Wpisz imię" required><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group"><label class="h6" for="cartFormLastName">Nazwisko</label><input type="text" class="form-control" id="cartFormLastNameShipping" name="personLastName" placeholder="Wpisz nazwisko" required> <div class="invalid-feedback">To pole jest wymagane</div> </div> <div class="form-group"><label class="h6" for="cartFormNumberShipping">Tel. komórkowy</label><input type="text" pattern="[0-9\' -]{9,11}" class="form-control" id="cartFormNumberShipping" name="personPhone" placeholder="Wpisz tel. komórkowy" inputmode="numeric" required><div class="invalid-feedback">To pole jest wymagane w formacie: xxxxxxxxx</div></div><div class="form-row"><div class="form-group col-md-8"><label class="h6" for="cartFormAddress">Ulica i numer domu</label><input type="text" class="form-control" id="cartFormAddressShipping" name="personStreetNumper" placeholder="Wpisz ulicę i numer domu" required><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group col-md-4"><label class="h6" for="cartFormAddressNr">Numer lokalu</label><input type="number" class="form-control" id="cartFormAddressNrShipping" name="personHomeNumber" placeholder="Numer lokalu" inputmode="numeric"><div class="invalid-feedback">To pole jest wymagane</div></div></div><div class="form-row"><div class="form-group col-md-8"><label class="h6" for="cartFormAddressCity">Miasto</label><input type="text" class="form-control" id="cartFormAddressCityShipping" name="personCity" placeholder="Wpisz miasto" required><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group col-md-4"><label class="h6" for="cartFormAddressZip">Kod pocztowy</label> <input type="text" pattern="\d{2}-\d{3}" class="form-control" id="cartFormAddressZipShipping" name="personZipCode" placeholder="Kod pocztowy" inputmode="numeric" required><div class="invalid-feedback">To pole jest wymagane w formacie: xx-xxx</div></div></div></div>';
    // var htmlBusinessForm = '<div class="form-different-address"><div class="form-group"><label class="h6">Imię</label><input type="text" class="form-control" id="cartFormNameShipping" name="personName" placeholder="Wpisz imię"><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group"><label class="h6" for="cartFormLastName">Nazwisko</label><input type="text" class="form-control" id="cartFormLastNameShipping" name="personLastName" placeholder="Wpisz nazwisko"><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group"><label class="h6" for="cartFormNumberShipping">Tel. komórkowy</label><input type="text" pattern="[0-9]{9}" class="form-control" id="cartFormNumberShipping" name="personPhone" placeholder="Wpisz tel. komórkowy" inputmode="numeric"><div class="invalid-feedback">To pole jest wymagane w formacie: xxxxxxxxx</div></div><div class="form-row"><div class="form-group col-md-8"><label class="h6" for="cartFormAddress">Ulica i numer domu</label><input type="text" class="form-control" id="cartFormAddressShipping" name="personStreetNumper" placeholder="Wpisz ulicę i numer domu"><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group col-md-4"><label class="h6" for="cartFormAddressNr">Numer lokalu</label><input type="aptNumber" class="form-control" id="cartFormAddressNrShipping" name="personHomeNumber" placeholder="Numer lokalu"><div class="invalid-feedback">To pole jest wymagane</div></div></div><div class="form-row"><div class="form-group col-md-8"><label class="h6" for="cartFormAddressCity">Miasto</label><input type="text" class="form-control" id="cartFormAddressCityShipping" name="personCity" placeholder="Wpisz miasto"><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group col-md-4"><label class="h6" for="cartFormAddressZip">Kod pocztowy</label><input type="text" pattern="\\d{2}-\\d{3}" class="form-control" id="cartFormAddressZipShipping" name="personZipCode" placeholder="Kod pocztowy"><div class="invalid-feedback">To pole jest wymagane w formacie: xx-xxx</div></div></div></div>';      
    // var htmlInputFirmNip = '<div class="form-firm-address"><div class="form-group show-company-inpit-name"><label class="h6" for="cartFormCompanyName">Firma</label><input type="text" class="form-control" id="cartFormCompanyName" name="companyName" placeholder="Wpisz nazwę firmy"><div class="invalid-feedback">To pole jest wymagane</div></div><div class="form-group show-nip-inpit show-company-inpit-name"></div><div class="form-group show-nip-inpit show-company-inpit-name"><input type="nip" class="form-control" id="cartFormCompanyNip" name="companyNip" pattern="([0-9][\-]?){10}" placeholder="Wpisz NIP" required><div class="invalid-feedback">To pole jest wymagane w formie: xxxxxxxxxx</div></div></div>';
    
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
    /**/
    $('#cartFormCompanyNip').on('blur', function() {
		var input = $(this);
		var name_length = input.val().length;
		if(name_length == 10 && !isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });
    /**/
    $('#cartPersonEmail').on('blur', function() {
        var input = $(this);
        var emailPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        var is_email = emailPattern.test(input.val());
        if(is_email){
            input.removeClass("is-invalid");
            input.addClass("is-valid");
        }
        else{
            input.addClass("is-invalid");}
    });

    $('#cartFormName, #cartFormNameShipping').on('blur', function() {
		var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });
    $('#cartFormLastName, #cartFormLastNameShipping').on('blur', function() {
		var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });
    $('#cartFormNumber, #cartFormNumberShipping').on('blur', function() {
        var removeDashSpace = $(this).val().replace(/-/g,'').replace(/ /g,'');
        var input = $(this).val(removeDashSpace);
		var name_length = input.val().length;
		if(name_length == 9 && !isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });

    $('#cartFormAddress, #cartFormAddressShipping').on('blur', function() {
        var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });
    $('#cartFormAddressCity, #cartFormAddressCityShipping').on('blur', function() {
        var input = $(this);
		var name_length = input.val().length;
		if(name_length >= 3 && !isNaN(input.val()) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });

    $('#cartFormAddressZip, #cartFormAddressZipShipping').on('blur', function() {
        var input = $(this);
        var zipPattern = /\\d{2}-\\d{3}/;
        var is_zip = zipPattern.test(input.val());
        
        var name_length = input.val().length;
        console.log(" : " +name_length +" : "+ is_zip + " : " + isNaN(input.val()));
		if(name_length >= 3 && !isNaN(input.val() && is_zip) ){
			input.removeClass("is-invalid");
            input.addClass("is-valid");
		}
		else{
            input.addClass("is-invalid");
		}
    });

    $("form.checkout-form").submit(function(e) { 
        var allInput = $("#checkout-form input");
        allInput.each(function(){
            console.log($(this).val());
            if($(this).val() != "" &&  $(this).attr(required)){
                $(this).removeClass("is-invalid");
                $(this).addClass("is-valid");
                console.log("");
            } else {
                $(this).addClass("is-invalid");
            }
        });
        var name = $('#cartFormName');
        var email = $('#cartPersonEmail');
        
        if(name.hasClass('valid') && email.hasClass('valid')){
            // alert("Pomyślnie wysłano formularz.");	
        }
        else {
            e.preventDefault();
            // alert("Uzupełnij wszystkie pola!");	
        }
    });

});
console.log("form-validate.js END");
/* end checkout */