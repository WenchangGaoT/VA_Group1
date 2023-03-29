import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
plt.rcParams.update({'font.size': 6})
df = pd.read_csv('Lekagul_Sensor_Data.csv')


print("GATE NAMES")
print()
# Obtain bin frequencies
bin_names = np.unique(df['gate-name'])
bin_frequencies = dict(zip(bin_names, np.zeros(len(bin_names))))
for gate_name in df['gate-name']:
    bin_frequencies[gate_name] += 1

# Sort dictionary by values in descending order
sorted_frequencies = sorted(bin_frequencies.items(), key=lambda x: x[1], reverse=True)

# Print out bucket name for each frequency in order of most frequent to least frequent
total = len(df)
x = []
y = []
for bin_name, frequency in sorted_frequencies[:10]:
    x.append(bin_name)
    y.append(frequency/total)
    print(f"Bin Name: {bin_name} Frequency: {frequency/total}")
    total+=frequency

fig1, ax1 = plt.subplots()
ax1.bar(x[:7], y[:7])
print()
print()
print("CAR TYPES")
print()




# Obtain bin frequencies
bin_names = np.unique(df['car-type'])
bin_frequencies = dict(zip(bin_names, np.zeros(len(bin_names))))
for gate_name in df['car-type']:
    bin_frequencies[gate_name] += 1

# Sort dictionary by values in descending order
sorted_frequencies = sorted(bin_frequencies.items(), key=lambda x: x[1], reverse=True)

# Print out bucket name for each frequency in order of most frequent to least frequent
total = len(df)
x = []
y = []
for bin_name, frequency in sorted_frequencies:
    x.append(bin_name)
    y.append(frequency/total)
    print(f"Bin Name: {bin_name} Frequency: {frequency/total}")
    total+=frequency

fig2, ax2 = plt.subplots()
ax2.bar(x[:7], y[:7])
