// ========== QUANTITY ==========

$('.input-quantity--btn.minus').click(function () {
    var val = parseInt($(this).siblings('input').val());
    if (val != 1) {
        val--;
        $(this).siblings('input').val(val);
    }
});

$('.input-quantity--btn.plus').click(function () {
    var val = parseInt($(this).siblings('input').val());
    val++;
    $(this).siblings('input').val(val);
});