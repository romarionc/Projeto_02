/* SCRIPT PARA COMPONENTES DE FEEDBACK          */

document.addEventListener("DOMContentLoaded", () => {
  const toastContainer = document.getElementById("toast-container");

  window.showToast = function (title, message, type = "info", duration = 5000) {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<strong>${title}</strong> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);
    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => toast.remove());
    }, duration);
  };

  const modal = document.getElementById("feedback-modal");
  if (modal) {
    const modalOverlay = modal.querySelector(".modal-overlay");
    const modalCloseBtn = document.getElementById("modal-close-btn");

    window.openModal = function ({ title, body, onConfirm, onCancel }) {
      modal.querySelector("#modal-title").textContent = title;
      modal.querySelector("#modal-body").innerHTML = body;
      const confirmBtn = modal.querySelector('[data-action="confirm"]');
      const cancelBtn = modal.querySelector('[data-action="cancel"]');
      const newConfirmBtn = confirmBtn.cloneNode(true);
      const newCancelBtn = cancelBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
      cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

      newConfirmBtn.onclick = () => {
        if (onConfirm) onConfirm();
        closeModal();
      };
      newCancelBtn.onclick = () => {
        if (onCancel) onCancel();
        closeModal();
      };

      modal.hidden = false;
      document.body.style.overflow = "hidden";
    };

    window.closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = "";
    };

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });
  }
});
