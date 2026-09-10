import numpy as np
import pandas as pd
from scipy import stats

PERFORMANCE_METRICS = [
    "Yield_Tonnes_Ha", "Production_Tonnes", "Profit_INR",
    "Revenue_INR", "Total_Cost_INR", "Water_Efficiency_t_per_1000m3",
    "Disease_Pest_Risk_pct"
]

def seasonal_summary(df):
    return df.groupby("Season")[PERFORMANCE_METRICS].agg(["mean", "median", "std"]).round(2)

def seasonal_means(df):
    return df.groupby("Season")[PERFORMANCE_METRICS].mean().round(2)

def one_way_anova(df, column):
    groups = [g[column].dropna().values for _, g in df.groupby("Season")]
    return stats.f_oneway(*groups)

def top_correlations(df, target, n=6):
    corr = df.select_dtypes(include=np.number).corr()[target].drop(target)
    return corr.abs().sort_values(ascending=False).head(n).index.tolist(), corr

def data_quality_report(df):
    return {
        "rows": len(df),
        "columns": df.shape[1],
        "duplicates": int(df.duplicated().sum()),
        "missing_cells": int(df.isna().sum().sum()),
        "revenue_profit_consistency_max_abs_error": float(
            np.abs(df["Revenue_INR"] - df["Total_Cost_INR"] - df["Profit_INR"]).max()
        ),
        "production_yield_consistency_max_abs_error": float(
            np.abs(
                df["Production_Tonnes"] -
                df["Farm_Area_Hectares"] * df["Yield_Tonnes_Ha"]
            ).max()
        ),
    }
