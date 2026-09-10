from pathlib import Path
import pandas as pd
import numpy as np

NUMERIC_COLUMNS = [
    "Farm_Area_Hectares", "Rainfall_mm", "Avg_Temperature_C",
    "Humidity_pct", "Sunlight_Hours_Day", "Soil_pH", "Soil_Moisture_pct",
    "Nitrogen_kg_ha", "Phosphorus_kg_ha", "Potassium_kg_ha",
    "Fertilizer_kg_ha", "Pesticide_Litre_ha", "Seed_Quality_Score",
    "Yield_Tonnes_Ha", "Production_Tonnes", "Market_Price_INR_Tonne",
    "Total_Cost_INR", "Revenue_INR", "Profit_INR", "Water_Used_m3",
    "Water_Efficiency_t_per_1000m3", "Disease_Pest_Risk_pct"
]

def clean_data(df: pd.DataFrame):
    """Return a cleaned copy and a list of reproducible cleaning actions."""
    out = df.copy()
    changes = []

    for c in out.select_dtypes(include="object").columns:
        before = out[c].copy()
        out[c] = out[c].astype(str).str.strip()
        changed = int((before != out[c]).sum())
        if changed:
            changes.append(f"Trimmed whitespace in {c}: {changed} cells")

    # Small missingness: impute by season median.
    for c in ["Rainfall_mm", "Soil_Moisture_pct"]:
        n = int(out[c].isna().sum())
        if n:
            out[c] = out[c].fillna(out.groupby("Season")[c].transform("median"))
            changes.append(f"Filled {n} missing {c} values using season-level median")

    # Yield is mathematically recoverable because production and area are complete.
    n = int(out["Yield_Tonnes_Ha"].isna().sum())
    if n:
        reconstructed = out["Production_Tonnes"] / out["Farm_Area_Hectares"]
        out["Yield_Tonnes_Ha"] = out["Yield_Tonnes_Ha"].fillna(reconstructed)
        changes.append(
            f"Reconstructed {n} missing Yield_Tonnes_Ha values from "
            "Production_Tonnes / Farm_Area_Hectares"
        )

    return out, changes

def load_data(data_path=None):
    if data_path is None:
        data_path = Path(__file__).resolve().parents[1] / "data" / "seasonal_agriculture_performance_dataset.csv"
    df = pd.read_csv(data_path)
    cleaned, changes = clean_data(df)
    return cleaned, changes
