
with open('src/questions.js', 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if '民法' in line:
            print(f"{i+1}: {line.strip()}")
