import torch
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig,
)
from peft import LoraConfig
from trl import SFTTrainer, SFTConfig


# ============================================================
# 1. MODEL
# ============================================================

MODEL_NAME = "Qwen/Qwen3-8B"

TRAIN_FILE = "train_split.jsonl"
VALIDATION_FILE = "validation.jsonl"

OUTPUT_DIR = "careerpath-qwen3-8b"


# ============================================================
# 2. LOAD DATASET
# ============================================================

dataset = load_dataset(
    "json",
    data_files={
        "train": TRAIN_FILE,
        "validation": VALIDATION_FILE,
    },
)

print("Training examples:", len(dataset["train"]))
print("Validation examples:", len(dataset["validation"]))


# ============================================================
# 3. TOKENIZER
# ============================================================

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token


# ============================================================
# 4. 4-BIT QLoRA
# ============================================================

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
)


# ============================================================
# 5. LOAD QWEN3
# ============================================================

model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    quantization_config=bnb_config,
    device_map={"": 0},
)

model.config.use_cache = False


# ============================================================
# 6. LoRA
# ============================================================

peft_config = LoraConfig(
    r=4,
    lora_alpha=8,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",

    # Attention layers only
    target_modules=[
        "q_proj",
        "k_proj",
        "v_proj",
        "o_proj",
    ],
)


# ============================================================
# 7. TRAINING CONFIGURATION
# ============================================================

training_args = SFTConfig(
    output_dir=OUTPUT_DIR,

    # Small dataset → 1 epoch for pipeline testing
    num_train_epochs=1,

    per_device_train_batch_size=1,
    per_device_eval_batch_size=1,

    gradient_accumulation_steps=4,

    learning_rate=2e-4,

    fp16=True,

    # Reduced from 1024 → 512
    max_length=512,

    logging_steps=1,

    save_strategy="epoch",
    eval_strategy="epoch",

    optim="paged_adamw_8bit",

    gradient_checkpointing=True,

    gradient_checkpointing_kwargs={
        "use_reentrant": False
    },

    report_to="none",

    max_grad_norm=0.3,

    # Reduce unnecessary memory usage
    dataloader_pin_memory=False,

    # Don't keep unused columns
    remove_unused_columns=False,
)


# ============================================================
# 8. TRAINER
# ============================================================

trainer = SFTTrainer(
    model=model,
    args=training_args,

    train_dataset=dataset["train"],
    eval_dataset=dataset["validation"],

    peft_config=peft_config,

    processing_class=tokenizer,

    formatting_func=lambda example: (
        tokenizer.apply_chat_template(
            example["messages"],
            tokenize=False,
            add_generation_prompt=False,
        )
    ),
)


# ============================================================
# 9. START TRAINING
# ============================================================

print()
print("==============================================")
print("🚀 Starting CareerPath AI QLoRA training...")
print("==============================================")
print()

trainer.train()


# ============================================================
# 10. SAVE LoRA ADAPTER
# ============================================================

trainer.save_model(OUTPUT_DIR)
tokenizer.save_pretrained(OUTPUT_DIR)

print()
print("==============================================")
print("✅ Training completed!")
print("==============================================")
print(f"✅ Model adapter saved to: {OUTPUT_DIR}")