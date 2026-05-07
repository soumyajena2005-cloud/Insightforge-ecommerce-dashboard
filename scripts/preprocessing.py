import pandas as pd
import numpy as np

def clean_data(file_path):
    print(f"Loading data from {file_path}...")
    df = pd.read_csv(file_path)
    
    # 1. Handling Missing Values
    df['Postal Code'] = df['Postal Code'].fillna(0).astype(int)
    
    # 2. Date Conversion
    df['Order Date'] = pd.to_datetime(df['Order Date'])
    df['Ship Date'] = pd.to_datetime(df['Ship Date'])
    
    # 3. Feature Engineering
    df['Shipping Duration'] = (df['Ship Date'] - df['Order Date']).dt.days
    df['Year'] = df['Order Date'].dt.year
    df['Month'] = df['Order Date'].dt.month
    
    # 4. Outlier Detection (Profit)
    q_low = df["Profit"].quantile(0.01)
    q_hi  = df["Profit"].quantile(0.99)
    df = df[(df["Profit"] < q_hi) & (df["Profit"] > q_low)]
    
    # 5. Customer Loyalty Flag
    customer_counts = df['Customer ID'].value_counts()
    df['Is_Repeat_Customer'] = df['Customer ID'].map(lambda x: customer_counts[x] > 1)
    
    print("Data cleaning completed successfully.")
    return df

if __name__ == "__main__":
    # Example usage
    # df = clean_data('data/raw_sales.csv')
    # df.to_csv('data/cleaned_sales.csv', index=False)
    pass
