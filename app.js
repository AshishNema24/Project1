// Months array
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

// Initialize data storage
let budgetData = JSON.parse(localStorage.getItem('budgetData')) || initializeBudgetData();

// Initialize empty budget data
function initializeBudgetData() {
    const data = {};
    months.forEach(month => {
        data[month] = {
            income: 0,
            expenses: 0
        };
    });
    return data;
}

// Save data to localStorage
function saveBudgetData() {
    localStorage.setItem('budgetData', JSON.stringify(budgetData));
}

// Populate the months table with input fields
function populateMonthsTable() {
    const tbody = document.getElementById('monthsTable');
    tbody.innerHTML = '';

    months.forEach(month => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${month}</strong>
            </td>
            <td>
                <input 
                    type="number" 
                    class="form-control income-input" 
                    data-month="${month}" 
                    placeholder="0.00" 
                    value="${budgetData[month].income || ''}"
                    min="0"
                    step="0.01"
                >
            </td>
            <td>
                <input 
                    type="number" 
                    class="form-control expense-input" 
                    data-month="${month}" 
                    placeholder="0.00" 
                    value="${budgetData[month].expenses || ''}"
                    min="0"
                    step="0.01"
                >
            </td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners to inputs
    document.querySelectorAll('.income-input, .expense-input').forEach(input => {
        input.addEventListener('change', handleInputChange);
    });
}

// Handle input changes
function handleInputChange(e) {
    const month = e.target.dataset.month;
    const value = parseFloat(e.target.value) || 0;

    if (e.target.classList.contains('income-input')) {
        budgetData[month].income = value;
    } else {
        budgetData[month].expenses = value;
    }

    saveBudgetData();
}

// Update chart with current data
function updateChart() {
    const ctx = document.getElementById('budgetChart');
    
    // Destroy existing chart if it exists
    if (window.budgetChartInstance) {
        window.budgetChartInstance.destroy();
    }

    const incomeData = months.map(month => budgetData[month].income);
    const expenseData = months.map(month => budgetData[month].expenses);

    window.budgetChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'rgba(40, 167, 69, 0.8)',
                    borderColor: 'rgb(40, 167, 69)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: 'rgba(40, 167, 69, 1)'
                },
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    borderColor: 'rgb(220, 53, 69)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: 'rgba(220, 53, 69, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toFixed(2);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(0);
                        }
                    },
                    grid: {
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });

    // Switch to chart tab
    const chartTab = document.getElementById('chart-tab');
    const tab = new bootstrap.Tab(chartTab);
    tab.show();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    populateMonthsTable();
    
    // Auto-generate initial chart if there's data
    const hasData = months.some(month => budgetData[month].income > 0 || budgetData[month].expenses > 0);
    if (hasData) {
        updateChart();
    }
});
