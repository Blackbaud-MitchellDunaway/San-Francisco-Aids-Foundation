var this_form_id = parseInt(document.getElementById("dollaramount").form.id, 10);
var other_amount_id, nNewTotal;
var selectedLevel, selectedAmount;
var levelIds = [];
var levelAmounts = [];
var Resp = {};
var text;
var datastring = "";
var fullTotal = 0;
var pageToTrackNext = $('#trackNext').val();
var pageToTrackSubmit = $('#trackSubmit').val();
var pageToTrackSuccess = $('#trackSuccess').val();

function calcTotal() {
    nMonths = $('#donation_months').val();
    var nDonationAmount = selectedLevel;
    if (nDonationAmount != parseInt(nDonationAmount, 10) && nDonationAmount != other_amount_id) {
        $('#monthstotal').html('Select an amount')
    } else if (nDonationAmount == other_amount_id) {
        nDonationAmount = $('#dollaramount').val();
        nNewTotal = nMonths * nDonationAmount;
        if (nNewTotal == parseInt(nNewTotal, 10)) {
            $('#monthstotal').html('$' + nNewTotal)
        } else {
            $('#monthstotal').html('Select an amount')
        }
    } else {
        nNewTotal = nMonths * selectedAmount;
        $('#monthstotal').html('$' + nNewTotal)
    }
    fullTotal = nNewTotal
}
$(document).ready(function () {
    $('#submitter').show();

    $('[id$=submitter]').click(function () {
        $('#PostBackMsg').show();
        $('#SubmitButton').hide()
    })

    $('#dollaramount').hide();
    function findLevelInfo(buttonGroup) {
        if (buttonGroup[0]) {
            for (var i = 0; i < buttonGroup.length; i++) {
                if (buttonGroup[i].value == "other") {
                    other_amount_id = buttonGroup[i].id;
                    buttonGroup[i].id = "other";
                    buttonGroup[i].value = other_amount_id
                } else {
                    levelIds[i] = buttonGroup[i].id;
                    levelAmounts[i] = buttonGroup[i].value
                }
            }
        }
    }

    findLevelInfo($("input[name=amount]"));
    function getSelectedLevel(buttonGroup) {
        if (buttonGroup[0]) {
            for (var i = 0; i < buttonGroup.length; i++) {
                if (buttonGroup[i].checked) {
                    if (buttonGroup[i].value == other_amount_id) {
                        selectedLevel = other_amount_id;
                        selectedAmount = $("#dollaramount").val()
                    } else {
                        selectedLevel = buttonGroup[i].id;
                        selectedAmount = levelAmounts[i]
                    }
                }
            }
        }
    }

    var preselected = $.query.get("amount");
    var matchfound = 2;
    for (var i = 0; i < levelAmounts.length; i++) {
        if (preselected == levelAmounts[i]) {
            $("input[value='" + preselected + "']").attr('checked', true);
            matchfound = 1
        } else {
            matchfound = 0
        }
    }
    if (matchfound == 0 && $("dollaramount").val() == "") {
        $("#other").attr("checked", true);
        $("#dollaramount").val(preselected).show()
    }
    $('#memory-checkbox').click(function () {
        $('#inmemory').slideToggle();
        getSelectedLevel($("input[name=amount]"))
    });
    $('#other').click(function () {
        $('#dollaramount').show();
        getSelectedLevel($("input[name=amount]"))
    });
    $('.set-amount').click(function () {
        $('#dollaramount').hide();
        getSelectedLevel($("input[name=amount]"))
    });
    $('#monthly_checkbox_on').click(function () {
        $('#monthly_donation').slideDown();
        getSelectedLevel($("input[name=amount]"))
    });
    $('#monthly_checkbox_off').click(function () {
        $('#monthly_donation').slideUp();
        getSelectedLevel($("input[name=amount]"))
    });

    $("#cancel").click(function () {
        window.location.reload()
    });

    $("#goback, #backbutton").click(function () {
        $("#step2").hide();
        $("#step1").show()
    });

    $('form#' + this_form_id + ' #nextbutton').click(function () {
        _gaq.push(['b._trackPageview', pageToTrackNext]);

        getSelectedLevel($("input[name=amount]"));
        calcTotal();

        if ($("input[name=amount]:checked").length === 0) {
            alert("Please indicate a donation amount");
            return false
        }

        var required = [];
        required[0] = ["#billing\\.first", "Please enter your first name"];
        required[1] = ["#billing\\.last", "Please enter your last name"];
        required[2] = ["#billing\\.street", "Please enter a street address"];
        required[3] = ["#billing\\.city", "Please enter a city address"];

        var regex = [];
        regex[0] = ["#donor\\.email", /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/, "Please enter a valid email address"];
        regex[1] = ["#cardnumber", /^\d{15,16}$/, "Please enter your card number without spaces"];
        regex[2] = ["#billing\\.expiry", /^\d{2}\/\d{4}$/, "Please enter your card's expiration date in the format MM/YYYY"];
        regex[3] = ["#billing\\.cvv", /^\d{3,4}$/, "Please enter the verification code from the back of your card."];
        regex[4] = ["#billing\\.state", /^[a-zA-Z]{2}$/, "Please enter a two-digit state abbreviation"];

        for (var i = 0; i < required.length; i++) {
            if (!hasValue(required[i][0], required[i][1])) {
                return false
            }
        }

        for (var i = 0; i < regex.length; i++) {
            if (!checkRegexp(regex[i][0], regex[i][1], regex[i][2])) {
                return false
            }
        }

        if (selectedLevel == other_amount_id) {
            if (!checkRegexp("#dollaramount", /^((\d+)|(\d+\.\d{2}))$/, "Please enter a numeric amount, omitting dollar sign.")) {
                return false
            }
            if ($("#dollaramount").val() < 5) {
                alert("Minimum gift amount is $5");
                $("#dollaramount").focus();
                return false
            }
        }

        $("#confirmname td").html($("#billing\\.first").val() + " " + $("#billing\\.last").val());

        $("#confirmemail td, #step3 p span").html($("#donor\\.email").val());

        if ($("input[name=monthly]:checked").val() == "y") {
            $("#giftamount td").html($("#monthstotal").html());
            $("#giftamount td").append(" <span>(in " + $('#donation_months').val() + " monthly installments)</span>")
        } else if (selectedLevel == other_amount_id) {
            $("#giftamount td").html("$" + $('#dollaramount').val())
        } else {
            $("#giftamount td").html("$" + selectedAmount)
        }

        if (!$("#memory-checkbox").attr("checked")) {
            $("#confirmtribute").hide()
        } else {
            $("#confirmtribute").show();
            console.log($("input[name=memoryof]").val());
            text = ($("input[name=memoryof]:checked").val() == "memorial") ? "Memory" : "Honor";
            $("#confirmtribute th span").html(text);
            $("#confirmtribute td").html($("#tribute\\.first").val() + " " + $("#tribute\\.last").val())
        }

        $("#confirmcard td").html("XXXXXXXXXXXX" + $("#cardnumber").val().substr(12, 4));

        $("#confirmcard td").append(" <span>(" + $("#cardtype").val() + ")</span>");

        $("#confirmexpiry td").html($("#billing\\.expiry").val());

        $("#confirmcvv td").html($("#billing\\.cvv").val());

        $("#confirmaddy td").html($("#billing\\.street").val() + "<br />" + $("#billing\\.city").val() + " " + $("#billing\\.state").val() + " " + $("#billing\\.zip").val());

        $("#step1, p.error").hide();

        $("#step2").show();

        $("html,body").scrollTop(0)
    });

    $('form#' + this_form_id + ' #submitter').click(function () {
        _gaq.push(['b._trackPageview', pageToTrackSubmit]);
        url_callback = "https://actnow.tofighthiv.org/site/CRDonationAPI";
        params = {"method":"donate", "api_key":"4E7231022132358DD8", "v":"1.0", "response_format":"json", "billing.address.city":$("#billing\\.city").val(), "billing.address.state":$("#billing\\.state").val(), "billing.address.street1":$("#billing\\.street").val(), "billing.address.zip":$("#billing\\.zip").val(), "billing.name.first":$("#billing\\.first").val(), "billing.name.last":$("#billing\\.last").val(), "donor.email":$("#donor\\.email").val(), "form_id":this_form_id, "level_id":selectedLevel, "additional_amount":0, "card_cvv":$("#billing\\.cvv").val(), "card_number":$("#cardnumber").val(), "send_registration_email":$("#kit").attr("checked"), "send_receipt":"true", "validate":false, "suppress_response_codes":true};
        var date_chunks = $("#billing\\.expiry").val().split("/", 2);

        params['card_exp_date_month'] = date_chunks[0];
        params['card_exp_date_year'] = date_chunks[1];

        if (selectedLevel == other_amount_id) {
            params.other_amount = $("#dollaramount").val()
        }

        if ($("input[name=monthly]:checked").val() == "y") {
            params["installment.duration"] = $("#donation_months").val();
            params["installment.frequency"] = "monthly";
            params.other_amount = fullTotal;
            params.level_id = other_amount_id
        }

        if ($("#memory-checkbox").attr("checked")) {
            tribute_params = {"tribute.type":$("input[name=memoryof]:checked").val(), "tribute.honoree.name.first":$("#tribute\\.first").val(), "tribute.honoree.name.last":$("#tribute\\.last").val(), "tribute.notify.address.city":$("#tribute\\.notify\\.city").val(), "tribute.notify.address.state":$("#tribute\\.notify\\.state").val(), "tribute.notify.address.street1":$("#tribute\\.notify\\.street").val(), "tribute.notify.address.zip":$("#tribute\\.notify\\.zip").val(), "tribute.notify.name.full":$("#tribute\\.notify\\.first").val() + " " + $("#tribute\\.notify\\.last").val()};
            $.extend(params, tribute_params)
        }

        $.each(params, function (index, value) {
            datastring += index + "=" + value + "&"
        });

        //console.log(datastring);

        $.post(url_callback, datastring, function (response) {
            var res = $.parseJSON(response);
            if (res.donationResponse.donation) {
                _gaq.push(['b._trackPageview', pageToTrackSuccess]);
                $("#step2").fadeOut("medium", function () {
                    $("#step3").show()
                })
            } else {
                handleError(res)
            }
        }, "text");
        return false
    });

    $('input:radio').change(function () {
        calcTotal();
        getSelectedLevel($("input[name=amount]"))
    });
    $('#donation_months').change(function () {
        calcTotal();
        getSelectedLevel($("input[name=amount]"))
    });
    $('#dollaramount').keyup(function () {
        calcTotal();
        getSelectedLevel($("input[name=amount]"))
    });

    function hasValue(element, message) {
        if ($(element).val() === "") {
            alert(message);
            $(element).focus();
            return false
        }
        return true
    }

    function checkRegexp(element, expression, message) {
        if (!expression.test($(element).val())) {
            alert(message);
            $(element).focus();
            return false
        }
        return true
    }

    function handleError(object) {
        Response = object;
        mesg = "";
        if ('errors'in object.donationResponse) {
            if ('fieldError'in object.donationResponse.errors) {
                for (var i = 0; i < object.donationResponse.errors.fieldError.length; i++) {
                    mesg += object.donationResponse.errors.fieldError[i] + "<br/>"
                }
            } else if ('pageError'in object.donationResponse.errors) {
                mesg = object.donationResponse.errors.pageError
            }
        } else {
            mesg = "Sorry, an unknown error occurred."
        }
        //console.log(mesg);
        $("p.error").html(mesg).show();
        $("#step2").hide();
        $("#step1").show()
    }
});