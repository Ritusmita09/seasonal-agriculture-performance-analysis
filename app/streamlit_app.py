from pathlib import Path
import sys
import numpy as np
import pandas as pd  # pyright: ignore[reportMissingModuleSource]
import plotly.express as px  # pyright: ignore[reportMissingImports]
import streamlit as st  # pyright: ignore[reportMissingImports]

PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.append(str(PROJECT_ROOT))

from src.data_cleaning import clean_data
from src.analysis import one_way_anova

st.set_page_config(
    page_title="Seasonal Agriculture Performance Analysis",
    page_icon="🌾",
    layout="wide",
    initial_sidebar_state="expanded"
)

@st.cache_data
def load_dataset():
    raw_path = PROJECT_ROOT / "data" / "seasonal_agriculture_performance_dataset.csv"
    raw = pd.read_csv(raw_path)
    cleaned, changes = clean_data(raw)
    return raw, cleaned, changes

raw, df, cleaning_changes = load_dataset()

st.title("🌾 Seasonal Agriculture Performance Analysis")
st.caption("Interactive analysis of seasonal agricultural performance, resources, environmental conditions and economic outcomes.")

# Sidebar
st.sidebar.header("Filters")
seasons = sorted(df["Season"].dropna().unique().tolist())
crops = sorted(df["Crop"].dropna().unique().tolist())
states = sorted(df["State"].dropna().unique().tolist())
irrigation = sorted(df["Irrigation_Method"].dropna().unique().tolist())

selected_seasons = st.sidebar.multiselect("Season", seasons, default=seasons)
selected_crops = st.sidebar.multiselect("Crop", crops, default=crops)
selected_states = st.sidebar.multiselect("State", states, default=states)
selected_irrigation = st.sidebar.multiselect("Irrigation Method", irrigation, default=irrigation)

filtered = df[
    df["Season"].isin(selected_seasons)
    & df["Crop"].isin(selected_crops)
    & df["State"].isin(selected_states)
    & df["Irrigation_Method"].isin(selected_irrigation)
].copy()

if filtered.empty:
    st.warning("No records match the selected filters. Please broaden the selection.")
    st.stop()

tabs = st.tabs([
    "Overview", "Seasonal Performance", "Crop & Season",
    "Environment & Resources", "Economics", "Risk & Relationships", "Insights"
])

# -------- Overview --------
with tabs[0]:
    st.subheader("Overview")
    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Records", f"{len(filtered):,}")
    c2.metric("Average Yield", f"{filtered['Yield_Tonnes_Ha'].mean():,.2f} t/ha")
    c3.metric("Total Production", f"{filtered['Production_Tonnes'].sum():,.1f} t")
    c4.metric("Average Profit", f"₹{filtered['Profit_INR'].mean():,.0f}")

    c5, c6, c7 = st.columns(3)
    c5.metric("Average Revenue", f"₹{filtered['Revenue_INR'].mean():,.0f}")
    c6.metric("Water Efficiency", f"{filtered['Water_Efficiency_t_per_1000m3'].mean():,.2f} t/1,000 m³")
    c7.metric("Disease/Pest Risk", f"{filtered['Disease_Pest_Risk_pct'].mean():,.1f}%")

    st.divider()
    col1, col2 = st.columns(2)
    with col1:
        season_yield = filtered.groupby("Season", as_index=False)["Yield_Tonnes_Ha"].mean()
        fig = px.bar(season_yield, x="Season", y="Yield_Tonnes_Ha", title="Average Yield by Season",
                     labels={"Yield_Tonnes_Ha":"Yield (tonnes/ha)"}, text_auto=".2f")
        st.plotly_chart(fig, use_container_width=True)
    with col2:
        season_profit = filtered.groupby("Season", as_index=False)["Profit_INR"].mean()
        fig = px.bar(season_profit, x="Season", y="Profit_INR", title="Average Profit by Season",
                     labels={"Profit_INR":"Average Profit (INR)"}, text_auto=".0f")
        st.plotly_chart(fig, use_container_width=True)

# -------- Seasonal Performance --------
with tabs[1]:
    st.subheader("Seasonal Performance")
    summary = filtered.groupby("Season").agg(
        Yield=("Yield_Tonnes_Ha","mean"),
        Production=("Production_Tonnes","mean"),
        Revenue=("Revenue_INR","mean"),
        Cost=("Total_Cost_INR","mean"),
        Profit=("Profit_INR","mean"),
        Water_Efficiency=("Water_Efficiency_t_per_1000m3","mean")
    ).reset_index()

    metric = st.selectbox("Select performance metric", [
        "Yield", "Production", "Revenue", "Cost", "Profit", "Water_Efficiency"
    ])
    fig = px.bar(summary, x="Season", y=metric, title=f"{metric} by Season", text_auto=".2f")
    st.plotly_chart(fig, use_container_width=True)

    st.dataframe(summary.round(2), use_container_width=True, hide_index=True)

# -------- Crop & Season --------
with tabs[2]:
    st.subheader("Crop & Season Analysis")
    crop_metric = st.selectbox("Crop metric", ["Yield_Tonnes_Ha", "Production_Tonnes", "Profit_INR", "Revenue_INR"])
    crop_summary = filtered.groupby(["Crop","Season"], as_index=False)[crop_metric].mean()
    fig = px.bar(crop_summary, x="Crop", y=crop_metric, color="Season",
                 barmode="group", title=f"Average {crop_metric.replace('_',' ')} by Crop and Season")
    st.plotly_chart(fig, use_container_width=True)
    pivot = filtered.pivot_table(index="Crop", columns="Season", values="Yield_Tonnes_Ha", aggfunc="mean")
    st.markdown("**Average Yield (tonnes/ha) — Crop × Season**")
    fig = px.imshow(
        pivot,
        text_auto=".2f",
        aspect="auto",
        color_continuous_scale="YlGnBu",
        labels={"x": "Season", "y": "Crop", "color": "Yield (tonnes/ha)"},
        title="Average Yield (tonnes/ha) — Crop × Season"
    )
    st.plotly_chart(fig, use_container_width=True)

# -------- Environment & Resources --------
with tabs[3]:
    st.subheader("Environmental & Resource Analysis")
    env_metric = st.selectbox("Select variable", [
        "Rainfall_mm", "Avg_Temperature_C", "Humidity_pct",
        "Sunlight_Hours_Day", "Soil_Moisture_pct", "Water_Used_m3",
        "Water_Efficiency_t_per_1000m3", "Fertilizer_kg_ha",
        "Pesticide_Litre_ha", "Nitrogen_kg_ha", "Phosphorus_kg_ha",
        "Potassium_kg_ha"
    ])
    env_summary = filtered.groupby("Season", as_index=False)[env_metric].mean()
    fig = px.bar(env_summary, x="Season", y=env_metric, title=f"{env_metric.replace('_',' ')} by Season", text_auto=".2f")
    st.plotly_chart(fig, use_container_width=True)

    irr = pd.crosstab(filtered["Season"], filtered["Irrigation_Method"], normalize="index") * 100
    irr = irr.reset_index().melt(id_vars="Season", var_name="Irrigation Method", value_name="Share (%)")
    fig = px.bar(irr, x="Season", y="Share (%)", color="Irrigation Method", barmode="stack",
                 title="Irrigation Method Mix by Season")
    st.plotly_chart(fig, use_container_width=True)

# -------- Economics --------
with tabs[4]:
    st.subheader("Economic Performance")
    econ = filtered.groupby("Season", as_index=False)[["Revenue_INR","Total_Cost_INR","Profit_INR"]].mean()
    econ_long = econ.melt(id_vars="Season", var_name="Metric", value_name="INR")
    fig = px.bar(econ_long, x="Season", y="INR", color="Metric", barmode="group",
                 title="Average Revenue, Cost and Profit by Season")
    st.plotly_chart(fig, use_container_width=True)

    crop_profit = filtered.groupby("Crop", as_index=False)["Profit_INR"].mean().sort_values("Profit_INR", ascending=False)
    fig = px.bar(crop_profit, x="Crop", y="Profit_INR", title="Average Profit by Crop", text_auto=".0f")
    st.plotly_chart(fig, use_container_width=True)

# -------- Risk & Relationships --------
with tabs[5]:
    st.subheader("Risk & Relationships")
    risk = filtered.groupby("Season", as_index=False)["Disease_Pest_Risk_pct"].mean()
    fig = px.bar(risk, x="Season", y="Disease_Pest_Risk_pct", title="Average Disease/Pest Risk by Season",
                 labels={"Disease_Pest_Risk_pct":"Risk (%)"}, text_auto=".1f")
    st.plotly_chart(fig, use_container_width=True)

    state_season_yield = filtered.pivot_table(
        index="State",
        columns="Season",
        values="Yield_Tonnes_Ha",
        aggfunc="mean"
    )
    if state_season_yield.empty:
        st.info("Insufficient filtered data to display average yield by state and season.")
    else:
        fig = px.imshow(
            state_season_yield,
            text_auto=".2f",
            aspect="auto",
            color_continuous_scale="YlGnBu",
            labels={"x": "Season", "y": "State", "color": "Average Yield (tonnes/ha)"},
            title="Average Yield by State and Season",
            height=max(500, 70 * len(state_season_yield.index))
        )
        st.plotly_chart(fig, use_container_width=True)
        st.caption(
            "This heatmap helps evaluate whether seasonal yield patterns are consistent across states "
            "and highlights geographic differences in average yield."
        )

    numeric_cols = filtered.select_dtypes(include=np.number).columns.tolist()
    correlation_matrix = filtered[numeric_cols].corr(method="pearson")
    fig = px.imshow(
        correlation_matrix,
        text_auto=".2f",
        aspect="auto",
        color_continuous_scale="RdBu_r",
        zmin=-1,
        zmax=1,
        labels={"x": "Variable", "y": "Variable", "color": "Pearson correlation"},
        title="Correlation Heatmap — Numerical Variables"
    )
    st.plotly_chart(fig, use_container_width=True)
    x_var = st.selectbox("X-axis variable", [
        "Rainfall_mm", "Avg_Temperature_C", "Soil_Moisture_pct",
        "Water_Used_m3", "Water_Efficiency_t_per_1000m3",
        "Farm_Area_Hectares", "Market_Price_INR_Tonne"
    ])
    y_var = st.selectbox("Y-axis variable", ["Yield_Tonnes_Ha", "Profit_INR"])
    fig = px.scatter(filtered, x=x_var, y=y_var, color="Season", hover_data=["Crop","State"],
                     title=f"{y_var.replace('_',' ')} vs {x_var.replace('_',' ')}")
    st.plotly_chart(fig, use_container_width=True)

# -------- Insights --------
with tabs[6]:
    st.subheader("Evidence-Based Insights")
    season_means = filtered.groupby("Season")[[
        "Yield_Tonnes_Ha","Production_Tonnes","Profit_INR",
        "Water_Efficiency_t_per_1000m3","Disease_Pest_Risk_pct"
    ]].mean()

    def percentage_difference(value, comparison):
        if pd.isna(comparison) or comparison == 0:
            return None
        return abs(value - comparison) / abs(comparison) * 100

    if len(filtered) < 2 or season_means.empty:
        st.info("At least two filtered records are needed to generate comparative insights.")
    else:
        yield_by_season = season_means["Yield_Tonnes_Ha"].dropna()
        profit_by_season = season_means["Profit_INR"].dropna()
        efficiency_by_season = season_means["Water_Efficiency_t_per_1000m3"].dropna()
        risk_by_season = season_means["Disease_Pest_Risk_pct"].dropna()

        st.markdown("### Key Findings")
        if not yield_by_season.empty:
            best_yield = yield_by_season.idxmax()
            lowest_yield = yield_by_season.idxmin()
            yield_gap = percentage_difference(yield_by_season[best_yield], yield_by_season[lowest_yield])
            yield_comparison = (
                f"{yield_gap:.1f}% above {lowest_yield}"
                if yield_gap is not None and best_yield != lowest_yield
                else "the highest observed alternative"
            )
            st.success(
                f"**Yield:** {best_yield} leads at {yield_by_season[best_yield]:.2f} t/ha, "
                f"{yield_comparison} ({yield_by_season[lowest_yield]:.2f} t/ha)."
            )

        if not profit_by_season.empty:
            best_profit = profit_by_season.idxmax()
            lowest_profit = profit_by_season.idxmin()
            profit_gap = abs(profit_by_season[best_profit] - profit_by_season[lowest_profit])
            st.info(
                f"**Profit:** {best_profit} is highest at ₹{profit_by_season[best_profit]:,.0f}; "
                f"the gap versus {lowest_profit} is ₹{profit_gap:,.0f} "
                f"(₹{profit_by_season[lowest_profit]:,.0f})."
            )

        if not efficiency_by_season.empty:
            best_efficiency = efficiency_by_season.idxmax()
            lowest_efficiency = efficiency_by_season.idxmin()
            efficiency_gap = percentage_difference(
                efficiency_by_season[best_efficiency], efficiency_by_season[lowest_efficiency]
            )
            efficiency_comparison = (
                f"{efficiency_gap:.1f}% above {lowest_efficiency}"
                if efficiency_gap is not None and best_efficiency != lowest_efficiency
                else "the highest observed alternative"
            )
            st.info(
                f"**Water efficiency:** {best_efficiency} records "
                f"{efficiency_by_season[best_efficiency]:.2f} t per 1,000 m³, "
                f"{efficiency_comparison}."
            )

        if not risk_by_season.empty:
            highest_risk = risk_by_season.idxmax()
            lowest_risk = risk_by_season.idxmin()
            risk_gap = risk_by_season[highest_risk] - risk_by_season[lowest_risk]
            st.warning(
                f"**Disease/pest risk:** {highest_risk} is highest at "
                f"{risk_by_season[highest_risk]:.1f}%, "
                f"{risk_gap:.1f} percentage points above {lowest_risk}."
            )

        numeric_cols = filtered.select_dtypes(include=np.number).columns.tolist()
        if len(filtered) >= 2 and len(numeric_cols) >= 2:
            correlations = filtered[numeric_cols].corr(method="pearson")
            relationship_findings = []
            for target in ["Yield_Tonnes_Ha", "Profit_INR"]:
                if target not in correlations:
                    continue
                target_correlations = correlations[target].drop(labels=target).dropna()
                if target_correlations.empty:
                    continue
                related_variable = target_correlations.abs().idxmax()
                relationship_findings.append(
                    f"**{target.replace('_', ' ')}:** strongest observed relationship is "
                    f"with {related_variable.replace('_', ' ')} "
                    f"(r = {target_correlations[related_variable]:.2f})."
                )
            if relationship_findings:
                st.markdown("### Strongest Observed Relationships")
                for finding in relationship_findings:
                    st.write(finding)

        st.markdown("### Evidence-Based Recommendations")
        recommendations = []
        if not yield_by_season.empty:
            recommendations.append(
                f"Use {best_yield} as the current yield benchmark when comparing seasonal plans "
                f"({yield_by_season[best_yield]:.2f} t/ha)."
            )
        if not profit_by_season.empty:
            recommendations.append(
                f"Prioritize further review of the crop and resource mix observed in {best_profit}, "
                f"which has the highest average profit (₹{profit_by_season[best_profit]:,.0f})."
            )
        if not efficiency_by_season.empty:
            recommendations.append(
                f"Review resource-use patterns in {lowest_efficiency}, where observed water efficiency "
                f"is lowest at {efficiency_by_season[lowest_efficiency]:.2f} t per 1,000 m³."
            )
        if not risk_by_season.empty:
            recommendations.append(
                f"Give additional monitoring attention to {highest_risk}, which has the highest observed "
                f"disease/pest risk ({risk_by_season[highest_risk]:.1f}%)."
            )
        crop_profit = filtered.groupby("Crop")["Profit_INR"].mean().dropna()
        if not crop_profit.empty:
            best_crop = crop_profit.idxmax()
            recommendations.append(
                f"Use {best_crop} as the current profitability reference when comparing crop choices "
                f"(₹{crop_profit[best_crop]:,.0f} average profit)."
            )
        for recommendation in recommendations[:5]:
            st.markdown(f"- {recommendation}")

    st.markdown("### Interpretation guidance")
    st.write(
        "These findings describe associations observed in the dataset. "
        "They should not be interpreted as proof that a single environmental or resource variable causes a change in yield or profit."
    )

    st.markdown("### Data quality notes")
    quality_columns = st.columns(4)
    quality_columns[0].metric("Missing Rainfall_mm", f"{raw['Rainfall_mm'].isna().sum():,}")
    quality_columns[1].metric("Missing Soil_Moisture_pct", f"{raw['Soil_Moisture_pct'].isna().sum():,}")
    quality_columns[2].metric("Missing Yield_Tonnes_Ha", f"{raw['Yield_Tonnes_Ha'].isna().sum():,}")
    quality_columns[3].metric("Duplicate rows", f"{raw.duplicated().sum():,}")

    st.markdown("### Reproducibility")
    st.write(
        "The dashboard reads the project CSV through a relative project path and applies the same cleaning logic used in the notebook."
    )
