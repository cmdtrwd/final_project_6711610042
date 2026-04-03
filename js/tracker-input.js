const trackerForms = document.querySelectorAll(".tracker-form");

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "tracker-delete-btn";
  deleteButton.setAttribute("aria-label", "Delete task");
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", () => {
    const trackerItem = deleteButton.closest(".tracker-item");

    if (trackerItem) {
      trackerItem.remove();
    }
  });

  return deleteButton;
}

function attachDeleteButtons(targetList) {
  targetList.querySelectorAll(".tracker-item").forEach((item) => {
    if (!item.querySelector(".tracker-delete-btn")) {
      item.appendChild(createDeleteButton());
    }
  });
}

trackerForms.forEach((form) => {
  const timeInput = form.querySelector('[name="taskTime"]');
  const taskInput = form.querySelector('[name="taskText"]');
  const targetId = form.dataset.target;
  const targetList = targetId ? document.getElementById(targetId) : null;

  if (!timeInput || !taskInput || !targetList) {
    return;
  }

  attachDeleteButtons(targetList);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const time = timeInput.value.trim();
    const task = taskInput.value.trim();

    if (!time || !task) {
      return;
    }

    const item = document.createElement("li");
    item.className = "tracker-item tracker-item-new";
    item.innerHTML = `
      <p class="task-time">${time}</p>
      <p class="task-text">${task}</p>
    `;

    item.appendChild(createDeleteButton());
    targetList.appendChild(item);

    form.reset();
    timeInput.focus();
  });
});
