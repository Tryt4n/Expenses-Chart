const URL = "data.json";

const accountBalance = document.querySelector("[data-balance]");
const totalSpending = document.querySelector("[data-total-spending]");
const percentageChange = document.querySelector("[data-percentage-change]");

fetch(URL)
  .then((response) => {
    return response.json();
  })
  .then((chartValue) => {
    //  Fetching data and sets them
    accountBalance.textContent = "$" + chartValue.find((value) => value.balance).balance;
    totalSpending.textContent =
      "$" + chartValue.find((value) => value.totalThisMonth).totalThisMonth;
    percentageChange.textContent =
      "+" + chartValue.find((value) => value.percentageChange).percentageChange + "%";

    // Set chart amounts on every day//
    chartValue.forEach((chartDay) => {
      const chartValue = document.querySelectorAll(`[data-chart-${chartDay.day}]`);

      chartValue.forEach((day) => {
        day.setAttribute(`data-chart-${chartDay.day}`, `$${chartDay.amount}`);
      });
    });
    //  Searching for the biggest amount and adding class
    const amounts = chartValue.filter((item) => item.hasOwnProperty("amount"));
    let maxAmount = amounts.reduce((max, current) => (current.amount > max.amount ? current : max));
    const maxAmountElement = document.querySelector(`[data-chart-${maxAmount.day}]`);
    maxAmountElement.classList.add("chart--highest-amount");

    // Set height for every chart item
    maxAmount = maxAmountElement.getAttribute(`data-chart-${maxAmount.day}`).replace("$", "");
    amounts.forEach((amount) => {
      const element = document.querySelector(`[data-chart-${amount.day}]`);
      const height = (amount.amount / maxAmount) * 20;
      element.style.setProperty("--height", height + "vh");
    });
  });
