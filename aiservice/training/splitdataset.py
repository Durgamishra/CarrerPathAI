import json
import random

INPUT_FILE = "train.jsonl"
TRAIN_FILE = "train_split.jsonl"
VALIDATION_FILE = "validation.jsonl"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = [json.loads(line) for line in f]

random.seed(42)
random.shuffle(data)

split_index = int(len(data) * 0.8)

train_data = data[:split_index]
validation_data = data[split_index:]

with open(TRAIN_FILE, "w", encoding="utf-8") as f:
    for item in train_data:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

with open(VALIDATION_FILE, "w", encoding="utf-8") as f:
    for item in validation_data:
        f.write(json.dumps(item, ensure_ascii=False) + "\n")

print(f"Training examples: {len(train_data)}")
print(f"Validation examples: {len(validation_data)}")