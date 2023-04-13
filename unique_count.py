import csv
from datetime import datetime
import math 
# Open the csv file and read its contents



def get_unique_month_count():
    with open('Lekagul_Sensor_Data.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # skip the header row
        
        car_counts = {}
        used_ids =  []
        # Loop through each row in the csv file
        for row in reader:
            timestamp_str, car_id, car_type, gate_name = row

            # Extract the year and month from the timestamp
            timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
            year_month = timestamp.strftime('%Y-%m')
            
            # Check if the car passed through an entrance gate
            if car_id not in used_ids:
                if gate_name.startswith('entrance'):
                    if year_month not in car_counts:
                        car_counts[year_month] = 1
                    else:
                        car_counts[year_month] += 1
                    used_ids.append(car_id)
        
        print(car_counts)        


# def get_week_count():
#     with open('Lekagul_Sensor_Data.csv', 'r') as file:
#         reader = csv.reader(file)
#         next(reader)  # skip the header row
        
#         car_counts = {}
#         # Loop through each row in the csv file
#         for row in reader:
#             timestamp_str, car_id, car_type, gate_name = row

#             # Extract the year and month from the timestamp
#             timestamp = datetime.strptime(timestamp_str, '%Y-%m-%d %H:%M:%S')
#             year_month_week = timestamp.strftime('%Y-%m')
            
#             # Check if the car passed through an entrance gate
#             if gate_name.startswith('entrance'):
#                 if year_month not in car_counts:
#                     car_counts[year_month] = {}
#                 if car_id not in car_counts[year_month]:
#                     car_counts[year_month][car_id] = 1
#                 else:
#                     car_counts[year_month][car_id] += 1

#         months = {}
#         for month in car_counts:
#             month_cnt = 0
#             for car in car_counts[month]:
#                 month_cnt += math.floor((car_counts[month][car])/2)
            
#             months[month] = month_cnt

#         print(months)        


get_unique_month_count()