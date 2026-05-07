 import trainData from './train.csv?raw';

 const rows = trainData.split('\n').slice(1);

const totalOrders = rows.length;

const totalSales = rows.reduce((sum, row) => {
  const cols = row.split(',');
  const sales = parseFloat(cols[17]) || 0;
  return sum + sales;
}, 0);

const totalProfit = rows.reduce((sum, row) => {
  const cols = row.split(',');
  const profit = parseFloat(cols[20]) || 0;
  return sum + profit;
}, 0);

const profitMargin =
  totalSales > 0
    ? ((totalProfit / totalSales) * 100).toFixed(1)
    : 0; 

console.log(trainData);

 export const mockData = {
  kpis: {
  totalSales: Math.round(totalSales),
  totalProfit: Math.round(totalProfit),
  totalOrders: totalOrders, 
    revenueGrowth: 12.5,
    profitMargin: Number(profitMargin),
  },
  salesTrend: [
    { month: 'Jan', sales: 45000, profit: 5400 },
    { month: 'Feb', sales: 52000, profit: 6100 },
    { month: 'Mar', sales: 48000, profit: 5900 },
    { month: 'Apr', sales: 61000, profit: 7800 },
    { month: 'May', sales: 55000, profit: 6600 },
    { month: 'Jun', sales: 67000, profit: 8900 },
    { month: 'Jul', sales: 72000, profit: 9500 },
    { month: 'Aug', sales: 68000, profit: 8200 },
    { month: 'Sep', sales: 84000, profit: 11200 },
    { month: 'Oct', sales: 91000, profit: 12400 },
    { month: 'Nov', sales: 115000, profit: 15600 },
    { month: 'Dec', sales: 128000, profit: 17800 },
  ],
  categoryPerformance: [
    { category: 'Technology', sales: 836154, profit: 145454 },
    { category: 'Furniture', sales: 742000, profit: 18451 },
    { category: 'Office Supplies', sales: 719047, profit: 122490 },
  ],
  regionalPerformance: [
    { region: 'West', sales: 725457, profit: 108418 },
    { region: 'East', sales: 678781, profit: 91522 },
    { region: 'Central', sales: 501239, profit: 39706 },
    { region: 'South', sales: 391721, profit: 46749 },
  ],
  topCustomers: [
    { name: 'Sean Miller', orders: 15, spend: 25043 },
    { name: 'Tamara Chand', orders: 12, spend: 19052 },
    { name: 'Raymond Buch', orders: 10, spend: 15117 },
    { name: 'Tom Ashbrook', orders: 10, spend: 14595 },
    { name: 'Adrian Barton', orders: 20, spend: 14473 },
  ],
  segmentDist: [
    { name: 'Consumer', value: 52 },
    { name: 'Corporate', value: 30 },
    { name: 'Home Office', value: 18 },
  ]
};

export const codeSnippets = {
  sql: `WITH MonthlySales AS (
    SELECT 
        DATE_TRUNC('month', Order_Date) as Month,
        SUM(Sales) as TotalSales
    FROM orders
    GROUP BY 1
)
SELECT 
    Month,
    TotalSales,
    LAG(TotalSales) OVER (ORDER BY Month) as PrevMonthSales
FROM MonthlySales;`,
  python: `import pandas as pd

def clean_data(df):
    df['Order Date'] = pd.to_datetime(df['Order Date'])
    df['Profit_Margin'] = df['Profit'] / df['Sales']
    return df.dropna()`
};
