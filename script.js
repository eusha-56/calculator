var input = document.querySelector(".input")
var result = document.querySelector(".result")
let digits = document.querySelectorAll(".digit")
let operators = document.querySelectorAll(".operator")
let delete_button = document.querySelectorAll(".delete")
let clear_button = document.querySelectorAll(".clear")
let cursor_pos = input.value.length

function calculate(string) {
    string = string.replace(/\s/g, "")
    string = string.replace(/^[\+\/\*]/, "")
    let divisions = string.split("/")
    divisions = divisions.map((part, i) => {
        let dividor = /(\+|\-)?\d+/
        if (i === 0) {
            return part
        } else if (dividor.test(part)) {
            return part.replace(dividor, 1 / part.match(dividor)[0])
        } else {
            return part
        }
    })
    let parts = divisions.join("*").replace(/\-/g, "+-").replace(/\*\+\-/g, "*-").replace(/\*\+/g, "*").split("+")
    let simplified = parts.map(part => {
        return part.split("*").map(Number).reduce((result, multiply) => result * multiply)
    });
    let sum = simplified.reduce((result, part) => result + part)

    return sum
}

for (let i = 0; i < Object.keys(operators).length; i++) {
    operators[i].addEventListener("click", () => {
        input.value += " " + operators[i].value + " "
        input_filter()
    })
}

for (let i = 0; i < Object.keys(digits).length; i++) {
    digits[i].addEventListener("click", () => {
        input.value += digits[i].value
        input_filter()
    })
}

input.addEventListener("keyup",input_filter)
input.addEventListener("mouseup", function(e){
    cursor_pos = this.selectionEnd
})
clear_button[0].addEventListener("click",clear)
delete_button[0].addEventListener("click", delete_cursor_left)

function input_filter() {
    let input_value = input.value

    let ret_plus = /[\+](\s+)?[\+]|[\-](\s+)?[\-]/g
    let ret_minus = /\-(\s+)?\+|\+(\s+)?\-/g
    let ret_multiplication = /\*(\s+)?[\*\/]/g
    let ret_division = /\/(\s+)?[\*\/]/g

    let letter_remover = /[^\d\s\+\-\*\/]/g
    let front_check = /^(\s)?[\*\/]/
    let end_check = /[\+\-\*\/](\s)?$/

    input_value = input_value.replace(ret_plus, "+")
    input_value = input_value.replace(ret_minus, "-")
    input_value = input_value.replace(ret_multiplication, "*")
    input_value = input_value.replace(ret_division, "/")

    input_value = input_value.replace(letter_remover, "")
    input_value = input_value.replace(front_check, "")
    
    input.value = input_value
    cursor_pos = input.value.length

    if (!end_check.test(input_value)) {
        result.innerHTML = calculate(input_value)
    }else{
        result.innerHTML = ""
    }
}

function clear() {
    input.value = ""
    result.innerHTML = ""
    cursor_pos = input.value.length
}

function delete_cursor_left() {
    let input_value = input.value.split("")
    let regex = /[\+\-\*\/](\s)?$/
    if (cursor_pos>0) {
        input_value.splice(cursor_pos-1,1)
        cursor_pos--
    }
    input_value = input_value.join("")
    input.value = input_value

    if(!regex.test(input_value)) {
        result.innerHTML = calculate(input_value)
    }else {
        result.innerHTML = ""
    }
}




