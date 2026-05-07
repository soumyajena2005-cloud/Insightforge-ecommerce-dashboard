/**
 * E-Commerce Analysis SQL Queries
 * Used for extracting business insights from the production database.
 */

-- 1. Sales Overview & Growth (Current Year vs Previous)
WITH MonthlySales AS (
    SELECT 
        DATE_TRUNC('month', Order_Date) as Month,
        SUM(Sales) as TotalSales,
        SUM(Profit) as TotalProfit
    FROM orders
    GROUP BY 1
)
SELECT 
    Month,
    TotalSales,
    LAG(TotalSales) OVER (ORDER BY Month) as PrevMonthSales,
    ((TotalSales - LAG(TotalSales) OVER (ORDER BY Month)) / LAG(TotalSales) OVER (ORDER BY Month)) * 100 as GrowthRate
FROM MonthlySales;

-- 2. Customer Segmentation (RFM Analysis Base)
SELECT 
    Customer_ID,
    Customer_Name,
    COUNT(Order_ID) as Frequency,
    SUM(Sales) as Monetary,
    MAX(Order_Date) as LastPurchaseDate,
    DATEDIFF(day, MAX(Order_Date), CURRENT_DATE) as Recency
FROM orders
GROUP BY 1, 2
ORDER BY Monetary DESC
LIMIT 10;

-- 3. Product Category Profitability
SELECT 
    Category,
    Sub_Category,
    SUM(Sales) as Total_Revenue,
    SUM(Profit) as Net_Profit,
    (SUM(Profit) / SUM(Sales)) * 100 as Profit_Margin
FROM orders
GROUP BY 1, 2
ORDER BY Net_Profit DESC;

-- 4. Regional Performance & Shipping Delays
SELECT 
    Region,
    State,
    SUM(Sales) as TotalSales,
    AVG(DATEDIFF(day, Order_Date, Ship_Date)) as Avg_Ship_Days
FROM orders
GROUP BY 1, 2
HAVING SUM(Sales) > 5000
ORDER BY TotalSales DESC;
