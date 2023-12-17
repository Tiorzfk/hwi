function getData() {
    $('.loading').css('display', 'flex')
    $("#content-data").empty()

    $.ajax({
        type: "GET",
        url: "/api/forms",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            if(data.result.length > 0)
            {
                data.result.forEach(val => {
                    $("#content-data").append(`
                        <div class="content">
                            <div class="content-header">
                                <span class="name">${val.name}</span>
                                <span class="email">${val.email}</span>
                            </div>
                            <div class="content-body">
                                <span class="no_hp">${val.no_hp}</span>
                                <span class="address">${val.address}</span>
                            </div>
                        </div>
                    `)
                });
            }else{
                $("#content-data").css('justify-content', 'start')
                $("#content-data").html(`
                    <div class="content">
                        <div class="content-header">
                            <span class="name">Empty Data</span>
                        </div>
                    </div>
                `)
            }
            $('.loading').css('display', 'none')
        },
        error: function(errMsg) {
            $('.loading').css('display', 'none')

            alert(errMsg);
        }
    });
}

function clearForm() {
    $("input[name='name']").val('')
    $("input[name='email']").val('')
    $("input[name='no_hp']").val('')
    $("textarea[name='address']").val('')
}

function validateForm(data) {
    var errorField = {
        'name': [],
        'email': [],
        'no_hp': [],
        'address': []
    }
    var isError = false

    if(!data.name)
    {
        isError = true
        errorField['name'].push('Name cannot be empty')
    }

    if(!data.email)
    {
        isError = true
        errorField['email'].push('Email cannot be empty')
    }

    if(!data.no_hp)
    {
        isError = true
        errorField['no_hp'].push('No. HP cannot be empty')
    }

    if(!data.address)
    {
        isError = true
        errorField['no_hp'].push('Address cannot be empty')
    }

    return isError
}

$("#save").click(function(e) {
    e.preventDefault()

    const name = $("input[name='name']").val()
    const email = $("input[name='email']").val()
    const no_hp = $("input[name='no_hp']").val()
    const address = $("textarea[name='address']").val()
    const data = {
        name,
        email,
        no_hp,
        address
    }

    const validate = validateForm(data)
    if(validate)
    {
        alert('Please complete the form !')
        return ;
    }

    $.ajax({
        type: "POST",
        url: "/api/forms",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            alert('Form successfuly created');
            getData()
            clearForm()
        },
        error: function(errMsg) {
            alert(errMsg);
        }
    });
})

$("#clear").click(function() {
    if (confirm("Are you sure want to clear data ?") == true) {
        $.ajax({
            type: "POST",
            url: "/api/forms/clear",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                alert('Form successfuly cleared');
                getData()
            },
            error: function(errMsg) {
                alert(errMsg);
            }
        });
    }
})

$("#reset").click(function() {
    clearForm()
})

$(document).ready(function() {
    getData()
}) 