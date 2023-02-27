function carregarPainel(){
    document.querySelector(".main-home").classList.remove("hidden")

    document.querySelector(".main-alocacoes").classList.add("hidden")

    document.querySelector(".option1").classList.add("selected-option")
    document.querySelector(".option2").classList.remove("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
}



function carregarAlocacoes(){
    document.querySelector(".main-home").classList.add("hidden")

    document.querySelector(".main-alocacoes").classList.remove("hidden")

    document.querySelector(".option1").classList.remove("selected-option")
    document.querySelector(".option2").classList.add("selected-option")
    document.querySelector(".option3").classList.remove("selected-option")
    document.querySelector(".option4").classList.remove("selected-option")
}

