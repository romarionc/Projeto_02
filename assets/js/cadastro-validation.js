document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("volunteer-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Força a validação de todos os campos para mostrar o feedback visual
    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      showToast(
        "Campos Incompletos",
        "Por favor, preencha todos os campos obrigatórios corretamente.",
        "warning"
      );
      return;
    }

    openModal({
      title: "Confirmar Cadastro",
      body: "<p>Obrigado pelo seu interesse! Seus dados estão prontos para serem enviados. Deseja continuar?</p>",

      onConfirm: () => {
        console.log(
          "Formulário enviado!",
          Object.fromEntries(new FormData(form))
        );
        showToast(
          "Cadastro Enviado!",
          "Recebemos seus dados. Entraremos em contato em breve. Muito obrigado!",
          "success",
          8000
        );
        form.reset();
        form.classList.remove("was-validated"); // Limpa a validação visual
      },

      onCancel: () => {
        showToast("Ação Cancelada", "Seu cadastro não foi enviado.", "info");
      },
    });
  });

  // Adiciona validação visual em tempo real após a primeira tentativa de envio
  form.querySelectorAll("input, select").forEach((element) => {
    element.addEventListener("input", () => {
      if (form.classList.contains("was-validated")) {
        element.checkValidity();
      }
    });
  });
});
