"use strict";

/*
 * AGRI Intelligence — reference edition.
 *
 * DATA CONTRACT
 * -------------
 * The reference source contains published summaries, not 4,000 raw rows.
 * UI selections highlight these summaries; they do not perform row filtering.
 *
 * A future CSV integration can replace createReferenceDataSource() with a
 * provider exposing the same methods. Keep reference highlighting separate
 * from any future record-level aggregation, and update the scope labels when
 * live calculations are actually implemented.
 *
 * null means unavailable. Never substitute zero for missing source values.
 */

(() => {
  const SEASONS = ["Kharif", "Rabi", "Zaid"];

  const COLORS = {
    Kharif: "#2c594b",
    Rabi: "#90a797",
    Zaid: "#bba06d",
    negative: "#a2473e",
    revenue: "#2c594b",
    cost: "#a8b2a1",
    profit: "#b4965c",
    text: "#68736c",
    grid: "#edf0e9"
  };

  const SECTION_NAMES = {
    overview: "Overview",
    seasonal: "Seasonal Performance",
    crops: "Crop & Season",
    environment: "Environment",
    economics: "Economics",
    risk: "Risk & Relationships",
    insights: "Insights"
  };

  const ICON_PATHS = {
    overview:
      '<rect x="3" y="3" width="7" height="7" rx="1.2"/>' +
      '<rect x="14" y="3" width="7" height="7" rx="1.2"/>' +
      '<rect x="3" y="14" width="7" height="7" rx="1.2"/>' +
      '<rect x="14" y="14" width="7" height="7" rx="1.2"/>',
    seasonal:
      '<path d="M4 20V11M10 20V5M16 20V9M22 20H2"/>' +
      '<path d="M16 4h5v5m0-5-5 5"/>',
    crops:
      '<path d="M12 21V9M12 15C5 15 3 11 3 5c6 0 9 3 9 8"/>' +
      '<path d="M12 11c0-6 3-8 9-8 0 6-3 9-9 9"/>',
    environment:
      '<path d="M12 3C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-12Z"/>' +
      '<path d="M8 15a4 4 0 0 0 4 4"/>',
    economics:
      '<rect x="3" y="5" width="18" height="15" rx="2"/>' +
      '<path d="M3 9h18M15 13h6M16 16h1M6 3v2"/>',
    risk:
      '<circle cx="5" cy="6" r="2.5"/><circle cx="18" cy="5" r="2.5"/>' +
      '<circle cx="12" cy="18" r="2.5"/><path d="m7 6 8-.5M6 8l5 8m6-9-4 9"/>',
    insights:
      '<path d="M9 18h6M10 21h4M8 14a7 7 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z"/>'
  };

  function createReferenceDataSource() {
    const seasonal = {
      Kharif: {
        yield: 5.63,
        averageProduction: 46.31,
        revenue: 710719,
        cost: 531804,
        profit: 178915,
        efficiency: 5.89,
        risk: 54.5
      },
      Rabi: {
        yield: 5.09,
        averageProduction: 41.49,
        revenue: 601526,
        cost: 513837,
        profit: 87689,
        // Screenshot value. Written brief says 5.01; discrepancy disclosed.
        efficiency: 5.19,
        risk: 40.5
      },
      Zaid: {
        yield: 4.63,
        averageProduction: 38.89,
        revenue: 519172,
        cost: 543977,
        profit: -24805,
        efficiency: 4.41,
        risk: 38.2
      }
    };

    const cropYield = [
      { name: "Chilli", values: [1.73, 1.46, 1.18] },
      { name: "Cotton", values: [1.37, 1.19, 0.94] },
      { name: "Groundnut", values: [1.48, 1.23, 1.04] },
      { name: "Maize", values: [2.97, 2.62, 2.28] },
      { name: "Pulses", values: [1.04, 0.87, 0.65] },
      { name: "Rice", values: [2.71, 2.33, 1.90] },
      { name: "Sugarcane", values: [53.46, 43.95, 38.42] },
      { name: "Wheat", values: [2.25, 2.06, 1.75] }
    ];

    const stateYield = [
      { name: "Andhra Pradesh", values: [5.68, 3.47, 4.45] },
      { name: "Gujarat", values: [6.34, 5.70, 4.05] },
      { name: "Karnataka", values: [6.45, 4.73, 6.62] },
      { name: "Madhya Pradesh", values: [5.99, 3.75, 5.46] },
      { name: "Maharashtra", values: [5.43, 5.50, 2.26] },
      { name: "Punjab", values: [4.10, 8.61, 5.91] },
      { name: "Tamil Nadu", values: [5.52, 4.49, 4.10] },
      { name: "Telangana", values: [5.55, 4.82, 4.24] }
    ];

    const correlation = {
      labels: [
        "Yield", "Production", "Profit", "Revenue",
        "Water Used", "Water Efficiency", "Farm Area"
      ],
      values: [
        [1.00, 0.89, 0.49, 0.43, 0.39, 0.92, 0.03],
        [0.89, 1.00, 0.55, 0.56, 0.52, 0.81, 0.20],
        [0.49, 0.55, 1.00, 0.89, 0.19, 0.49, 0.12],
        [0.43, 0.56, 0.89, 1.00, 0.43, 0.43, 0.54],
        [0.39, 0.52, 0.19, 0.43, 1.00, 0.22, 0.58],
        [0.92, 0.81, 0.49, 0.43, 0.22, 1.00, 0.03],
        [0.03, 0.20, 0.12, 0.54, 0.58, 0.03, 1.00]
      ]
    };

    return {
      mode: "reference",

      getOverview() {
        return [
          { label: "Records", value: 4000, unit: "28 variables", format: "integer" },
          { label: "Avg Yield", value: 5.26, unit: "tonnes/ha", format: "decimal" },
          { label: "Total Production", value: 172984.8, unit: "tonnes", format: "oneDecimal" },
          { label: "Avg Profit", value: 111556, unit: "INR · per record", format: "currency" },
          { label: "Water Efficiency", value: 5.39, unit: "t/1,000 m³", format: "decimal" },
          { label: "Disease/Pest Risk", value: 46.4, unit: "average risk indicator", format: "percent" }
        ];
      },

      getSeasonal() { return seasonal; },
      getCropYield() { return cropYield; },
      getStateYield() { return stateYield; },
      getCorrelation() { return correlation; },

      getEnvironment() {
        return [
          { label: "Rainfall", value: null, unit: "mm" },
          { label: "Temperature", value: null, unit: "°C" },
          { label: "Humidity", value: null, unit: "%" },
          { label: "Sunlight", value: null, unit: "hours/day" },
          { label: "Soil Moisture", value: null, unit: "%" },
          { label: "Water Used", value: null, unit: "m³" },
          { label: "Water Efficiency", value: 5.39, unit: "t/1,000 m³" }
        ];
      },

      getIrrigation() { return null; },

      getScatter() {
        return [
          { title: "Rainfall vs Yield", x: "Rainfall · mm", y: "Yield · t/ha", points: null },
          { title: "Water Used vs Yield", x: "Water used · m³", y: "Yield · t/ha", points: null },
          {
            title: "Water Efficiency vs Yield",
            x: "Water efficiency · t/1,000 m³",
            y: "Yield · t/ha",
            points: null
          }
        ];
      },

      getInsights() {
        return [
          {
            category: "SEASONAL LEADER", number: "5.63", unit: "t/ha",
            text: "Kharif records the highest average yield.", tone: ""
          },
          {
            category: "PROFITABILITY", number: "₹178,915", unit: "",
            text: "Kharif records the highest average profit.", tone: ""
          },
          {
            category: "RESOURCE EFFICIENCY", number: "5.89", unit: "t/1,000 m³",
            text: "Kharif records the highest observed seasonal water efficiency.", tone: ""
          },
          {
            category: "RISK", number: "54.5%", unit: "",
            text: "Kharif records the highest observed disease/pest risk.", tone: "amber"
          },
          {
            category: "RELATIONSHIP", number: "r = 0.916", unit: "",
            text: "Water efficiency shows the strongest observed correlation with yield among the supplied key variables.",
            tone: ""
          },
          {
            category: "OBSERVED LOSS", number: "−₹24,805", unit: "",
            text: "Zaid records an average loss in the observed dataset.", tone: "red"
          }
        ];
      },

      getAnova() {
        return [
          { label: "Profit", value: "1.71 × 10⁻¹⁵" },
          { label: "Water efficiency", value: "9.72 × 10⁻⁴" },
          { label: "Yield", value: "0.232" }
        ];
      }
    };
  }

  function createCSVDataSource(records) {
    const numericFields = [
      "Farm_Area_Hectares", "Rainfall_mm", "Avg_Temperature_C", "Humidity_pct",
      "Sunlight_Hours_Day", "Soil_pH", "Soil_Moisture_pct", "Nitrogen_kg_ha",
      "Phosphorus_kg_ha", "Potassium_kg_ha", "Fertilizer_kg_ha", "Pesticide_Litre_ha",
      "Seed_Quality_Score", "Yield_Tonnes_Ha", "Production_Tonnes",
      "Market_Price_INR_Tonne", "Total_Cost_INR", "Revenue_INR", "Profit_INR",
      "Water_Used_m3", "Water_Efficiency_t_per_1000m3", "Disease_Pest_Risk_pct"
    ];
    const rows = records.map(record => {
      const row = { ...record };
      numericFields.forEach(field => {
        const value = Number(row[field]);
        row[field] = row[field] === "" || !Number.isFinite(value) ? null : value;
      });
      return row;
    });

    const average = (items, field) => {
      const values = items.map(item => item[field]).filter(Number.isFinite);
      return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
    };
    const sum = (items, field) => {
      const values = items.map(item => item[field]).filter(Number.isFinite);
      return values.length ? values.reduce((total, value) => total + value, 0) : null;
    };
    const aggregate = items => ({
      yield: average(items, "Yield_Tonnes_Ha"),
      averageProduction: average(items, "Production_Tonnes"),
      production: sum(items, "Production_Tonnes"),
      revenue: average(items, "Revenue_INR"),
      cost: average(items, "Total_Cost_INR"),
      profit: average(items, "Profit_INR"),
      efficiency: average(items, "Water_Efficiency_t_per_1000m3"),
      risk: average(items, "Disease_Pest_Risk_pct")
    });
    const filtered = filters => rows.filter(row =>
      (filters.season === "All" || row.Season === filters.season) &&
      (filters.crop === "All" || row.Crop === filters.crop) &&
      (filters.state === "All" || row.State === filters.state) &&
      (filters.irrigation === "All" || row.Irrigation_Method === filters.irrigation)
    );
    const grouped = (items, key, metric) => {
      const groups = new Map();
      items.forEach(row => {
        if (!groups.has(row[key])) groups.set(row[key], []);
        groups.get(row[key]).push(row);
      });
      return [...groups.entries()].map(([name, group]) => ({ name, value: average(group, metric), group }));
    };
    const correlation = (items, xField, yField) => {
      const pairs = items.filter(row => Number.isFinite(row[xField]) && Number.isFinite(row[yField]));
      if (pairs.length < 2) return null;
      const x = pairs.map(row => row[xField]);
      const y = pairs.map(row => row[yField]);
      const xMean = x.reduce((a, b) => a + b, 0) / x.length;
      const yMean = y.reduce((a, b) => a + b, 0) / y.length;
      const numerator = pairs.reduce((total, _, index) => total + (x[index] - xMean) * (y[index] - yMean), 0);
      const xSpread = Math.sqrt(x.reduce((total, value) => total + (value - xMean) ** 2, 0));
      const ySpread = Math.sqrt(y.reduce((total, value) => total + (value - yMean) ** 2, 0));
      return xSpread && ySpread ? numerator / (xSpread * ySpread) : null;
    };
    let filters = { season: "All", crop: "All", state: "All", irrigation: "All" };
    return {
      mode: "csv",
      rows,
      setFilters(next) { filters = { ...filters, ...next }; },
      getRows() { return filtered(filters); },
      getOverview() {
        const items = filtered(filters);
        return [
          { label: "Records", value: items.length, unit: `${Object.keys(items[0] || {}).length || 28} variables`, format: "integer" },
          { label: "Avg Yield", value: average(items, "Yield_Tonnes_Ha"), unit: "tonnes/ha", format: "decimal" },
          { label: "Total Production", value: sum(items, "Production_Tonnes"), unit: "tonnes", format: "oneDecimal" },
          { label: "Avg Profit", value: average(items, "Profit_INR"), unit: "INR · per record", format: "currency" },
          { label: "Water Efficiency", value: average(items, "Water_Efficiency_t_per_1000m3"), unit: "t/1,000 m³", format: "decimal" },
          { label: "Disease/Pest Risk", value: average(items, "Disease_Pest_Risk_pct"), unit: "average risk indicator", format: "percent" }
        ];
      },
      getSeasonal() {
        const items = filtered(filters);
        return Object.fromEntries(SEASONS.map(season => [season, aggregate(items.filter(row => row.Season === season))]));
      },
      getCropYield() {
        const items = filtered(filters);
        return grouped(items, "Crop", "Yield_Tonnes_Ha").map(({ name }) => ({
          name, values: SEASONS.map(season => average(items.filter(row => row.Crop === name && row.Season === season), "Yield_Tonnes_Ha"))
        }));
      },
      getStateYield() {
        const items = filtered(filters);
        return grouped(items, "State", "Yield_Tonnes_Ha").map(({ name }) => ({
          name, values: SEASONS.map(season => average(items.filter(row => row.State === name && row.Season === season), "Yield_Tonnes_Ha"))
        }));
      },
      getEnvironment() {
        const items = filtered(filters);
        return [
          ["Rainfall", "Rainfall_mm", "mm"], ["Temperature", "Avg_Temperature_C", "°C"],
          ["Humidity", "Humidity_pct", "%"], ["Sunlight", "Sunlight_Hours_Day", "hours/day"],
          ["Soil Moisture", "Soil_Moisture_pct", "%"], ["Water Used", "Water_Used_m3", "m³"],
          ["Water Efficiency", "Water_Efficiency_t_per_1000m3", "t/1,000 m³"]
        ].map(([label, field, unit]) => ({ label, value: average(items, field), unit }));
      },
      getIrrigation() {
        return grouped(filtered(filters), "Irrigation_Method", "Farm_ID").map(item => ({ name: item.name, count: item.group.length }));
      },
      getCorrelation() {
        const items = filtered(filters);
        const fields = ["Yield_Tonnes_Ha", "Production_Tonnes", "Profit_INR", "Revenue_INR", "Water_Used_m3", "Water_Efficiency_t_per_1000m3", "Farm_Area_Hectares"];
        const labels = ["Yield", "Production", "Profit", "Revenue", "Water Used", "Water Efficiency", "Farm Area"];
        return { labels, values: fields.map(x => fields.map(y => x === y ? 1 : correlation(items, x, y))) };
      },
      getScatter() {
        const items = filtered(filters);
        return [
          ["Rainfall vs Yield", "Rainfall_mm", "Yield_Tonnes_Ha", "Rainfall · mm", "Yield · t/ha"],
          ["Water Used vs Yield", "Water_Used_m3", "Yield_Tonnes_Ha", "Water used · m³", "Yield · t/ha"],
          ["Water Efficiency vs Yield", "Water_Efficiency_t_per_1000m3", "Yield_Tonnes_Ha", "Water efficiency · t/1,000 m³", "Yield · t/ha"]
        ].map(([title, xField, yField, x, y]) => ({ title, x, y, points: items.filter(row => Number.isFinite(row[xField]) && Number.isFinite(row[yField])).map(row => ({ x: row[xField], y: row[yField] })) }));
      },
      getInsights() {
        const seasonal = this.getSeasonal();
        const available = SEASONS.filter(season => Number.isFinite(seasonal[season].yield));
        const highestYield = available.sort((a, b) => seasonal[b].yield - seasonal[a].yield)[0];
        const highestProfit = SEASONS.filter(season => Number.isFinite(seasonal[season].profit)).sort((a, b) => seasonal[b].profit - seasonal[a].profit)[0];
        const highestEfficiency = SEASONS.filter(season => Number.isFinite(seasonal[season].efficiency)).sort((a, b) => seasonal[b].efficiency - seasonal[a].efficiency)[0];
        const highestRisk = SEASONS.filter(season => Number.isFinite(seasonal[season].risk)).sort((a, b) => seasonal[b].risk - seasonal[a].risk)[0];
        const items = filtered(filters);
        const efficiencyCorrelation = correlation(items, "Water_Efficiency_t_per_1000m3", "Yield_Tonnes_Ha");
        const lossSeason = SEASONS.filter(season => Number.isFinite(seasonal[season].profit)).sort((a, b) => seasonal[a].profit - seasonal[b].profit)[0];
        return [
          { category: "SEASONAL LEADER", number: formatNumber(seasonal[highestYield]?.yield, 2), unit: "t/ha", text: `${highestYield || "No season"} has the highest average yield in the filtered records.`, tone: "" },
          { category: "PROFITABILITY", number: formatCurrency(seasonal[highestProfit]?.profit), unit: "", text: `${highestProfit || "No season"} has the highest average profit in the filtered records.`, tone: "" },
          { category: "RESOURCE EFFICIENCY", number: formatNumber(seasonal[highestEfficiency]?.efficiency, 2), unit: "t/1,000 m³", text: `${highestEfficiency || "No season"} has the highest average water efficiency.`, tone: "" },
          { category: "RISK", number: `${formatNumber(seasonal[highestRisk]?.risk, 1)}%`, unit: "", text: `${highestRisk || "No season"} has the highest average disease/pest risk.`, tone: "amber" },
          { category: "RELATIONSHIP", number: `r = ${formatNumber(efficiencyCorrelation, 3)}`, unit: "", text: "Water efficiency versus yield correlation for the filtered records.", tone: "" },
          { category: "LOWEST PROFIT", number: formatCurrency(seasonal[lossSeason]?.profit), unit: "", text: `${lossSeason || "No season"} has the lowest average profit in the filtered records.`, tone: "red" }
        ];
      },
      getAnova() {
        const items = filtered(filters);
        return ["Profit_INR", "Water_Efficiency_t_per_1000m3", "Yield_Tonnes_Ha"].map(field => {
          const value = average(items, field);
          const variance = average(items, field) === null ? null : items.filter(row => Number.isFinite(row[field])).reduce((total, row) => total + (row[field] - value) ** 2, 0) / Math.max(1, items.length - 1);
          return { label: field.replaceAll("_", " "), value: variance === null ? "—" : formatNumber(variance, 2) };
        });
      },
      getCorrelationValue(x, y) { return correlation(filtered(filters), x, y); }
    };
  }

  let dataSource = null;

  const state = {
    section: "overview",
    filters: { season: "All", crop: "All", state: "All", irrigation: "All" },
    rankingSeason: "Kharif",
    drawerOpen: false
  };

  const charts = new Map();
  const mobileQuery = window.matchMedia("(max-width: 960px)");

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[char]);
  }

  function formatNumber(value, digits = 0) {
    if (value === null || value === undefined || !Number.isFinite(value)) return "—";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits
    }).format(value);
  }

  function formatCurrency(value) {
    if (value === null || value === undefined || !Number.isFinite(value)) return "—";
    return `${value < 0 ? "−" : ""}₹${formatNumber(Math.abs(value))}`;
  }

  function formatValue(value, kind) {
    switch (kind) {
      case "currency": return formatCurrency(value);
      case "decimal": return formatNumber(value, 2);
      case "oneDecimal": return formatNumber(value, 1);
      case "percent": return `${formatNumber(value, 1)}%`;
      default: return formatNumber(value);
    }
  }

  function iconMarkup(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
      aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.overview}</svg>`;
  }

  function renderIcons(root = document) {
    $$("[data-icon]", root).forEach(element => {
      element.innerHTML = iconMarkup(element.dataset.icon);
    });
  }

  /* Reusable KPI renderer. Executive KPIs deliberately stay project-wide. */
  function renderKPIs(target, items) {
    $(target).innerHTML = items.map(item => `
      <article class="kpi-card">
        <div class="kpi-topline">
          <h3 class="kpi-label">${escapeHTML(item.label)}</h3>
          <span class="kpi-mark" aria-hidden="true"></span>
        </div>
        <strong class="kpi-value">${escapeHTML(formatValue(item.value, item.format))}</strong>
        <span class="kpi-unit">${escapeHTML(item.unit)}</span>
      </article>
    `).join("");
  }

  function renderInsights(target, items) {
    $(target).innerHTML = items.map((item, index) => `
      <article class="insight-card ${escapeHTML(item.tone)}">
        <span class="insight-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <h3 class="insight-category">${escapeHTML(item.category)}</h3>
        <strong class="insight-number ${item.tone === "red" ? "negative" : ""}">
          ${escapeHTML(item.number)}
          ${item.unit ? `<small>${escapeHTML(item.unit)}</small>` : ""}
        </strong>
        <p>${escapeHTML(item.text)}</p>
      </article>
    `).join("");
  }

  function renderAnova(target) {
    $(target).innerHTML = dataSource.getAnova().map(item => `
      <div class="anova-item">
        <span>${escapeHTML(item.label)}</span>
        <strong>${escapeHTML(item.value)}</strong>
        <p>Calculated variance · filtered records</p>
      </div>
    `).join("");
  }

  function renderSnapshot() {
    const seasonal = dataSource.getSeasonal();
    $("#performance-snapshot").innerHTML = SEASONS.map(season => {
      const values = seasonal[season];
      const focused = state.filters.season === season;
      return `
        <div class="snapshot-row ${focused ? "is-focused" : ""}">
          <div class="snapshot-main">
            <span class="snapshot-season">
              <span class="season-dot" style="background:${COLORS[season]}" aria-hidden="true"></span>
              ${season}
            </span>
            <strong>${formatNumber(values.yield, 2)} <small>t/ha</small></strong>
          </div>
          <div class="snapshot-secondary">
            <span>Average profit</span>
            <strong class="${values.profit < 0 ? "negative" : ""}">
              ${formatCurrency(values.profit)}
            </strong>
          </div>
          <div class="snapshot-track" aria-hidden="true">
            <span style="width:${Number.isFinite(values.yield) ? (values.yield / 6.5) * 100 : 0}%;background:${COLORS[season]}"></span>
          </div>
        </div>`;
    }).join("");
  }

  function renderEconomicsSummary() {
    const seasonal = dataSource.getSeasonal();
    $("#economics-summary").innerHTML = SEASONS.map(season => {
      const values = seasonal[season];
      return `
        <article class="panel economics-card ${state.filters.season === season ? "is-focused" : ""}">
          <h3 class="season-title">
            <span class="season-dot" style="background:${COLORS[season]}" aria-hidden="true"></span>
            ${season}
          </h3>
          <dl>
            <div><dt>Average revenue</dt><dd>${formatCurrency(values.revenue)}</dd></div>
            <div><dt>Average cost</dt><dd>${formatCurrency(values.cost)}</dd></div>
            <div class="profit-line">
              <dt>Average profit</dt>
              <dd class="${values.profit < 0 ? "negative" : ""}">${formatCurrency(values.profit)}</dd>
            </div>
          </dl>
        </article>`;
    }).join("");
    const profitableSeasons = SEASONS.filter(season => Number.isFinite(seasonal[season].profit));
    const highest = profitableSeasons.sort((a, b) => seasonal[b].profit - seasonal[a].profit)[0];
    const lowest = profitableSeasons.sort((a, b) => seasonal[a].profit - seasonal[b].profit)[0];
    $("#economics-editorial-number").innerHTML = `${formatCurrency(seasonal[lowest]?.profit)}<small>${lowest || "Filtered"} · average profit</small>`;
    $("#economics-editorial-text").textContent = highest
      ? `${highest} records the highest average profit in the filtered records; ${lowest} records the lowest.`
      : "No complete profit values are available for the current filters.";
  }

  function renderEnvironmentCards() {
    $("#environment-cards").innerHTML = dataSource.getEnvironment().map(item => {
      const available = item.value !== null;
      return `
        <article class="resource-card ${available ? "available" : ""}">
          <h3>${escapeHTML(item.label)}</h3>
          <strong class="resource-value ${available ? "" : "unavailable"}">
            ${available ? formatNumber(item.value, 2) : "—"}
          </strong>
          <p>${escapeHTML(item.unit)} · ${available ? "filtered-record average" : "no complete values"}</p>
        </article>`;
    }).join("");
    const distribution = $("#irrigation-distribution");
    const methods = dataSource.getIrrigation();
    distribution.innerHTML = methods.length
      ? methods.map(method => `<div class="relationship-row"><span>${escapeHTML(method.name)}</span><strong>${formatNumber(method.count)}</strong></div>`).join("")
      : `<strong>No matching records</strong><p>Change the filters to view irrigation methods.</p>`;
    const seasonal = dataSource.getSeasonal();
    const seasons = SEASONS.filter(season => Number.isFinite(seasonal[season].efficiency));
    const highest = seasons.sort((a, b) => seasonal[b].efficiency - seasonal[a].efficiency)[0];
    $("#environment-editorial-number").innerHTML = `${formatNumber(seasonal[highest]?.efficiency, 2)} <small>t/1,000 m³</small>`;
    $("#environment-editorial-text").textContent = highest
      ? `${highest} records the highest average water efficiency in the filtered records.`
      : "No complete water-efficiency values are available for the current filters.";
  }

  function renderRelationships() {
    const efficiency = dataSource.getCorrelationValue("Water_Efficiency_t_per_1000m3", "Yield_Tonnes_Ha");
    const revenue = dataSource.getCorrelationValue("Revenue_INR", "Profit_INR");
    $("#relationship-efficiency strong").textContent = formatNumber(efficiency, 3);
    $("#relationship-revenue strong").textContent = formatNumber(revenue, 3);
  }

  function renderScatterPlots() {
    $("#scatter-panels").innerHTML = dataSource.getScatter().map((item, index) => `
      <article class="panel">
        <div class="panel-heading">
          <div>
            <h3>${escapeHTML(item.title)}</h3>
            <p>Record-level scatter plot</p>
          </div>
        </div>
        <div class="chart-wrap scatter-wrap">
          <canvas id="scatter-${index}-canvas" role="img" aria-label="${escapeHTML(item.title)}"></canvas>
        </div>
        <div class="scatter-placeholder">
          <strong>${formatNumber(item.points.length)} paired observations</strong>
          <p>Each point is a record from the filtered dataset.</p>
          <div class="scatter-axes">
            <span>X · ${escapeHTML(item.x)}</span>
            <span>Y · ${escapeHTML(item.y)}</span>
          </div>
        </div>
      </article>
    `).join("");
    if (typeof window.Chart === "undefined") return;
    dataSource.getScatter().forEach((item, index) => {
      const chart = new Chart($(`#scatter-${index}-canvas`), {
        type: "scatter",
        data: { datasets: [{ label: item.title, data: item.points, backgroundColor: COLORS.Kharif, pointRadius: 2.5, pointHoverRadius: 4 }] },
        options: { responsive: true, maintainAspectRatio: false, animation: false,
          plugins: { legend: { display: false }, tooltip: { callbacks: { footer() { return "Filtered CSV record"; } } } },
          scales: { x: { title: { display: true, text: item.x, color: COLORS.text }, grid: { color: COLORS.grid }, ticks: { color: COLORS.text, maxTicksLimit: 6 } },
            y: { title: { display: true, text: item.y, color: COLORS.text }, grid: { color: COLORS.grid }, ticks: { color: COLORS.text, maxTicksLimit: 6 } } } }
      });
      charts.set(`#scatter-${index}-canvas`, chart);
    });
  }

  /* Color interpolation preserves a genuinely continuous linear scale. */
  function interpolateRGB(start, end, ratio) {
    const t = Math.max(0, Math.min(1, ratio));
    return start.map((channel, index) =>
      Math.round(channel + (end[index] - channel) * t)
    );
  }

  function readableText(rgb) {
    const linear = rgb.map(channel => {
      const value = channel / 255;
      return value <= 0.04045
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    const luminance = 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
    return luminance > 0.179 ? "#172c23" : "#ffffff";
  }

  function heatColor(value, min, max, correlation = false) {
    let rgb;
    if (correlation) {
      rgb = value < 0
        ? interpolateRGB([243, 243, 237], [162, 71, 62], Math.abs(value))
        : interpolateRGB([243, 243, 237], [32, 77, 62], value);
    } else {
      const ratio = max === min ? 0 : (value - min) / (max - min);
      rgb = interpolateRGB([240, 244, 235], [32, 77, 62], ratio);
    }
    return `background:rgb(${rgb.join(",")});color:${readableText(rgb)}`;
  }

  function renderHeatmap(target, {
    rows, columns, caption, selection = "All", correlation = false
  }) {
    const allValues = rows.flatMap(row => row.values).filter(Number.isFinite);
    const min = correlation ? -1 : (allValues.length ? Math.min(...allValues) : 0);
    const max = correlation ? 1 : (allValues.length ? Math.max(...allValues) : 1);
    const hasFocus = !correlation &&
      (selection !== "All" || state.filters.season !== "All");

    const header = columns.map(column =>
      `<th scope="col">${escapeHTML(column)}</th>`
    ).join("");

    const body = rows.map(row => `
      <tr>
        <th scope="row" class="row-label">${escapeHTML(row.name)}</th>
        ${row.values.map((value, index) => {
          const matchesRow = selection === "All" || row.name === selection;
          const matchesSeason = state.filters.season === "All" ||
            columns[index] === state.filters.season;
          const focused = hasFocus && matchesRow && matchesSeason;
          const dimmed = hasFocus && !focused;
          const maximum = !correlation && value === max;
          const accessibleLabel =
            `${row.name}, ${columns[index]}: ${Number.isFinite(value) ? value.toFixed(2) : "No value"}` +
            `${correlation ? " Pearson r" : " tonnes per hectare"}` +
            `${maximum ? "; highest cell in this matrix" : ""}` +
            `${focused ? "; selected reference focus" : ""}`;

          return `
            <td class="heat-cell ${maximum ? "maximum" : ""}
                ${focused ? "focused" : ""} ${dimmed ? "deemphasized" : ""}"
                style="${Number.isFinite(value) ? heatColor(value, min, max, correlation) : "background:#f0f2ec;color:#68736c"}"
                title="${escapeHTML(accessibleLabel)}">
              <span aria-hidden="true">${Number.isFinite(value) ? value.toFixed(2) : "—"}</span>
              <span class="sr-only">${escapeHTML(accessibleLabel)}</span>
            </td>`;
        }).join("")}
      </tr>
    `).join("");

    $(target).innerHTML = `
      <table class="heatmap-table ${correlation ? "correlation-table" : ""}">
        <caption class="sr-only">${escapeHTML(caption)}</caption>
        <thead>
          <tr><th class="row-label" scope="col">${correlation ? "Variable" : "Average yield"}</th>${header}</tr>
        </thead>
        <tbody>${body}</tbody>
      </table>
      <div class="heatmap-legend" aria-label="Color scale from ${min} to ${max}">
        <span>${min.toFixed(2)}</span>
        <span class="scale-ramp ${correlation ? "correlation-scale" : ""}" aria-hidden="true"></span>
        <span>${max.toFixed(2)}</span>
        <span>${correlation ? "Pearson r" : "t/ha"}</span>
      </div>
    `;
  }

  function renderCropHeatmaps() {
    renderHeatmap("#crop-heatmap", {
      rows: dataSource.getCropYield(),
      columns: SEASONS,
      caption: "Average crop yield by season, tonnes per hectare",
      selection: state.filters.crop
    });

    renderHeatmap("#state-heatmap", {
      rows: dataSource.getStateYield(),
      columns: SEASONS,
      caption: "Average state yield by season, tonnes per hectare",
      selection: state.filters.state
    });
  }

  function renderCorrelationHeatmap() {
    const matrix = dataSource.getCorrelation();
    renderHeatmap("#correlation-heatmap", {
      rows: matrix.labels.map((name, index) => ({
        name, values: matrix.values[index]
      })),
      columns: matrix.labels,
      caption: "Pearson correlation matrix calculated from filtered records",
      correlation: true
    });
  }

  /*
   * Reusable chart renderer:
   * - numeric axes always include zero for bars
   * - negative profits retain their sign and red styling
   * - every canvas has an accessible companion data table
   * - CDN failure displays the table instead of breaking the page
   */
  function renderChart(target, spec) {
    const container = $(target);
    if (!container) return;

    if (charts.has(target)) {
      charts.get(target).destroy();
      charts.delete(target);
    }

    const currency = spec.format === "currency";
    const percent = spec.format === "percent";
    const valueFormat = value =>
      currency ? formatCurrency(value)
        : percent ? `${formatNumber(value, 1)}%`
          : formatNumber(value, 2);

    const table = `
      <table class="data-table">
        <caption class="sr-only">${escapeHTML(spec.title)}. ${escapeHTML(spec.unit)}.</caption>
        <thead>
          <tr>
            <th scope="col">${spec.horizontal ? "Crop" : "Season"}</th>
            ${spec.datasets.map(dataset =>
              `<th scope="col">${escapeHTML(dataset.label)}</th>`
            ).join("")}
          </tr>
        </thead>
        <tbody>
          ${spec.labels.map((label, index) => `
            <tr>
              <th scope="row">${escapeHTML(label)}</th>
              ${spec.datasets.map(dataset => {
                const value = dataset.data[index];
                return `<td class="${value < 0 ? "negative" : ""}">
                  ${value === null ? "No value" : escapeHTML(valueFormat(value))}
                </td>`;
              }).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>`;

    const chartAvailable = typeof window.Chart !== "undefined";
    const canvasId = `${target.slice(1)}-canvas`;
    const tableId = `${target.slice(1)}-data`;

    container.innerHTML = `
      ${chartAvailable ? `
        <div class="chart-wrap ${spec.size || ""}">
          <canvas id="${canvasId}" role="img"
                  aria-label="${escapeHTML(spec.title)}. Exact values are available in the chart data table."
                  aria-describedby="${tableId}">
            ${escapeHTML(spec.title)}
          </canvas>
        </div>
      ` : `
        <div class="chart-fallback">
          Chart library unavailable. The published values remain available below.
        </div>
      `}
      <details class="chart-data" ${chartAvailable ? "" : "open"}>
        <summary>View chart data · ${escapeHTML(spec.unit)}</summary>
        <div id="${tableId}">${table}</div>
      </details>
    `;

    if (!chartAvailable) return;

    const datasets = spec.datasets.map(dataset => ({
      ...dataset,
      borderRadius: 5,
      borderSkipped: false,
      maxBarThickness: spec.horizontal ? 19 : (spec.datasets.length > 1 ? 30 : 70),
      categoryPercentage: spec.datasets.length > 1 ? 0.68 : 0.64,
      barPercentage: 0.8
    }));

    const axisTick = value => {
      if (currency) {
        const sign = value < 0 ? "−" : "";
        const absolute = Math.abs(value);
        return `${sign}₹${absolute >= 1000 ? formatNumber(absolute / 1000) + "k" : absolute}`;
      }
      return percent ? `${value}%` : value;
    };

    const numericAxis = {
      beginAtZero: true,
      grace: "18%",
      ...(spec.max !== undefined ? { max: spec.max } : {}),
      grid: {
        color: context => context.tick.value === 0 ? "#cbd4c6" : COLORS.grid,
        drawTicks: false
      },
      border: { display: false },
      ticks: {
        color: COLORS.text,
        font: { family: "Inter, sans-serif", size: 10 },
        padding: 10,
        maxTicksLimit: 6,
        callback: axisTick
      }
    };

    const categoryAxis = {
      grid: { display: false, drawTicks: false },
      border: { display: false },
      ticks: {
        color: COLORS.text,
        font: { family: "Inter, sans-serif", size: 10 },
        padding: 9,
        autoSkip: false,
        maxRotation: 0
      }
    };

    // Direct value labels for single-series charts; no extra CDN plugin.
    const valueLabels = {
      id: "referenceValueLabels",
      afterDatasetsDraw(chart) {
        if (spec.datasets.length !== 1) return;

        const context = chart.ctx;
        const meta = chart.getDatasetMeta(0);
        context.save();
        context.font = "600 10px Inter, sans-serif";

        meta.data.forEach((bar, index) => {
          const value = spec.datasets[0].data[index];
          if (value === null || !Number.isFinite(value)) return;

          context.fillStyle = value < 0 ? COLORS.negative : "#3d4d42";
          const label = valueFormat(value);

          if (spec.horizontal) {
            context.textAlign = "left";
            context.textBaseline = "middle";
            context.fillText(label, bar.x + 7, bar.y);
          } else {
            context.textAlign = "center";
            context.textBaseline = value < 0 ? "top" : "bottom";
            context.fillText(label, bar.x, bar.y + (value < 0 ? 6 : -7));
          }
        });
        context.restore();
      }
    };

    try {
      const chart = new Chart($(`#${canvasId}`), {
        type: "bar",
        data: { labels: spec.labels, datasets },
        plugins: [valueLabels],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          indexAxis: spec.horizontal ? "y" : "x",
          layout: {
            padding: {
              top: spec.datasets.length === 1 ? 15 : 3,
              right: spec.horizontal ? 35 : 5,
              bottom: 5
            }
          },
          interaction: { mode: "index", intersect: false },
          plugins: {
            legend: {
              display: spec.datasets.length > 1,
              position: "bottom",
              labels: {
                color: COLORS.text,
                usePointStyle: true,
                pointStyle: "rectRounded",
                boxWidth: 8,
                boxHeight: 8,
                padding: 19,
                font: { family: "Inter, sans-serif", size: 10 }
              }
            },
            tooltip: {
              backgroundColor: "#19372e",
              titleColor: "#ffffff",
              bodyColor: "#e9efe5",
              borderColor: "#3d5d4e",
              borderWidth: 1,
              padding: 12,
              cornerRadius: 9,
              displayColors: spec.datasets.length > 1,
              titleFont: { family: "Inter, sans-serif", size: 11, weight: "600" },
              bodyFont: { family: "Inter, sans-serif", size: 11 },
              callbacks: {
                label(context) {
                  const value = spec.horizontal ? context.parsed.x : context.parsed.y;
                  const suffix = currency || percent ? "" : ` ${spec.unit}`;
                  return `${context.dataset.label}: ${valueFormat(value)}${suffix}`;
                },
                footer() { return "Calculated from filtered CSV records"; }
              },
              footerFont: { size: 9, weight: "normal" },
              footerColor: "#bdccbd",
              footerMarginTop: 9
            }
          },
          scales: spec.horizontal
            ? { x: numericAxis, y: categoryAxis }
            : { x: categoryAxis, y: numericAxis }
        }
      });

      charts.set(target, chart);
    } catch (error) {
      console.error(`Could not render ${spec.title}:`, error);
      const wrap = $(".chart-wrap", container);
      if (wrap) {
        wrap.outerHTML = '<div class="chart-fallback">Chart unavailable. Published values are shown below.</div>';
      }
      $("details", container).open = true;
    }
  }

  function seasonColors(metric) {
    return SEASONS.map(season => {
      const negative = metric === "profit" &&
        dataSource.getSeasonal()[season].profit < 0;
      const base = negative ? COLORS.negative : COLORS[season];
      const dimmed = state.filters.season !== "All" &&
        state.filters.season !== season;
      return dimmed ? `${base}66` : base;
    });
  }

  function renderSeasonChart(target, metric, options = {}) {
    const definitions = {
      yield: { title: "Average Yield by Season", label: "Average yield", unit: "t/ha" },
      profit: { title: "Average Profit by Season", label: "Average profit", unit: "INR", format: "currency" },
      efficiency: { title: "Water Efficiency by Season", label: "Water efficiency", unit: "t/1,000 m³" },
      risk: { title: "Disease/Pest Risk by Season", label: "Average risk", unit: "%", format: "percent", max: 100 }
    };
    const definition = definitions[metric];
    renderChart(target, {
      ...definition,
      ...options,
      labels: SEASONS,
      datasets: [{
        label: definition.label,
        data: SEASONS.map(season => dataSource.getSeasonal()[season][metric]),
        backgroundColor: seasonColors(metric)
      }]
    });
  }

  function renderCropRanking() {
    const seasonIndex = SEASONS.indexOf(state.rankingSeason);
    const ranking = dataSource.getCropYield()
      .map(row => ({ name: row.name, value: row.values[seasonIndex] }))
      .filter(row => Number.isFinite(row.value))
      .sort((a, b) => b.value - a.value);

    renderChart("#crop-ranking-chart", {
      title: `Crop Performance Ranking — ${state.rankingSeason}`,
      unit: "t/ha",
      horizontal: true,
      size: "ranking",
      labels: ranking.map(row => row.name),
      datasets: [{
        label: `${state.rankingSeason} average yield`,
        data: ranking.map(row => row.value),
        backgroundColor: ranking.map((row, index) => {
          if (state.filters.crop !== "All") {
            return row.name === state.filters.crop ? COLORS.Kharif : "#d6ded0";
          }
          return index === 0 ? COLORS.Kharif : "#9caf9b";
        })
      }]
    });
  }

  function renderEconomicsChart() {
    const seasonal = dataSource.getSeasonal();
    const datasets = [
      { key: "revenue", label: "Revenue" },
      { key: "cost", label: "Cost" },
      { key: "profit", label: "Profit" }
    ].map(({ key, label }) => ({
      label,
      data: SEASONS.map(season => seasonal[season][key]),
      backgroundColor: SEASONS.map(season => {
        const base = seasonal[season][key] < 0
          ? COLORS.negative
          : COLORS[key];
        return state.filters.season !== "All" && state.filters.season !== season
          ? `${base}66`
          : base;
      })
    }));

    renderChart("#economics-chart", {
      title: "Revenue vs Cost vs Profit by Season",
      unit: "INR",
      format: "currency",
      size: "large",
      labels: SEASONS,
      datasets
    });
  }

  function destroyCharts() {
    charts.forEach(chart => chart.destroy());
    charts.clear();
  }

  function renderSection() {
    /*
     * Charts are initialized only after their section becomes visible.
     * This avoids zero-width canvases in hidden sections.
     */
    destroyCharts();

    switch (state.section) {
      case "overview":
        renderSnapshot();
        renderSeasonChart("#overview-yield-chart", "yield", { size: "large" });
        break;

      case "seasonal":
        renderSeasonChart("#seasonal-yield-chart", "yield");
        renderSeasonChart("#seasonal-profit-chart", "profit");
        renderSeasonChart("#seasonal-efficiency-chart", "efficiency");
        renderSeasonChart("#seasonal-risk-chart", "risk");
        break;

      case "crops":
        $("#ranking-season").value = state.rankingSeason;
        renderCropRanking();
        renderCropHeatmaps();
        break;

      case "environment":
        renderSeasonChart("#environment-efficiency-chart", "efficiency");
        break;

      case "economics":
        renderEconomicsSummary();
        renderEconomicsChart();
        break;

      case "risk":
        renderSeasonChart("#risk-season-chart", "risk");
        renderScatterPlots();
        renderCorrelationHeatmap();
        break;

      case "insights":
        break;
    }
  }

  function renderFilterState() {
    const selections = [];

    if (state.filters.season !== "All") selections.push(`Season: ${state.filters.season}`);
    if (state.filters.crop !== "All") selections.push(`Crop: ${state.filters.crop}`);
    if (state.filters.state !== "All") selections.push(`State: ${state.filters.state}`);
    if (state.filters.irrigation !== "All") selections.push(`Irrigation: ${state.filters.irrigation}`);

    $("#selection-status").textContent = selections.length
      ? `${selections.join(" · ")}. Calculations use ${formatNumber(dataSource.getRows().length)} filtered records.`
      : `Showing all ${formatNumber(dataSource.getRows().length)} cleaned CSV records.`;
    $("#overview-scope").textContent = `${formatNumber(dataSource.getRows().length)} filtered records`;

    const focus = $("#season-focus");
    focus.hidden = state.filters.season === "All";

    if (!focus.hidden) {
      const season = state.filters.season;
      const values = dataSource.getSeasonal()[season];

      focus.innerHTML = `
        <strong>${season} <small>filtered summary</small></strong>
        <span><small>Yield</small>${formatNumber(values.yield, 2)} t/ha</span>
        <span class="${values.profit < 0 ? "negative" : ""}">
          <small>Profit</small>${formatCurrency(values.profit)}
        </span>
        <span><small>Efficiency</small>${formatNumber(values.efficiency, 2)} t/1,000 m³</span>
        <span><small>Risk</small>${formatNumber(values.risk, 1)}%</span>
      `;
    } else {
      focus.innerHTML = "";
    }
  }

  function setFilterState(nextFilters) {
    state.filters = { ...state.filters, ...nextFilters };

    // A selected season also focuses the existing seasonal crop ranking.
    if (nextFilters.season && nextFilters.season !== "All") {
      state.rankingSeason = nextFilters.season;
    }

    dataSource.setFilters(state.filters);
    renderKPIs("#overview-kpis", dataSource.getOverview());
    const insights = dataSource.getInsights();
    renderInsights("#overview-insights", [insights[1], insights[2], insights[3]]);
    renderInsights("#all-insights", insights);
    renderAnova("#seasonal-anova");
    renderAnova("#insights-anova");
    renderRelationships();
    renderEnvironmentCards();
    renderEconomicsSummary();
    renderFilterState();
    renderSection();
  }

  function initializeFilters() {
    const cropSelect = $("#crop-filter");
    const stateSelect = $("#state-filter");

    dataSource.getCropYield().forEach(row => {
      cropSelect.add(new Option(row.name, row.name));
    });
    dataSource.getStateYield().forEach(row => {
      stateSelect.add(new Option(row.name, row.name));
    });
    dataSource.getIrrigation().forEach(row => {
      $("#irrigation-filter").add(new Option(row.name, row.name));
    });

    $("#filter-form").addEventListener("submit", event => event.preventDefault());

    $("#filter-form").addEventListener("change", event => {
      const { name, value } = event.target;
      if (Object.prototype.hasOwnProperty.call(state.filters, name)) {
        setFilterState({ [name]: value });
      }
    });

    $("#filter-form").addEventListener("reset", event => {
      event.preventDefault();
      const defaults = { season: "All", crop: "All", state: "All", irrigation: "All" };
      Object.entries(defaults).forEach(([name, value]) => {
        $(`#${name}-filter`).value = value;
      });
      state.rankingSeason = "Kharif";
      setFilterState(defaults);
    });

    $("#ranking-season").addEventListener("change", event => {
      state.rankingSeason = event.target.value;
      renderCropRanking();
      $("#selection-status").textContent =
        `Crop ranking shows ${state.rankingSeason} published values. ` +
        "The ranking uses the current CSV filters.";
    });
  }

  /* Section navigation supports URLs, keyboard activation and browser history. */
  function navigateToSection(id, { focus = false, scroll = false } = {}) {
    const sectionId = Object.prototype.hasOwnProperty.call(SECTION_NAMES, id)
      ? id : "overview";

    state.section = sectionId;

    $$(".dashboard-section").forEach(section => {
      section.hidden = section.id !== sectionId;
    });

    $$(".navigation [data-section]").forEach(link => {
      if (link.dataset.section === sectionId) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    $("#breadcrumb-current").textContent = SECTION_NAMES[sectionId];
    document.title = `${SECTION_NAMES[sectionId]} | AGRI Intelligence`;

    renderSection();

    if (scroll) window.scrollTo({ top: 0, behavior: "auto" });
    if (focus) $(`#${sectionId}-heading`).focus({ preventScroll: true });
  }

  function sectionFromHash() {
    const hash = window.location.hash.slice(1);
    return Object.prototype.hasOwnProperty.call(SECTION_NAMES, hash)
      ? hash : "overview";
  }

  function initializeNavigation() {
    document.addEventListener("click", event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute("href").slice(1);
      if (!Object.prototype.hasOwnProperty.call(SECTION_NAMES, id)) return;

      event.preventDefault();
      closeDrawer(false);

      if (window.location.hash !== `#${id}`) {
        window.location.hash = id;
      } else {
        navigateToSection(id, { focus: true, scroll: true });
      }
    });

    window.addEventListener("hashchange", () => {
      closeDrawer(false);
      navigateToSection(sectionFromHash(), { focus: true, scroll: true });
    });
  }

  /* Mobile drawer: inert background, focus trap, Escape and backdrop dismissal. */
  function openDrawer() {
    if (!mobileQuery.matches) return;

    state.drawerOpen = true;
    $("#sidebar").inert = false;
    $("#sidebar").classList.add("is-open");
    $("#sidebar").setAttribute("role", "dialog");
    $("#sidebar").setAttribute("aria-modal", "true");
    $("#sidebar").setAttribute("aria-label", "Dashboard navigation");
    $("#drawer-backdrop").hidden = false;
    $("#app-shell").inert = true;
    $("#menu-button").setAttribute("aria-expanded", "true");
    document.body.classList.add("drawer-open");

    const selected = $('.navigation [aria-current="page"]');
    selected.focus();
  }

  function closeDrawer(restoreFocus = true) {
    const wasOpen = state.drawerOpen;
    state.drawerOpen = false;

    $("#sidebar").classList.remove("is-open");
    $("#sidebar").removeAttribute("role");
    $("#sidebar").removeAttribute("aria-modal");
    $("#sidebar").setAttribute("aria-label", "Application sidebar");
    $("#drawer-backdrop").hidden = true;
    $("#app-shell").inert = false;
    $("#menu-button").setAttribute("aria-expanded", "false");
    document.body.classList.remove("drawer-open");
    $("#sidebar").inert = mobileQuery.matches;

    if (wasOpen && restoreFocus && mobileQuery.matches) {
      $("#menu-button").focus();
    }
  }

  function initializeDrawer() {
    $("#sidebar").inert = mobileQuery.matches;

    $("#menu-button").addEventListener("click", openDrawer);
    $("#drawer-backdrop").addEventListener("click", () => closeDrawer());

    document.addEventListener("keydown", event => {
      if (!state.drawerOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeDrawer();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = $$('a[href], button:not([disabled]), [tabindex="0"]', $("#sidebar"));
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    mobileQuery.addEventListener("change", () => {
      const focusedInSidebar = $("#sidebar").contains(document.activeElement);
      closeDrawer(false);

      if (mobileQuery.matches && focusedInSidebar) {
        $("#menu-button").focus();
      }
      requestAnimationFrame(() => charts.forEach(chart => chart.resize()));
    });
  }

  function parseCSV(path) {
    return new Promise((resolve, reject) => {
      if (window.Papa) {
        window.Papa.parse(path, {
          download: true,
          header: true,
          skipEmptyLines: true,
          complete: result => result.errors.length
            ? reject(new Error(result.errors[0].message))
            : resolve(result.data),
          error: error => reject(error)
        });
        return;
      }
      fetch(path).then(response => {
        if (!response.ok) throw new Error(`CSV request failed (${response.status}).`);
        return response.text();
      }).then(text => {
        const lines = text.trim().split(/\r?\n/).map(line => {
          const fields = [];
          line.replace(/(?:^|,)("(?:[^"]|"")*"|[^,]*)/g, (_, field) => {
            fields.push(field.startsWith('"') ? field.slice(1, -1).replace(/""/g, '"') : field);
            return "";
          });
          return fields;
        });
        const headers = lines.shift();
        resolve(lines.filter(line => line.length === headers.length).map(line =>
          Object.fromEntries(headers.map((header, index) => [header, line[index]]))
        ));
      }).catch(reject);
    });
  }

  async function loadDataset() {
    const loading = $("#data-loading");
    loading.classList.add("is-visible");
    try {
      let records;
      try {
        records = await parseCSV("data/processed_agriculture_data.csv");
      } catch (processedError) {
        records = await parseCSV("data/seasonal_agriculture_performance_dataset.csv");
      }
      if (!records.length || !records[0].Season) throw new Error("The CSV contains no usable records.");
      dataSource = createCSVDataSource(records);
      $("#dataset-chip").textContent = `${formatNumber(records.length)} records · ${Object.keys(records[0]).length} variables`;
      loading.classList.remove("is-visible");
    } catch (error) {
      console.error("Could not load agriculture data:", error);
      loading.textContent = "We couldn't load the agriculture CSV. Check that the dashboard is served from its project folder and try again.";
      loading.classList.add("is-visible", "is-error");
      throw error;
    }
  }

  async function initialize() {
    renderIcons();
    initializeNavigation();
    initializeDrawer();

    try {
      await loadDataset();
    } catch (error) {
      return;
    }

    initializeFilters();
    renderKPIs("#overview-kpis", dataSource.getOverview());
    const insights = dataSource.getInsights();
    renderInsights("#overview-insights", [insights[1], insights[2], insights[3]]);
    renderInsights("#all-insights", insights);
    renderAnova("#seasonal-anova");
    renderAnova("#insights-anova");
    renderRelationships();
    renderEnvironmentCards();
    renderFilterState();
    navigateToSection(sectionFromHash());

    // Re-measure charts once optional web fonts settle.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        charts.forEach(chart => {
          chart.resize();
          chart.update("none");
        });
      });
    }
  }

  initialize();
})();