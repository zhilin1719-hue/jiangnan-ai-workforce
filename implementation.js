const $ = (id) => document.getElementById(id);

const fields = {
  roles: $("roles"),
  cost: $("cost"),
  months: $("months"),
  budget: $("budget"),
  transition: $("transition")
};

function number(value, digits = 0) {
  return Number(value).toFixed(digits);
}

function calculate() {
  const roles = Number(fields.roles.value);
  const annualCost = Number(fields.cost.value);
  const activeMonths = Number(fields.months.value);
  const projectBudget = Number(fields.budget.value);
  const transition = Number(fields.transition.value);
  const gross = roles * annualCost * activeMonths / 12;
  const steady = roles * annualCost;
  const net = gross - projectBudget - transition;
  const monthlySteady = steady / 12;
  const payback = monthlySteady > 0 ? (projectBudget + transition) / monthlySteady : 0;

  $("roles-out").value = roles;
  $("cost-out").value = number(annualCost, 1);
  $("months-out").value = activeMonths;
  $("budget-out").value = projectBudget;
  $("transition-out").value = transition;
  $("gross-saving").textContent = number(gross);
  $("net-saving").textContent = number(net);
  $("steady-saving").textContent = number(steady);
  $("payback").textContent = number(payback, 1);

  const status = $("return-status");
  status.textContent = net >= 200 ? "超过 200 万首年净节约目标。" : `距离 200 万首年净节约目标还差 ${number(200 - net)} 万元。`;
  status.classList.toggle("miss", net < 200);
}

Object.values(fields).forEach((field) => field.addEventListener("input", calculate));
calculate();

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("open");
  }));
}
