console.log('js online');

const launchModal = (data) => {
    $('#outModalName').text(data.name);
    $('#modalImage').attr('src', data.photo);
    $('#modalResult').modal('show');
}  

const closeModal = () => {
    window.location.href = 'http://localhost:3000/';
}

const runAjax = (data) => {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/survey',
        data: data,
        // dataType: 'json',
        success: function(response, textStatus, jqXHR) {
            console.log(`JavaScript ajax response from server: ${response}`);
            console.log(response);
            launchModal(response);
          },
        error: function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR);
            console.log(textStatus);
            alert(textStatus, errorThrown);
        }
      });
}

const validatePhotoUrl = () => {
    const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);
    const photoUrl = $('#photoUrl').val();
    if(!photoUrl.match(regex)) {
        $('.photoUrl').addClass('unAnswered');
    } 
    return photoUrl.match(regex);
}

const validateName = () => {
    let toReturn = true;
    console.log($('#name').val().length < 1);
    if($('#name').val().length < 1) {
        $('.name').addClass('unAnswered');
        toReturn = false;
    }
    console.log(toReturn);
    return toReturn;
}

const validateQInput = () => {
    let validated = true;

    // { q0: '1', q1: '1' }
    let data = {};

    const $questionsChildren = $('.questions').children();

    for(let i = 0; i < $questionsChildren.length; i++) {
        if($questionsChildren[i].className === 'form-group') {
            let $formGroup = $($questionsChildren[i]);
            for(let j = 0; j < $formGroup.children().length; j++) {
                if($formGroup.children()[j].localName === 'select') {
                    let questionId = $formGroup.children()[j].id;
                    let questionValue = $formGroup.children()[j].selectedOptions[0].value;
                    if(parseInt(questionValue) === 0) {
                        validated = false;
                        $formGroup.addClass('unAnswered');
                    }
                    console.log(parseInt(questionValue) === 0);
                    data[questionId] = questionValue;
                }
            }
        }
    }

    if(validated && validateName() && validatePhotoUrl()) {
        runAjax(data);
    } else {
        alert('Missing fields');
    }
}

$(document).on('click', '#btn_submit', function() {
    validateQInput();
});

$(document).on('click', '#btn_closeModal', function(){
    closeModal();
});