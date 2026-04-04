import sqlite3

conn = sqlite3.connect("survey.db")
cursor = conn.cursor()

surveys_cols = [row[1] for row in cursor.execute("PRAGMA table_info(surveys)").fetchall()]
questions_cols = [row[1] for row in cursor.execute("PRAGMA table_info(questions)").fetchall()]

if "is_active" not in surveys_cols:
    cursor.execute("ALTER TABLE surveys ADD COLUMN is_active BOOLEAN DEFAULT 1")
    print("Added: surveys.is_active")

if "type" not in questions_cols:
    cursor.execute("ALTER TABLE questions ADD COLUMN type VARCHAR DEFAULT 'text'")
    print("Added: questions.type")

if "options" not in questions_cols:
    cursor.execute("ALTER TABLE questions ADD COLUMN options VARCHAR")
    print("Added: questions.options")

if "required" not in questions_cols:
    cursor.execute("ALTER TABLE questions ADD COLUMN required BOOLEAN DEFAULT 1")
    print("Added: questions.required")

conn.commit()
conn.close()
print("Migration complete.")
