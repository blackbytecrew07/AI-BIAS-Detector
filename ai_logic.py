import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder


# 🔹 STEP 1: Bias Detection
def calculate_bias(df, sensitive_col, target_col):
    group_results = df.groupby(sensitive_col)[target_col].mean()

    group_dict = group_results.to_dict()

    max_val = group_results.max()
    min_val = group_results.min()

    # avoid zero division
    if min_val == 0:
        bias_score = 0
    else:
        bias_score = round((max_val / min_val), 2)

    return group_dict, bias_score

# 🔹 STEP 2: Fairness Rating
def get_fairness_rating(bias_score):
    if bias_score <= 0.1:
        return "S (Highly Fair)"
    elif bias_score <= 0.2:
        return "A (Fair)"
    elif bias_score <= 0.3:
        return "B (Moderate Bias)"
    elif bias_score <= 0.4:
        return "C (Biased)"
    else:
        return "D (Highly Biased)"


# 🔹 STEP 3: Train Simple ML Model
def train_model(df, target_col):
    data = df.copy()

    label_encoders = {}
    for col in data.columns:
        if data[col].dtype == 'object':
            le = LabelEncoder()
            data[col] = le.fit_transform(data[col])
            label_encoders[col] = le

    X = data.drop(columns=[target_col])
    y = data[target_col]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = LogisticRegression()
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    return model, predictions, X_test, y_test


# 🔹 STEP 4: Bias Simulation (Before vs After)
def simulate_bias(df, sensitive_col, target_col):

    # BEFORE
    before_groups, before_bias = calculate_bias(df, sensitive_col, target_col)

    # Create biased dataset
    biased_df = df.copy()

    # Select one group and reduce its positive outcomes
    group_to_bias = biased_df[sensitive_col].unique()[0]
    mask = (biased_df[sensitive_col] == group_to_bias)

    biased_df.loc[mask, target_col] = 0

    # AFTER
    after_groups, after_bias = calculate_bias(biased_df, sensitive_col, target_col)

    impact = round(after_bias - before_bias, 3)

    return {
        "before_bias": before_bias,
        "after_bias": after_bias,
        "impact": impact,
        "before_groups": before_groups,
        "after_groups": after_groups
    }


# 🔹 STEP 5: Bias Explanation
def explain_bias(df, sensitive_col, target_col):
    group_results = df.groupby(sensitive_col)[target_col].mean()

    max_group = group_results.idxmax()
    min_group = group_results.idxmin()

    max_value = round(group_results[max_group], 3)
    min_value = round(group_results[min_group], 3)

    explanation = (
        f"{sensitive_col} bias detected: "
        f"{max_group} group has higher positive outcome ({max_value}) "
        f"compared to {min_group} ({min_value})."
    )

    return explanation

# 🔹 STEP 6: Suggestions
def suggest_fixes(bias_score):
    suggestions = []

    if bias_score > 0.3:
        suggestions.append("Balance the dataset across groups")
        suggestions.append("Collect more diverse data")
        suggestions.append("Avoid using sensitive features like gender")

    elif bias_score > 0.1:
        suggestions.append("Reweight samples to balance outcomes")
        suggestions.append("Monitor fairness during model training")
        suggestions.append("Check for hidden bias in features")

    else:
        suggestions.append("Dataset looks fairly balanced")
        suggestions.append("Continue monitoring for bias")

    return suggestions