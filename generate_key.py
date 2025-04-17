import json
import os
from datetime import datetime, timedelta

# Generate a simple random key
import random
import string

def generate_key(length=10):
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# Load existing keys
file_path = "Keys.json"
if os.path.exists(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)
else:
    data = {}

# Create new key
new_key = generate_key()
valid_days = int(input("Enter number of days to expire the key: "))
expiry_date = (datetime.now() + timedelta(days=valid_days)).strftime("%Y-%m-%d")

# Add new key
data[new_key] = expiry_date

# Save updated Keys.json
with open(file_path, "w") as f:
    json.dump(data, f, indent=2)

print(f"New key generated: {new_key} (valid until {expiry_date})")
