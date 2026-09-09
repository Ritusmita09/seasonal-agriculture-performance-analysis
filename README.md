# Seasonal Agriculture Performance Analysis

**VOIS AICTE Batch 1 2026–2027 — Major Project**

## Overview
This project analyzes agricultural activities across seasons, geographical areas and farming conditions. The focus is on seasonal variation in yield, production, resource usage, environmental conditions, water efficiency, disease/pest risk and economic outcomes.

## Problem Statement
Agricultural performance can differ across seasons because environmental conditions, farming practices, resource availability and market conditions change. This project investigates meaningful seasonal patterns, trends, relationships and variations in the provided dataset.

## Objectives
- Explore and understand the dataset.
- Clean and prepare the data.
- Compare agricultural performance across seasons.
- Identify seasonal patterns and trends.
- Investigate relationships between environmental/resource variables and outcomes.
- Compare crops, irrigation methods and geographic groups where meaningful.
- Apply appropriate statistical and visualization techniques.
- Develop evidence-based conclusions and recommendations.

## Dataset
- **Records:** 4,000
- **Columns:** 28
- **Seasons:** Kharif, Rabi, Zaid
- **Crops:** Chilli, Cotton, Groundnut, Maize, Pulses, Rice, Sugarcane, Wheat
- **States:** 8
- **Irrigation methods:** Drip, Flood, Rainfed, Sprinkler

### Data Quality
- Duplicate rows: **0**
- Missing rainfall values: **48**
- Missing soil-moisture values: **40**
- Missing yield values: **32**
- Revenue − Cost − Profit maximum absolute error: **0.000000**
- Production − Area × Yield maximum absolute error after cleaning: **0.005000**

The raw CSV is preserved. The reproducible cleaning logic is documented in `src/data_cleaning.py`.

## Methodology
1. Dataset profiling and quality checks
2. Missing-value and duplicate analysis
3. Reproducible data cleaning
4. Descriptive statistics
5. Seasonal performance comparison
6. Crop × season analysis
7. Environmental and resource analysis
8. Economic analysis
9. Correlation analysis
10. One-way ANOVA for selected seasonal comparisons
11. Visualization and interpretation
12. Evidence-based recommendations

## Key Analytical Questions
- How does agricultural performance vary across seasons?
- Which season has the highest/lowest average yield?
- How does profitability vary across seasons?
- How do revenue and cost differ between seasons?
- How do environmental conditions vary by season?
- How do water usage and water efficiency vary?
- How does disease/pest risk vary?
- Which crops perform best within each season?
- Which variables have the strongest association with yield and profit?
- What evidence-based recommendations can be derived?

## Key Findings

- **Highest average yield:** Kharif — 5.63 tonnes/ha.
- **Lowest average yield:** Zaid — 4.63 tonnes/ha.
- **Highest average profit:** Kharif — ₹178,915.
- **Lowest average profit:** Zaid — ₹-24,805.
- **Highest average water efficiency:** Kharif — 5.89 tonnes per 1,000 m³.
- **Highest average disease/pest risk:** Kharif — 54.5%.
- Kharif has the highest average rainfall and soil moisture in the dataset, while Zaid has the lowest of both.
- The crop × season comparison shows meaningful differences in crop performance across seasons.

### Strongest correlations
For yield, the strongest absolute associations are:
- **Water Efficiency t per 1000m3:** 0.916
- **Production Tonnes:** 0.886
- **Profit INR:** 0.490
- **Revenue INR:** 0.433

For profit, the strongest absolute associations are:
- **Revenue INR:** 0.887
- **Production Tonnes:** 0.554
- **Yield Tonnes Ha:** 0.490
- **Water Efficiency t per 1000m3:** 0.489

**Note:** correlation describes association and does not establish causation.

## Statistical Analysis

| Metric | F-statistic | p-value |
|---|---:|---:|
| Yield | 1.463 | 0.231677 |
| Profit | 34.292 | 1.71242e-15 |
| Water efficiency | 6.948 | 0.000971938 |

ANOVA is used to assess whether seasonal group means differ. It does not establish causal effects.

## Dashboard
The Streamlit dashboard provides:
- Overview KPIs
- Seasonal performance analysis
- Crop × season comparisons
- Environmental and resource analysis
- Economic analysis
- Risk and correlation analysis
- Evidence-based insights
- Filters for season, crop, state and irrigation method

**Live Dashboard:** To be added after deployment.

## Technologies Used
Python · Pandas · NumPy · Matplotlib · Seaborn · Plotly · SciPy · Streamlit · Jupyter Notebook · Git/GitHub

## Project Structure
```text
seasonal-agriculture-performance-analysis/
├── app/streamlit_app.py
├── data/
│   ├── seasonal_agriculture_performance_dataset.csv
│   └── processed_agriculture_data.csv
├── images/
├── notebooks/Seasonal_Agriculture_Performance_Analysis.ipynb
├── src/
│   ├── analysis.py
│   ├── data_cleaning.py
│   └── visualizations.py
├── .gitignore
├── README.md
└── requirements.txt
```

## How to Run Locally
```bash
python -m venv .venv
```

Windows:
```bash
.venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Launch dashboard:
```bash
streamlit run app/streamlit_app.py
```

Open the notebook:
```bash
jupyter notebook notebooks/Seasonal_Agriculture_Performance_Analysis.ipynb
```

## Streamlit Deployment
Push the repository to GitHub, select the `main` branch, set the main file path to `app/streamlit_app.py`, and deploy through Streamlit Community Cloud.

The project uses relative paths and does not require an API key.

## Future Scope
- Add more years and larger regional datasets.
- Incorporate time-series forecasting when longitudinal data is available.
- Integrate external weather and market-price data.
- Explore predictive modeling when a clearly defined prediction task and suitable historical data are available.
- Add scenario analysis for crop and irrigation planning.

## Author
**Ritusmita Dutta**

VOIS AICTE Batch 1 2026–2027 — Major Project

## Project Links
- **GitHub:** To be added after repository publication.
- **Live Dashboard:** To be added after deployment.
