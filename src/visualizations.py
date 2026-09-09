from pathlib import Path
import matplotlib.pyplot as plt
import seaborn as sns

sns.set_theme(style="whitegrid")

def save_season_bar(df, metric, title, ylabel, output_path):
    summary = df.groupby("Season")[metric].mean().sort_values(ascending=False)
    fig, ax = plt.subplots(figsize=(8, 5))
    summary.plot(kind="bar", ax=ax)
    ax.set_title(title, fontsize=14, weight="bold")
    ax.set_xlabel("Season")
    ax.set_ylabel(ylabel)
    ax.tick_params(axis="x", rotation=0)
    fig.tight_layout()
    fig.savefig(output_path, dpi=180, bbox_inches="tight")
    plt.close(fig)

def save_correlation_heatmap(df, output_path):
    cols = [
        "Yield_Tonnes_Ha", "Production_Tonnes", "Profit_INR", "Revenue_INR",
        "Total_Cost_INR", "Rainfall_mm", "Avg_Temperature_C",
        "Soil_Moisture_pct", "Water_Used_m3",
        "Water_Efficiency_t_per_1000m3", "Disease_Pest_Risk_pct"
    ]
    corr = df[cols].corr()
    fig, ax = plt.subplots(figsize=(10, 8))
    sns.heatmap(corr, cmap="vlag", center=0, ax=ax)
    ax.set_title("Correlation Heatmap", fontsize=14, weight="bold")
    fig.tight_layout()
    fig.savefig(output_path, dpi=180, bbox_inches="tight")
    plt.close(fig)
