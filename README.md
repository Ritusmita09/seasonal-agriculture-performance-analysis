# 🌾 Seasonal Agriculture Performance Analysis

> **VOIS AICTE EDUNET FOUNDATION INTERNSHIP 2026–2027 — Major Project**

An end-to-end data analytics project exploring how **season, crop, geography, environmental conditions, resource usage, water efficiency, disease/pest risk, and economic factors** relate to agricultural performance.

The project combines data cleaning, exploratory analysis, statistical testing, visualization, and an interactive Streamlit dashboard to turn agricultural data into practical, evidence-based insights.

---

## 📚 Contents

- [Project Overview](#-project-overview)
- [Problem Statement](#-problem-statement)
- [Objectives](#-objectives)
- [Dataset](#-dataset)
- [Data Quality](#-data-quality)
- [Methodology](#-methodology)
- [Key Analytical Questions](#-key-analytical-questions)
- [Key Findings](#-key-findings)
- [Strongest Observed Relationships](#-strongest-observed-relationships)
- [Statistical Analysis](#-statistical-analysis)
- [Interactive Dashboard](#-interactive-dashboard)
- [Analysis Notebook](#-analysis-notebook)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Run the Project Locally](#-run-the-project-locally)
- [Streamlit Community Cloud Deployment](#-streamlit-community-cloud-deployment)
- [Evidence-Based Recommendations](#-evidence-based-recommendations)
- [Future Scope](#-future-scope)
- [Author](#-author)
- [Project Links](#-project-links)

---

## 📌 Project Overview

Agricultural performance can vary across seasons because environmental conditions, farming practices, resource availability, and market conditions change.

This project analyzes **4,000 agricultural records across 28 variables** to identify meaningful patterns in:

- 🌱 Crop yield and production
- 🌦️ Seasonal environmental conditions
- 💧 Water usage and water efficiency
- ⚠️ Disease and pest risk
- 💰 Revenue, cost, and profitability
- 🗺️ Geographic and seasonal variation
- 🚜 Irrigation practices
- 📊 Relationships between agricultural variables

The analysis focuses on understanding what the available data shows rather than forcing conclusions that are not supported by the dataset.

---

## 🎯 Problem Statement

Agricultural outcomes are influenced by a combination of seasonal, environmental, resource, crop, geographic, and economic factors.

The objective of this project is to investigate these factors systematically and determine:

- how agricultural performance changes across seasons,
- which crops perform better under different seasonal conditions,
- how resource usage relates to outcomes,
- how profitability differs across seasons,
- which variables show the strongest statistical associations with yield and profit, and
- what practical recommendations can reasonably be derived from the observed data.

---

## 🎯 Objectives

The project aims to:

- Explore and understand the agricultural dataset.
- Identify missing values, duplicates, and consistency issues.
- Apply reproducible data-cleaning procedures.
- Compare agricultural performance across **Kharif, Rabi, and Zaid**.
- Analyze crop performance across seasons.
- Investigate environmental and resource patterns.
- Examine water usage and water efficiency.
- Analyze revenue, cost, production, and profitability.
- Investigate disease/pest risk across seasons.
- Study relationships between environmental/resource variables and agricultural outcomes.
- Compare meaningful geographic and irrigation patterns.
- Apply appropriate statistical and visualization techniques.
- Present findings through an interactive dashboard.
- Develop evidence-based conclusions and recommendations.

---

## 📊 Dataset

The project uses a structured agricultural performance dataset containing **4,000 records and 28 columns**.

### Dataset at a Glance

| Attribute | Details |
|---|---|
| Records | **4,000** |
| Variables | **28** |
| Seasons | Kharif, Rabi, Zaid |
| Crops | Chilli, Cotton, Groundnut, Maize, Pulses, Rice, Sugarcane, Wheat |
| States | **8** |
| Irrigation Methods | Drip, Flood, Rainfed, Sprinkler |

The dataset contains agricultural, environmental, resource, production, economic, and risk-related variables including rainfall, temperature, humidity, sunlight, soil conditions, nutrient usage, yield, production, revenue, cost, profit, water usage, and disease/pest risk.

---

## 🔎 Data Quality

Before analysis, the dataset was checked for duplicates, missing values, and internal consistency.

| Data Quality Check | Result |
|---|---:|
| Duplicate rows | **0** |
| Missing rainfall values | **48** |
| Missing soil-moisture values | **40** |
| Missing yield values | **32** |
| Revenue − Cost − Profit maximum absolute error | **0.000000** |
| Production − Area × Yield maximum absolute error after cleaning | **0.005000** |

### Cleaning Approach

The raw CSV is preserved.

Missing values were handled using reproducible logic documented in `src/data_cleaning.py`:

- Missing **Rainfall** values were filled using season-level median values.
- Missing **Soil Moisture** values were filled using season-level median values.
- Missing **Yield** values were reconstructed from available production and farm-area information.
- Duplicate records were checked and none were found.
- The original raw dataset was not overwritten.

---

## 🔬 Methodology

The project follows a structured data analytics workflow:

1. Dataset profiling and quality checks
2. Missing-value and duplicate analysis
3. Reproducible data cleaning
4. Descriptive statistics
5. Seasonal performance comparison
6. Crop × Season analysis
7. Environmental and resource analysis
8. Economic analysis
9. Correlation analysis
10. One-way ANOVA for selected seasonal comparisons
11. Visualization and interpretation
12. Evidence-based recommendations
13. Interactive dashboard development

---

## ❓ Key Analytical Questions

The analysis investigates questions such as:

- How does agricultural performance vary across seasons?
- Which season has the highest and lowest average yield?
- How does production vary across seasons?
- How does profitability differ between seasons?
- How do revenue and total cost vary?
- How do rainfall, temperature, humidity, and sunlight change across seasons?
- How does soil moisture vary?
- How do water usage and water efficiency differ?
- How does disease/pest risk vary?
- Which crops perform best within each season?
- Which variables have the strongest association with yield?
- Which variables have the strongest association with profit?
- Are seasonal patterns consistent across different states?
- What evidence-based recommendations can be derived?

---

# 📈 Key Findings

## 🌾 Seasonal Yield

**Kharif** recorded the highest average yield at **5.63 tonnes/ha**.

**Zaid** recorded the lowest average yield at **4.63 tonnes/ha**.

Kharif's average yield was approximately **21.5% higher than Zaid** in the analyzed dataset.

---

## 💰 Profitability

Kharif recorded the highest average profit of **₹178,915**.

Zaid recorded the lowest average profit of **₹−24,805**.

The difference between their average profits was approximately **₹203,719**.

This indicates a substantial seasonal difference in observed profitability.

---

## 💧 Water Efficiency

Kharif recorded the highest average water efficiency at **5.89 tonnes per 1,000 m³**.

This was approximately **33.5% higher than Zaid**.

Water efficiency showed one of the strongest observed associations with yield.

---

## ⚠️ Disease & Pest Risk

Kharif had the highest average disease/pest risk at **54.5%**.

Zaid recorded approximately **38.2%**.

Therefore, the dataset shows that the season with the strongest average yield and profitability also has the highest observed disease/pest risk.

This is an observed pattern and should not be interpreted as a causal relationship.

---

## 🌦️ Environmental Conditions

Kharif recorded the highest average rainfall and soil moisture in the dataset, while Zaid recorded the lowest values for both.

The seasons also differ in temperature, humidity, sunlight exposure, and water usage, providing useful context for interpreting seasonal agricultural performance.

---

## 🌱 Crop × Season Performance

The crop × season analysis shows that crop performance is not uniform across seasons.

The analysis identifies meaningful differences between crop and season combinations and shows why seasonal context is important when evaluating agricultural performance.

The project includes **Crop × Season Yield** and **State × Season Yield** heatmaps to make these patterns easier to compare visually.

---

# 🔗 Strongest Observed Relationships

Correlation analysis was used to identify variables that have strong statistical associations with yield and profit.

## Yield

| Variable | Correlation with Yield |
|---|---:|
| 💧 Water Efficiency | **0.916** |
| 🌾 Production | **0.886** |
| 💰 Profit | **0.490** |
| 💵 Revenue | **0.433** |

## Profit

| Variable | Correlation with Profit |
|---|---:|
| 💵 Revenue | **0.887** |
| 🌾 Production | **0.554** |
| 🌱 Yield | **0.490** |
| 💧 Water Efficiency | **0.489** |

> ⚠️ **Interpretation note:** Correlation describes statistical association. It does **not** establish causation.

---

# 🧪 Statistical Analysis

A one-way ANOVA was applied to selected metrics to assess whether seasonal group means differed statistically.

| Metric | F-statistic | p-value |
|---|---:|---:|
| Yield | 1.463 | 0.231677 |
| Profit | 34.292 | 1.71242e-15 |
| Water Efficiency | 6.948 | 0.000972 |

### Interpretation

- **Yield:** The seasonal difference was not statistically significant at the 5% significance level.
- **Profit:** A statistically significant difference between seasonal group means was observed.
- **Water Efficiency:** A statistically significant difference between seasonal group means was observed.

ANOVA helps assess differences between group means; it does not establish causal effects.

---

# 🖥️ Interactive Dashboard

The project includes an interactive **Streamlit dashboard** designed to make the analysis easier to explore.

### Dashboard Sections

**📌 Overview**  
Provides key KPIs and a high-level summary of the dataset.

**🌦️ Seasonal Performance**  
Compares yield, production, profitability, and other seasonal performance indicators.

**🌱 Crop & Season**  
Explores crop-level performance and Crop × Season relationships.

**💧 Environment & Resources**  
Examines rainfall, soil conditions, irrigation, water usage, and water efficiency.

**💰 Economics**  
Focuses on revenue, cost, production, and profitability.

**⚠️ Risk & Relationships**  
Explores disease/pest risk, correlation patterns, and relationships between important variables.

**💡 Insights**  
Presents key findings, data-quality notes, observed relationships, and evidence-based recommendations.

### Interactive Filters

The dashboard allows users to filter the analysis by:

- Season
- Crop
- State
- Irrigation Method

This allows users to explore the dataset from different analytical perspectives rather than relying only on overall averages.

---

# 📓 Analysis Notebook

The complete analytical workflow is available in the polished Jupyter Notebook:

[📓 Open the Polished Analysis Notebook](notebooks/Seasonal_Agriculture_Performance_Analysis_Polished.ipynb)

The notebook includes:

- Dataset inspection
- Data-quality checks
- Reproducible cleaning
- Descriptive statistics
- Seasonal analysis
- Crop × Season analysis
- Environmental analysis
- Resource analysis
- Economic analysis
- Correlation analysis
- Correlation heatmap
- Crop × Season yield heatmap
- State × Season yield heatmap
- One-way ANOVA
- Visualizations
- Analytical interpretations
- Recommendations

---

# 🛠️ Technologies Used

### Programming & Data Analysis

**Python · Pandas · NumPy · SciPy**

### Visualization

**Matplotlib · Seaborn · Plotly**

### Dashboard & Development

**Streamlit · Jupyter Notebook**

### Version Control

**Git · GitHub**

---

# 📁 Project Structure

### `app/`

Contains the Streamlit dashboard application.

- `streamlit_app.py`

### `data/`

Contains the raw and processed agricultural datasets.

- `seasonal_agriculture_performance_dataset.csv`
- `processed_agriculture_data.csv`

### `images/`

Contains analytical visualizations and heatmaps used by the project.

### `notebooks/`

Contains the complete polished analysis notebook.

- `Seasonal_Agriculture_Performance_Analysis_Polished.ipynb`

### `src/`

Contains reusable project analysis and data-processing modules.

- `__init__.py`
- `analysis.py`
- `data_cleaning.py`
- `visualizations.py`

### Root Files

- `.gitignore`
- `README.md`
- `requirements.txt`

---

# ▶️ Run the Project Locally

### 1. Clone the repository

Clone the GitHub repository and open the project directory.

### 2. Create a virtual environment

Use `python -m venv .venv`.

### 3. Activate the environment

On Windows, use `.venv\Scripts\activate`.

### 4. Install dependencies

Run `pip install -r requirements.txt`.

### 5. Launch the dashboard

Run `streamlit run app/streamlit_app.py`.

### 6. Open the notebook

Open `notebooks/Seasonal_Agriculture_Performance_Analysis_Polished.ipynb` using Jupyter Notebook or VS Code.

---

# ☁️ Streamlit Community Cloud Deployment

The dashboard is configured for deployment through Streamlit Community Cloud.

### Deployment Configuration

| Setting | Value |
|---|---|
| Repository | `Ritusmita09/seasonal-agriculture-performance-analysis` |
| Branch | `main` |
| Main file | `app/streamlit_app.py` |

The application uses relative project paths and does not require an API key.

### 🚀 Live Dashboard

https://seasonal-agriculture-performance-analysis.streamlit.app/
---

# 💡 Evidence-Based Recommendations

Based on the observed patterns in the dataset:

- 💧 Improving water-use efficiency should be considered when planning resource use, especially in lower-efficiency seasonal conditions.
- 🌱 Crop and season combinations should be evaluated together rather than judging crop performance independently of seasonal context.
- ⚠️ Disease and pest monitoring should receive greater attention during periods with higher observed risk.
- 💰 Profitability should be considered alongside yield because a higher yield does not automatically imply higher profitability.
- 🗺️ Geographic differences should be considered when interpreting seasonal performance.
- 📊 Agricultural decisions can benefit from monitoring environmental conditions, resource usage, crop performance, and economic outcomes together.

> These recommendations are based on patterns observed in the available dataset. They should not be interpreted as causal prescriptions without additional field-level evidence.

---

# 🔮 Future Scope

The project can be extended by:

- 📅 Adding multiple years of agricultural data.
- 🗺️ Expanding the analysis to larger regional datasets.
- 🌦️ Integrating external weather information.
- 💹 Incorporating market-price data.
- 📈 Introducing time-series forecasting when longitudinal data becomes available.
- 🤖 Exploring predictive modeling for clearly defined prediction tasks.
- 🌾 Adding scenario analysis for crop and irrigation planning.
- 📊 Building richer geographic visualizations as more regional data becomes available.

---

# 👩‍💻 Author

**Ritusmita Dutta**

VOIS AICTE EDUNET FOUNDATION INTERNSHIP 2026–2027 — Major Project

---

# 🔗 Project Links

### 📦 GitHub Repository

[View the GitHub Repository](https://github.com/Ritusmita09/seasonal-agriculture-performance-analysis)

### 🖥️ Live Dashboard

[Live Demo]https://seasonal-agriculture-performance-analysis.streamlit.app/

---

## ⭐ Project Snapshot

| | |
|---|---|
| 🌾 Records Analyzed | **4,000** |
| 📊 Variables | **28** |
| 🌱 Crops | **8** |
| 🗺️ States | **8** |
| 🌦️ Seasons | **3** |
| 💧 Irrigation Methods | **4** |
| 🖥️ Dashboard | **Interactive Streamlit** |
| 🧪 Statistical Testing | **One-way ANOVA** |
| 📈 Visualization | **Matplotlib, Seaborn & Plotly** |

---

> 🌾 **Turning agricultural data into meaningful insights through analytics, visualization, and evidence-based reasoning.**
