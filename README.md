# 🌾 Seasonal Agriculture Performance Analysis

> **VOIS AICTE EDUNET FOUNDATION INTERNSHIP 2026–2027 — Major Project**

An end-to-end data analytics project exploring how **season, crop, geography, environmental conditions, resource usage, water efficiency, disease/pest risk, and economic factors** influence agricultural performance.

---

## 📌 Project Overview

Agricultural performance can vary significantly across seasons due to changes in environmental conditions, farming practices, resource availability, and market conditions.

This project analyzes a dataset of **4,000 agricultural records** to identify meaningful seasonal patterns, compare crop performance, examine resource efficiency, investigate relationships between variables, and derive evidence-based recommendations.

The project combines:

- 📊 Exploratory Data Analysis
- 🧹 Reproducible Data Cleaning
- 📈 Statistical Analysis
- 🌱 Crop & Seasonal Analysis
- 💧 Water Efficiency Analysis
- 🌦️ Environmental Analysis
- 💰 Economic & Profitability Analysis
- ⚠️ Disease/Pest Risk Analysis
- 📉 Correlation Analysis
- 🧪 One-way ANOVA
- 🖥️ Interactive Streamlit Dashboard

---

## 🎯 Objectives

The main objectives of this project are to:

- Explore and understand the agricultural dataset.
- Identify and handle missing values and data-quality issues.
- Compare agricultural performance across **Kharif, Rabi, and Zaid** seasons.
- Analyze crop performance across different seasons.
- Investigate environmental and resource-related patterns.
- Examine water usage and water efficiency.
- Analyze profitability, revenue, and production costs.
- Identify variables strongly associated with yield and profit.
- Compare meaningful geographic and irrigation patterns.
- Apply appropriate statistical and visualization techniques.
- Develop evidence-based conclusions and practical recommendations.

---

## 📂 Dataset

The project uses an agricultural performance dataset containing:

| Attribute | Details |
|---|---|
| 📌 Records | **4,000** |
| 📊 Columns | **28** |
| 🌱 Seasons | Kharif, Rabi, Zaid |
| 🌾 Crops | Chilli, Cotton, Groundnut, Maize, Pulses, Rice, Sugarcane, Wheat |
| 🗺️ States | **8** |
| 💧 Irrigation Methods | Drip, Flood, Rainfed, Sprinkler |

### 🔎 Data Quality

| Data Quality Check | Result |
|---|---:|
| Duplicate rows | **0** |
| Missing rainfall values | **48** |
| Missing soil-moisture values | **40** |
| Missing yield values | **32** |
| Revenue − Cost − Profit max error | **0.000000** |
| Production − Area × Yield max error after cleaning | **0.005000** |

The original raw dataset is preserved, while the cleaning process is implemented through reproducible logic in `src/data_cleaning.py`.

---

## 🔬 Methodology

The analysis follows a structured data analytics workflow:

```text
Raw Dataset
     ↓
Data Profiling & Quality Checks
     ↓
Missing Value & Duplicate Analysis
     ↓
Reproducible Data Cleaning
     ↓
Exploratory Data Analysis
     ↓
Seasonal Performance Analysis
     ↓
Crop × Season Analysis
     ↓
Environmental & Resource Analysis
     ↓
Economic Analysis
     ↓
Correlation Analysis
     ↓
ANOVA
     ↓
Visualization & Interpretation
     ↓
Evidence-Based Recommendations
     ↓
Interactive Dashboard

❓ Key Analytical Questions

The project investigates questions such as:

How does agricultural performance vary across seasons?
Which season has the highest and lowest average yield?
How does profitability change across seasons?
How do revenue and production costs differ?
How do rainfall, temperature, humidity, and sunlight vary?
How do water usage and water efficiency differ?
How does disease/pest risk vary across seasons?
Which crops perform best within each season?
Which variables have the strongest association with yield?
Which variables have the strongest association with profit?
Are seasonal patterns consistent across different states?
What evidence-based recommendations can be derived from the analysis?
📊 Key Findings
🌾 Seasonal Yield

Kharif recorded the highest average yield:

5.63 tonnes/ha

while Zaid recorded the lowest:

4.63 tonnes/ha

Kharif's average yield was approximately 21.5% higher than Zaid.

💰 Profitability

Kharif achieved the highest average profit:

₹178,915

while Zaid recorded the lowest:

₹−24,805

This represents an average profit gap of approximately:

₹203,719

between the two seasons.

💧 Water Efficiency

Kharif showed the highest average water efficiency:

5.89 tonnes per 1,000 m³

This was approximately 33.5% higher than Zaid.

⚠️ Disease & Pest Risk

The highest average disease/pest risk was observed during Kharif:

54.5%

compared with approximately 38.2% in Zaid.

This indicates that higher agricultural productivity during Kharif is accompanied by a higher observed disease/pest risk in the dataset.

🌦️ Environmental Conditions

Kharif recorded the highest average rainfall and soil moisture in the dataset, while Zaid recorded the lowest values for both.

The analysis also shows noticeable differences in temperature, humidity, sunlight, and water usage across seasons.

🔗 Strongest Observed Relationships
Yield

The strongest absolute associations with yield were:

Variable	Correlation
💧 Water Efficiency	0.916
🌾 Production	0.886
💰 Profit	0.490
💵 Revenue	0.433
Profit

The strongest absolute associations with profit were:

Variable	Correlation
💵 Revenue	0.887
🌾 Production	0.554
🌱 Yield	0.490
💧 Water Efficiency	0.489

⚠️ Important: Correlation indicates statistical association. It does not establish causation.

🧪 Statistical Analysis

One-way ANOVA was applied to evaluate whether seasonal group means differed for selected metrics.

Metric	F-statistic	p-value
Yield	1.463	0.231677
Profit	34.292	1.71242e-15
Water Efficiency	6.948	0.000972
Interpretation
Yield: No statistically significant seasonal difference at the 5% significance level.
Profit: Statistically significant seasonal differences were observed.
Water Efficiency: Statistically significant seasonal differences were observed.

ANOVA evaluates differences between group means; it does not establish causal effects.

🖥️ Interactive Dashboard

The project includes an interactive Streamlit dashboard designed to make the analysis easier to explore.

Dashboard Sections
Section	What it covers
📌 Overview	Key KPIs and dataset summary
🌦️ Seasonal Performance	Yield, production, profit & seasonal comparisons
🌱 Crop & Season	Crop-level and season-level performance
💧 Environment & Resources	Rainfall, soil, irrigation & water usage
💰 Economics	Revenue, cost & profitability
⚠️ Risk & Relationships	Disease/pest risk & statistical relationships
💡 Insights	Evidence-based findings and recommendations
Interactive Filters

The dashboard supports filtering by:

Season
Crop
State
Irrigation Method
🚀 Live Dashboard

Coming soon — available after Streamlit Community Cloud deployment.

📓 Notebook

The complete analytical workflow is available in the Jupyter Notebook:

notebooks/
└── Seasonal_Agriculture_Performance_Analysis_Polished.ipynb

The notebook contains:

Dataset inspection
Data-quality checks
Cleaning
Descriptive statistics
Seasonal comparisons
Crop × Season analysis
Environmental analysis
Economic analysis
Correlation analysis
Heatmaps
ANOVA
Visualizations
Analytical interpretations
Recommendations
🛠️ Technologies Used
Programming & Analysis

Python · Pandas · NumPy · SciPy

Visualization

Matplotlib · Seaborn · Plotly

Dashboard

Streamlit

Development & Version Control

Jupyter Notebook · Git · GitHub

📁 Project Structure
seasonal-agriculture-performance-analysis/
│
├── app/
│   └── streamlit_app.py
│
├── data/
│   ├── seasonal_agriculture_performance_dataset.csv
│   └── processed_agriculture_data.csv
│
├── images/
│   ├── correlation_heatmap.png
│   ├── crop_profit.png
│   ├── crop_season_yield_heatmap.png
│   ├── risk_by_season.png
│   ├── seasonal_production.png
│   ├── seasonal_profit.png
│   ├── seasonal_yield.png
│   └── water_efficiency.png
│
├── notebooks/
│   └── Seasonal_Agriculture_Performance_Analysis_Polished.ipynb
│
├── src/
│   ├── __init__.py
│   ├── analysis.py
│   ├── data_cleaning.py
│   └── visualizations.py
│
├── .gitignore
├── README.md
└── requirements.txt
▶️ Run the Project Locally
1. Clone the repository
git clone https://github.com/Ritusmita09/seasonal-agriculture-performance-analysis.git
cd seasonal-agriculture-performance-analysis
2. Create a virtual environment
python -m venv .venv
3. Activate the environment

Windows:

.venv\Scripts\activate
4. Install dependencies
pip install -r requirements.txt
5. Launch the Streamlit dashboard
streamlit run app/streamlit_app.py
6. Open the Jupyter Notebook
jupyter notebook notebooks/Seasonal_Agriculture_Performance_Analysis_Polished.ipynb
☁️ Streamlit Deployment

The dashboard is designed for deployment through Streamlit Community Cloud.

Deployment configuration:

Repository: Ritusmita09/seasonal-agriculture-performance-analysis
Branch: main
Main file: app/streamlit_app.py

The application uses relative project paths and does not require an API key.

💡 Evidence-Based Recommendations

Based on the observed patterns in the dataset:

💧 Focus on improving water-use efficiency, particularly in lower-efficiency seasonal conditions.
🌱 Consider crop and season combinations when planning cultivation strategies.
⚠️ Strengthen disease and pest monitoring during periods showing higher observed risk.
💰 Evaluate profitability alongside yield rather than using yield as the only performance indicator.
🗺️ Consider geographic differences when interpreting seasonal performance.
📊 Use data-driven monitoring to identify combinations of environmental conditions, resource usage, and crop performance associated with better outcomes.

These recommendations are based on observed relationships in the available dataset and should not be interpreted as causal prescriptions.

🔮 Future Scope

The project can be extended by:

📅 Adding multiple years of agricultural data.
🗺️ Expanding the analysis to larger regional datasets.
🌦️ Integrating external weather data.
💹 Incorporating market-price data.
📈 Introducing time-series forecasting when longitudinal data becomes available.
🤖 Exploring predictive modeling for clearly defined prediction tasks.
🌾 Adding scenario analysis for crop and irrigation planning.
👩‍💻 Author

Ritusmita Dutta

VOIS AICTE EDUNET FOUNDATION INTERNSHIP 2026–2027 — Major Project

🔗 Project Links
📦 GitHub Repository:
https://github.com/Ritusmita09/seasonal-agriculture-performance-analysis
🖥️ Live Dashboard:
https://seasonal-agriculture-performance-analysis.streamlit.app/
⭐ Project Highlights
4,000 Records
28 Variables
8 States
8 Crops
3 Seasons
4 Irrigation Methods
Interactive Streamlit Dashboard
Statistical Analysis + Visualization

🌾 Turning agricultural data into meaningful insights through analytics, visualization, and evidence-based reasoning.
