import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

INPUT_FILE = os.path.join(BASE_DIR, "Trainingdata.json")
OUTPUT_FILE = os.path.join(BASE_DIR, "train.jsonl")

def main():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        for item in data:
            resume = item["input"]["resumeText"]
            target_role = item["input"]["targetRole"]
            analysis = item["output"]

            record = {
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You are CareerPath AI. "
                            "Analyze a student's resume and provide "
                            "structured career guidance in JSON format."
                        )
                    },
                    {
                        "role": "user",
                        "content": (
                            f"Target Role: {target_role}\n\n"
                            f"Resume:\n{resume}"
                        )
                    },
                    {
                        "role": "assistant",
                        "content": json.dumps(
                            analysis,
                            ensure_ascii=False
                        )
                    }
                ]
            }

            f.write(json.dumps(record, ensure_ascii=False) + "\n")

    print(f"✅ Converted {len(data)} examples")
    print(f"✅ Created: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()